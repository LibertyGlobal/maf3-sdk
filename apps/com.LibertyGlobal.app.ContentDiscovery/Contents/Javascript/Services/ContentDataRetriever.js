function ContentDataRetriever() {
	var callbackAfterLoaded;
	var callbackAfterLoadedParams;

	this.loadMenuData = function(menuItem, callback, callbackParams) {
		callbackAfterLoaded = callback;
		callbackAfterLoadedParams = callbackParams;

		//console.log("start loading: " + menuItem.mainMenuLabel);
		menuItem.dataLoading = true;
		var currentTime = moment().utc().format('YYYY-MM-DDTHH:mm:ss') + "Z";
		var timeWindowEndTime = moment().utc().add('minutes', parseInt(ProfileHandler.getContentTimeWindow(), 10)).format('YYYY-MM-DDTHH:mm:ss') + "Z";

		switch (menuItem.itemType) {
			case 'category':
				LGI.Guide.Broadcast.create()
					.limit(500)
					.fields(LGI.Guide.Video.ID, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START,
						LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL, LGI.Guide.Broadcast.CATEGORY, "video.subcategory",
						"video.shortSynopsis", LGI.Guide.Broadcast.IMAGE_LINK)
					.filter(LGI.Guide.Broadcast.START.greaterThan(currentTime))
					.filter(LGI.Guide.Broadcast.START.lessThan(timeWindowEndTime))
					.filter(LGI.Guide.Broadcast.CATEGORY.equalTo(menuItem.categoryFilters))
					.sort(LGI.Guide.Broadcast.START)
					.findOne(function(response) {
						var futureAssets = response;

						// retrieve all currently playing
						LGI.Guide.Broadcast.create()
							.limit(500)
							.fields(LGI.Guide.Video.ID, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START,
								LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL, LGI.Guide.Broadcast.CATEGORY, "video.subcategory",
								"video.shortSynopsis", LGI.Guide.Broadcast.IMAGE_LINK)
							.filter(LGI.Guide.Broadcast.START.lessThan(currentTime))
							.filter(LGI.Guide.Broadcast.END.greaterThan(currentTime))
							.filter(LGI.Guide.Broadcast.CATEGORY.equalTo(menuItem.categoryFilters))
							.sort(LGI.Guide.Broadcast.START)
							.findOne(function(response2) {
								var activeAssets = response2;
								parseData(menuItem, activeAssets, futureAssets, true, true, false);
							});
					});
				break;
			case 'trending':
				// retrieve all currently playing trending
				LGI.Guide.Broadcast.create()
					.limit(500)
					.fields(LGI.Guide.Video.ID, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START,
						LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL, LGI.Guide.Broadcast.POPULARITY,
						"video.shortSynopsis", LGI.Guide.Broadcast.IMAGE_LINK,
						LGI.Guide.Broadcast.CATEGORY, "video.subcategory")
					.filter(LGI.Guide.Broadcast.START.lessThan(currentTime))
					.filter(LGI.Guide.Broadcast.END.greaterThan(currentTime))
					.filter(LGI.Guide.Broadcast.CATEGORY.equalTo(menuItem.categoryFilters))
					.sort(LGI.Guide.Broadcast.POPULARITY, 'desc')
					.findOne(function(response) {
						var activeAssets = response;
						screen.log("trending response: " + response);
						parseData(menuItem, activeAssets, null, false, true, false);
					});
				break;
			case 'recommendations':
				menuItem.data = [];
				menuItem.dataLoading = false;
				callbackAfterLoaded(menuItem, callbackAfterLoadedParams);
				break;
			case 'shuffle':
				// retrieve all currently playing trending
				LGI.Guide.Broadcast.create()
					.limit(500)
					.fields(LGI.Guide.Video.ID, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START,
						LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL, LGI.Guide.Broadcast.POPULARITY,
						"video.shortSynopsis", LGI.Guide.Broadcast.IMAGE_LINK, LGI.Guide.Broadcast.CATEGORY, "video.subcategory")
					.filter(LGI.Guide.Broadcast.START.lessThan(currentTime))
					.filter(LGI.Guide.Broadcast.END.greaterThan(currentTime))
					.filter(LGI.Guide.Broadcast.CATEGORY.equalTo(menuItem.categoryFilters))
					.sort(LGI.Guide.Broadcast.START)
					.findOne(function(response) {
						var activeAssets = response;
						screen.log("shuffle response: " + response);
						parseData(menuItem, activeAssets, null, false, true, true);
					});
				break;
		}
	};

	var parseData = function(menuItem, activeAssets, futureAssets, sortAssets, uniqueAssets, shuffleAssets) {
		var allAssets = [];
		for (var i = 0; i < activeAssets.length; i++) {
			//console.log("item '"+ activeAssets[i].video.title + "' skipped: " + (((moment(activeAssets[i].end) - moment().utc()) / (moment(activeAssets[i].end) - moment(activeAssets[i].start)) * 100) < Config.common.programDurationDisplayThreshold));	
			if (((moment(activeAssets[i].end) - moment().utc()) / (moment(activeAssets[i].end) - moment(activeAssets[i].start)) * 100) < Config.common.programDurationDisplayThreshold) {
				allAssets.push(activeAssets[i]);
			}
		}
		if (futureAssets !== null) {
			allAssets = allAssets.concat(futureAssets);
		}
		if (sortAssets === true) {
			allAssets.sort(function(a, b) {
				return (moment(a.start) - moment(b.start)) || (a.video.title.localeCompare(b.video.title));
			});
		}
		if (uniqueAssets === true) {
			allAssets = removeDuplicates(allAssets);
		}
		if (shuffleAssets === true) {
			allAssets = shuffleArray(allAssets);
		}

		menuItem.data = allAssets;
		menuItem.dataLoading = false;
		//console.log("data loaded: " + menuItem.mainMenuLabel);	
		callbackAfterLoaded(menuItem, callbackAfterLoadedParams);
	};

	var removeDuplicates = function(allAssets) {
		var allAssetsFiltered = [];
		var skipped = 0;
		var skipNext = false;
		for (var i = allAssets.length - 1; i >= 0; i--) {
			if (i - 1 > 0) {
				if (skipNext !== true) {
					if (allAssets[i].start === allAssets[i - 1].start &&
						allAssets[i].end === allAssets[i - 1].end &&
						allAssets[i].video.title === allAssets[i - 1].video.title) {
						if (allAssets[i].channel.name.toUpperCase().indexOf("HD") >= 0) {
							allAssetsFiltered.unshift(allAssets[i]);
						} else {
							allAssetsFiltered.unshift(allAssets[i - 1]);
						}
						skipNext = true;
						skipped++;
					} else {
						allAssetsFiltered.unshift(allAssets[i]);
					}
				} else {
					skipNext = false;
				}
			}
		}
		console.log("Duplicate items skipped: " + skipped);
		return allAssetsFiltered;
	};

	var shuffleArray = function(array) {
		var currentIndex = array.length,
			temporaryValue, randomIndex;

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	};
}