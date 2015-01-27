var InitializationHandler = (function() {
	var channelInitialized = false;
	var entitlementsInitialized = false;
	var onInitializeComplete;
	var onInitializeCompleteViewRef;
	var customerId;
	var channelList = [];
	var entitlements = [];
	var mediumSize = "station-logo-medium";

	var getChannelLogo = function(channelLogicalPosition, logoSize) {
		var logoUrl = "";
		if (InitializationHandler.channelList.length > 0) {
			for (var i = 0; i < InitializationHandler.channelList.length; i++) {
				if (InitializationHandler.channelList[i].channelNumber === channelLogicalPosition) {
					if (InitializationHandler.channelList[i].stationSchedules !== null && InitializationHandler.channelList[i].stationSchedules.length > 0) {
						for (var j = 0; j < InitializationHandler.channelList[i].stationSchedules[0].station.images.length; j++) {
							if (InitializationHandler.channelList[i].stationSchedules[0].station.images[j].assetType === logoSize) {
								logoUrl = InitializationHandler.channelList[i].stationSchedules[0].station.images[j].url;
							}
						}
					}
				}
			}
		}
		return logoUrl;
	};

	return {
		initialize: function(onInitializeComplete, view) {
			var handler = InitializationHandler;
			handler.channelInitialized = false;
			handler.entitlementsInitialized = false;
			handler.onInitializeComplete = onInitializeComplete;
			handler.onInitializeCompleteViewRef = view;
			if (profile.uid !== undefined) {
				handler.customerId = profile.uid.substr(0, profile.uid.indexOf('_'));
			}			
			if(Config.getEnv() === 'dev')
			{
				handler.customerId = Config.get('customerId');
			}

			new Request({
				url: Config.common.channelApiUrl,
				onComplete: function(request) {
					if (request.status === 200) {
						var listOfChannels = JSON.parse(request.response);
						if (listOfChannels !== null) {
							if (listOfChannels.channels !== null) {
								handler.channelList = listOfChannels.channels;
								handler.channelInitialized = true;
								handler.checkInitializationComplete(handler);
							}
						}
					}
				}
			}).send();

			new Request({
				url: Config.common.customerApiUrl.replace('customerId', handler.customerId),
				proxy: false,
				headers: {
					'X-Auth-Id': Config.common.broadcastApiAuthId,
					'X-Auth-Key': Config.common.broadcastApiAuthKey
				},
				onComplete: function(request) {
					if (request.status === 200) {
						var entitlements = JSON.parse(request.response);
						handler.entitlements = entitlements.data;
						handler.entitlementsInitialized = true;
						handler.checkInitializationComplete(handler);
					}
					else
					{
						screen.log("customerApiUrl failure: " + Config.common.customerApiUrl.replace('customerId', handler.customerId) + ", " + handler.customerId);
						screen.log("customerApiUrl failure: " + request.status);
					}
				}
			}).send();
		},

		checkInitializationComplete: function(handler) {
			if (handler.channelInitialized === true && handler.entitlementsInitialized === true) {
				handler.onInitializeComplete(handler.onInitializeCompleteViewRef);
			}
		},

		getChannelLogoMedium: function(channelLogicalPosition) {
			return getChannelLogo(channelLogicalPosition, mediumSize);
		},

		cleanUp: function() {
			this.customerId = '';
			this.onInitializeComplete = null;
			this.onInitializeCompleteViewRef = null;
			delete this.channelList;
			delete this.entitlements;
		}
	};
})();