var InitializationHandler = {
	channelInitialized: false,
	entitlementsInitialized: false,
	customerId: '',
	channelList: [],
	entitlements: [],
	mediumSize: "station-logo-medium",

	initialize: function(callback, callbackViewRef) {
		var handler = this;
		this.channelInitialized = false;
		this.entitlementsInitialized = false;
		if (profile.uid !== undefined) {
			this.customerId = profile.uid.substr(0, profile.uid.indexOf('_'));
		}
		if (Config.getEnv() === 'dev') {
			this.customerId = Config.get('customerId');
		}

		new Request({
			url: Config.get('channelApiUrl'),
			onComplete: function(request) {
				if (request.status === 200) {
					var listOfChannels = JSON.parse(request.response);
					if (listOfChannels !== null) {
						if (listOfChannels.channels !== null) {
							handler.channelList = listOfChannels.channels;
							handler.channelInitialized = true;
							if (handler.channelInitialized === true && handler.entitlementsInitialized === true) {
								callback(callbackViewRef);
							}
						}
					}
				}
			}
		}).send();

		var url = Config.get('customerApiUrl').replace('customerId', this.customerId);
		url = url.replace('countryCode', profile.countryCode.toUpperCase());
		new Request({
			url: url,
			proxy: false,
			headers: {
				'X-Auth-Id': Config.get('broadcastApiAuthId'),
				'X-Auth-Key': Config.get('broadcastApiAuthKey')
			},
			onComplete: function(request) {
				if (request.status === 200) {
					var entitlementsList = JSON.parse(request.response);
					handler.entitlements = entitlementsList.data;
					handler.entitlementsInitialized = true;
					if (handler.channelInitialized === true && handler.entitlementsInitialized === true) {
						callback(callbackViewRef);
					}
				}
			}
		}).send();
	},

	getChannelLogoMedium: function(channelLogicalPosition) {
		return this.getChannelLogo(channelLogicalPosition, this.mediumSize);
	},

	getChannelLogo: function(channelLogicalPosition, logoSize) {
		var logoUrl = "";
		if (this.channelList.length > 0) {
			for (var i = 0; i < this.channelList.length; i++) {
				if (this.channelList[i].channelNumber === channelLogicalPosition) {
					if (this.channelList[i].stationSchedules !== null && this.channelList[i].stationSchedules.length > 0) {
						for (var j = 0; j < this.channelList[i].stationSchedules[0].station.images.length; j++) {
							if (this.channelList[i].stationSchedules[0].station.images[j].assetType === logoSize) {
								logoUrl = this.channelList[i].stationSchedules[0].station.images[j].url;
							}
						}
					}
				}
			}
		}
		return logoUrl;
	},

	cleanUp: function() {
		this.channelList = null;
		delete this.channelList;
		this.entitlements = null;
		delete this.entitlements;
	}
};