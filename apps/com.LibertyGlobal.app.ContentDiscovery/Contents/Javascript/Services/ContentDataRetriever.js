var ContentDataRetriever = (function() {
	var entitlementsFieldName = 'channel.entitlementCodes';
	var callbackAfterLoaded;
	var callbackAfterLoadedParams;

	var parseData = function(menuItem, activeAssets, futureAssets, sortAssets, uniqueAssets, shuffleAssets) {
		var allAssets = [];
		allAssets = allAssets.concat(removeAlmostEnded(activeAssets));

		if (futureAssets !== null) {
			allAssets = allAssets.concat(removeAlmostEnded(futureAssets));
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

		if (sortAssets === true) {
			allAssets.sort(function(a, b) {
				return ((moment(a.start) - moment(b.start)) || a.channel.logicalPosition - b.channel.logicalPosition);
			});
		}

		menuItem.dataLoading = false;
		callbackAfterLoaded(menuItem, allAssets, callbackAfterLoadedParams);
	};

	var removeAlmostEnded = function(assets)
	{
		var allAssetsFiltered = [];
		var treshold = Config.get('programDurationDisplayThreshold');
		for (var i = 0; i < assets.length; i++) {
			var currentProgress = (moment().utc() - moment(assets[i].start)) / (moment(assets[i].end) - moment(assets[i].start));
			//console.log("item '" + assets[i].video.title + "', " + moment(assets[i].start).format("HH:mm") + ", " +  moment(assets[i].end).format("HH:mm") +
			//", current progress: " + currentProgress +
			//", skipped: " + (currentProgress >= Config.common.programDurationDisplayThreshold));
			if (currentProgress < treshold) {
				allAssetsFiltered.push(assets[i]);
			}
		}
		return allAssetsFiltered;
	};

	var removeDuplicates = function(allAssets) {
		var allAssetsFiltered = [];
		var skipped = 0;
		var skipNext = false;
		for (var i = allAssets.length - 1; i >= 0; i--) {
			var current = i;
			var previous = i - 1;
			if (skipNext !== true) {
				if (previous >= 0) {
					if (allAssets[current].start === allAssets[previous].start &&
						allAssets[current].end === allAssets[previous].end &&
						allAssets[current].video.title === allAssets[previous].video.title) {
						if (allAssets[current].channel.name.toUpperCase().indexOf("HD") >= 0) {
							allAssetsFiltered.unshift(allAssets[current]);
						} else {
							allAssetsFiltered.unshift(allAssets[previous]);
						}
						skipNext = true;
						skipped++;
					} else {
						allAssetsFiltered.unshift(allAssets[current]);
					}
				} else {
					allAssetsFiltered.unshift(allAssets[current]);
				}
			} else {
				skipNext = false;
			}
		}
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

	var errorCallback = function(error) {
		//screen.log("GSDK: " + error);
	};

	return {
		loadMenuData: function(menuItem, extendedTimePeriod, callback, callbackParams) {
			callbackAfterLoaded = callback;
			callbackAfterLoadedParams = callbackParams;

			menuItem.dataLoading = true;
			var currentTime = moment().utc().format('YYYY-MM-DDTHH:mm:ss') + "Z";
			var currentTimeMin2Hours = moment().utc().subtract('minutes', 120).format('YYYY-MM-DDTHH:mm:ss') + "Z";
			menuItem.dataTimeframe = (extendedTimePeriod === true) ? Config.get('extendedContentTimeWindow') : ConfigurationStorageHandler.getContentTimeWindow();
			
			var timeWindowEndTime = moment().utc().add('minutes', parseInt(menuItem.dataTimeframe, 10)).format('YYYY-MM-DDTHH:mm:ss') + "Z";
			var menuConfig = MenuHandler.getSelectedMenuItemsQueryCategories();

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
						.filter(entitlementsFieldName + "=" + InitializationHandler.entitlements.join(','))
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
									.filter(entitlementsFieldName + "=" + InitializationHandler.entitlements.join(','))
									.sort(LGI.Guide.Broadcast.START)
									.findOne(function(response2) {
											var activeAssets = response2;
											parseData(menuItem, activeAssets, futureAssets, true, true, false);
										},
										errorCallback);
							},
							errorCallback);
					break;
				case 'trending':
					LGI.Guide.Broadcast.create()
						.limit(100)
						.fields(LGI.Guide.Video.ID, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START,
							LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL, LGI.Guide.Broadcast.POPULARITY,
							"video.shortSynopsis", LGI.Guide.Broadcast.IMAGE_LINK,
							LGI.Guide.Broadcast.CATEGORY, "video.subcategory", LGI.Guide.Broadcast.BPM, "video.statistics.bpm")
						.filter(LGI.Guide.Broadcast.START.lessThan(timeWindowEndTime))
						.filter(LGI.Guide.Broadcast.END.greaterThan(currentTimeMin2Hours))
						.filter(entitlementsFieldName + "=" + InitializationHandler.entitlements.join(','))
						.filter(LGI.Guide.Broadcast.BPM.greaterThan(0))
						.sort(LGI.Guide.Broadcast.BPM, 'desc')
						.findOne(function(response) {
								var bpmAssets = response;
								LGI.Guide.Broadcast.create()
									.limit(100)
									.fields(LGI.Guide.Video.ID, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START,
										LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL, LGI.Guide.Broadcast.POPULARITY,
										"video.shortSynopsis", LGI.Guide.Broadcast.IMAGE_LINK,
										LGI.Guide.Broadcast.CATEGORY, "video.subcategory", LGI.Guide.Broadcast.BPM, "video.statistics.bpm")
									.filter(LGI.Guide.Broadcast.START.lessThan(timeWindowEndTime))
									.filter(LGI.Guide.Broadcast.END.greaterThan(currentTimeMin2Hours))
									.filter(entitlementsFieldName + "=" + InitializationHandler.entitlements.join(','))
									.filter("video.statistics.bpm>0")
									.sort("video.statistics.bpm", 'desc')
									.findOne(function(response2) {
											var videoBpmAssets = response2;
											parseData(menuItem, bpmAssets, videoBpmAssets, true, true, false);
										},
										errorCallback);							
							},
							errorCallback);
					break;
				case 'recommendations':
					if (InitializationHandler.customerId !== undefined) {
						var startTime = moment().utc().subtract('minutes', parseInt(Config.get('extendedContentTimeWindow'), 10)).format('YYYY-MM-DDTHH:mm:ss') + "Z";
						var request = LGI.Guide.Broadcast.create()
							.limit(500)
							.fields(LGI.Guide.Video.ID, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START,
								LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL, LGI.Guide.Broadcast.CATEGORY, "video.subcategory",
								"video.shortSynopsis", LGI.Guide.Broadcast.IMAGE_LINK)
							.filter(LGI.Guide.Broadcast.START.equalTo(startTime))
							.filter(LGI.Guide.Broadcast.END.equalTo(timeWindowEndTime))
							.filter("genre=" + menuConfig)
							.sort(LGI.Guide.Broadcast.START);
						request._buildURLFromElements();
						var requestUrl = request._requestURL.replace("data/NL/", "data/NL/household/" + InitializationHandler.customerId + "/");

						new Request({
							url: requestUrl,
							proxy: false,
							headers: {
								'X-Auth-Id': Config.get('broadcastApiAuthId'),
								'X-Auth-Key': Config.get('broadcastApiAuthKey')
							},
							onSuccess: function(requestResult) {
								var activeAssets = requestResult;
								parseData(menuItem, activeAssets, null, true, true, false);
							}
						}).send();
					}
					break;
				case 'shuffle':
					LGI.Guide.Broadcast.create()
						.limit(500)
						.fields(LGI.Guide.Video.ID, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START,
							LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL, LGI.Guide.Broadcast.POPULARITY,
							"video.shortSynopsis", LGI.Guide.Broadcast.IMAGE_LINK, LGI.Guide.Broadcast.CATEGORY, "video.subcategory")
						.filter(LGI.Guide.Broadcast.START.lessThan(currentTime))
						.filter(LGI.Guide.Broadcast.END.greaterThan(currentTime))
						.filter(LGI.Guide.Broadcast.CATEGORY.equalTo(menuConfig))
						.filter(entitlementsFieldName + "=" + InitializationHandler.entitlements.join(','))
						.sort(LGI.Guide.Broadcast.START)
						.findOne(function(response) {
								var activeAssets = response;
								console.log("shuffle items: " + activeAssets.length);
								parseData(menuItem, activeAssets, null, false, true, true);
							},
							errorCallback);
					break;
			}
		}

	};
})();