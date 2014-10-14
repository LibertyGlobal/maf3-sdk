function ContentDataRetriever() {
	var futureAssets = [];
	var activeAssets = [];
	var channelList = [];
	var callbackAfterLoaded;
	var callbackAfterLoadedParams;

	this.collectData = function(callback, callbackParams){
		callbackAfterLoaded = callback;
		callbackAfterLoadedParams = callbackParams;				

		var currentTime = moment().utc().format('YYYY-MM-DDTHH:mm') + "Z";
		var timeWindowEndTime = moment().utc().add('minutes', Config.common.contentTimeWindow).format('YYYY-MM-DDTHH:mm') + "Z";

		Config.common.menuItems[0].dataLoading = true;
		console.log("start loading: " + Config.common.menuItems[0].mainMenuLabel);
		loadCategoryData(currentTime, timeWindowEndTime, Config.common.menuItems[0]);

		Config.common.menuItems.forEach(function(menuItem, index){
			if(index!==0)
			{
				menuItem.dataLoading = true;
				console.log("start loading: " + menuItem.mainMenuLabel);
				switch(menuItem.itemType)
				{
					case 'category':
						loadCategoryData(currentTime, timeWindowEndTime, menuItem);
					break;
					case 'trending':
					case 'recommendations':
					case 'shuffle':
						menuItem.data = [];
						menuItem.dataLoading = false;	
					break;
				}
			}
		}, this);		
	};

	var loadCategoryData = function(currentTime, timeWindowEndTime, menuItem)
	{
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
			futureAssets = response;	

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
				activeAssets = response2;
				parseData(menuItem);
			});				
		});
	};

	var parseData = function(menuItem){
		var allAssets = [];		
		allAssets = futureAssets.concat(activeAssets);
		allAssets.sort(function(a,b) { return moment(a.start) - moment(b.start); } );
		menuItem.data = allAssets;
		menuItem.dataLoading = false;	
		console.log("data loaded: " + menuItem.mainMenuLabel);	
		callbackAfterLoaded(menuItem, callbackAfterLoadedParams);
	};
}