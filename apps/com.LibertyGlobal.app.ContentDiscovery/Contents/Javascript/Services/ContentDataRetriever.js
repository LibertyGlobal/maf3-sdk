function ContentDataRetriever() {
	var futureAssets = [];
	var activeAssets = [];
	var channelList = [];
	var callbackAfterLoaded;
	var callbackAfterLoadedParams;

	this.collectData = function(callback, callbackParams){
		callbackAfterLoaded = callback;
		callbackAfterLoadedParams = callbackParams;		

		// retrieve all future 
		var currentTime = moment().utc().format('YYYY-MM-DDTHH:mm') + "Z";
		// todo use time window offset
		var timeWindowEndTime = moment().utc().add('hours', 2).format('YYYY-MM-DDTHH:mm') + "Z";
		//console.log('time frame2: ' + currentTime + ', ' + timeWindowEndTime);
		LGI.Guide.Broadcast.create()
		.limit(50)
		.fields(LGI.Guide.Broadcast.ID, LGI.Guide.Broadcast.IMI, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START, 
				LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL, LGI.Guide.Broadcast.CHANNEL_NAME,
				LGI.Guide.Broadcast.AGE_RATING, LGI.Guide.Broadcast.CAST, LGI.Guide.Broadcast.DIRECTORS,
				LGI.Guide.Broadcast.WRITERS, LGI.Guide.Broadcast.BPM, LGI.Guide.Broadcast.POPULARITY,
				LGI.Guide.Broadcast.SYNOPSIS, LGI.Guide.Broadcast.IMAGE_LINK, LGI.Guide.Broadcast.CATEGORY)
		.filter(LGI.Guide.Broadcast.START.greaterThan(currentTime))				
		.filter(LGI.Guide.Broadcast.END.lessThan(timeWindowEndTime))
		.sort(LGI.Guide.Broadcast.START)
		.findOne(function(response){ 
			futureAssets = response;	

			// retrieve all currently playing
			LGI.Guide.Broadcast.create()
			.limit(50)
			.fields(LGI.Guide.Broadcast.ID, LGI.Guide.Broadcast.IMI, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START, 
				LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL, LGI.Guide.Broadcast.CHANNEL_NAME,
				LGI.Guide.Broadcast.AGE_RATING, LGI.Guide.Broadcast.CAST, LGI.Guide.Broadcast.DIRECTORS,
				LGI.Guide.Broadcast.WRITERS, LGI.Guide.Broadcast.BPM, LGI.Guide.Broadcast.POPULARITY,
				LGI.Guide.Broadcast.SYNOPSIS, LGI.Guide.Broadcast.IMAGE_LINK, LGI.Guide.Broadcast.CATEGORY)
			.filter(LGI.Guide.Broadcast.START.lessThan(currentTime))				
			.filter(LGI.Guide.Broadcast.END.greaterThan(currentTime))
			.sort(LGI.Guide.Broadcast.START)
			.findOne(function(response2){ 
				activeAssets = response2;
				parseData();
			});				
		});			
	};

	var parseData = function(){
		console.log("data retrieved: " + moment().format('YYYY-MM-DDTHH:mm:ss'));
		var allAssets = [];		
		allAssets = futureAssets.concat(activeAssets);
		allAssets.sort(function(a,b) { return moment(a.start) - moment(b.start); } );
		
		Config.common.menuItems.forEach(function(menuItem, index){
			switch(menuItem.itemType)
			{
				case 'category':
					var filterArray = menuItem.categoryFilters.split(",");
					filterArray.forEach(function(aFilter){
						allAssets.forEach(function(asset, u){
							if(asset.video.category != null)
							{
								if(asset.video.category.trim().indexOf(aFilter) >= 0)
								{
									menuItem.data.push(asset);
								}
							}
							else
							{
								console.log("asset skipped: " + asset.id);								
							}
						}, this);
					}, this);
				break;
			}			
		}, this);
		console.log("data parsed: " + moment().format('YYYY-MM-DDTHH:mm:ss'));
		callbackAfterLoaded(callbackAfterLoadedParams);
	};
}