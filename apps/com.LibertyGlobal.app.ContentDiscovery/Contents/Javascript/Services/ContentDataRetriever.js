function ContentDataRetriever() {
	var callbackAfterLoaded;
	var callbackAfterLoadedParams;

	this.loadMenuDataExtended = function(menuItem, callback, callbackParams){
		LGI.Guide.Broadcast.create()
		.limit(10)
		.fields(LGI.Guide.Video.ID, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START, 
			LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL,
			LGI.Guide.Broadcast.SYNOPSIS, LGI.Guide.Broadcast.IMAGE_LINK, LGI.Guide.Broadcast.CATEGORY)
		.filter(LGI.Guide.Broadcast.START.greaterThan(currentTime))					
		.filter(LGI.Guide.Broadcast.CATEGORY.equalTo(menuItem.categoryFilters))
		.sort(LGI.Guide.Broadcast.START)
		.findOne(function(response){ 
			parseData(menuItem, response, futureAssets);
		});
	};

	this.loadMenuData = function(menuItem, callback, callbackParams){
		callbackAfterLoaded = callback;
		callbackAfterLoadedParams = callbackParams;	

		console.log("start loading: " + menuItem.mainMenuLabel);
		menuItem.dataLoading = true;
		var currentTime = moment().utc().format('YYYY-MM-DDTHH:mm') + "Z";
		var timeWindowEndTime = moment().utc().add('minutes', Config.common.contentTimeWindow).format('YYYY-MM-DDTHH:mm') + "Z";
					
		switch(menuItem.itemType)
		{
			case 'category':
				LGI.Guide.Broadcast.create()
				.limit(500)
				.fields(LGI.Guide.Video.ID, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START, 
						LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL,
						LGI.Guide.Broadcast.SYNOPSIS, LGI.Guide.Broadcast.IMAGE_LINK, LGI.Guide.Broadcast.CATEGORY)
				.filter(LGI.Guide.Broadcast.START.greaterThan(currentTime))				
				.filter(LGI.Guide.Broadcast.START.lessThan(timeWindowEndTime))
				.filter(LGI.Guide.Broadcast.CATEGORY.equalTo(menuItem.categoryFilters))
				.sort(LGI.Guide.Broadcast.START)
				.findOne(function(response){ 
					var futureAssets = response;	

					// retrieve all currently playing
					LGI.Guide.Broadcast.create()
					.limit(500)
					.fields(LGI.Guide.Video.ID, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START, 
						LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL,
						LGI.Guide.Broadcast.SYNOPSIS, LGI.Guide.Broadcast.IMAGE_LINK, LGI.Guide.Broadcast.CATEGORY)
					.filter(LGI.Guide.Broadcast.START.lessThan(currentTime))				
					.filter(LGI.Guide.Broadcast.END.greaterThan(currentTime))
					.filter(LGI.Guide.Broadcast.CATEGORY.equalTo(menuItem.categoryFilters))
					.sort(LGI.Guide.Broadcast.START)
					.findOne(function(response2){ 
						var activeAssets = response2;
						parseData(menuItem, activeAssets, futureAssets);
					});				
				});
			break;
			case 'trending':
			case 'recommendations':
			case 'shuffle':
				menuItem.data = [];
				menuItem.dataLoading = false;	
				callbackAfterLoaded(menuItem, callbackAfterLoadedParams);
			break;
		}		
	};

	var parseData = function(menuItem, activeAssets, futureAssets){		
		var allAssets = [];		
		for (var i = 0; i < activeAssets.length; i++) {			
			if(((moment(activeAssets[i].end) - moment().utc()) / (moment(activeAssets[i].end) - moment(activeAssets[i].start)) * 100) > Config.common.programDurationDisplayThreshold)
			{
				allAssets.push(activeAssets[i]);
			}			
		}
		allAssets = allAssets.concat(futureAssets);
		allAssets.sort(function(a,b) { return moment(a.start) - moment(b.start); } );
		menuItem.data = allAssets;
		menuItem.dataLoading = false;	
		console.log("data loaded: " + menuItem.mainMenuLabel);	
		callbackAfterLoaded(menuItem, callbackAfterLoadedParams);
	};
}