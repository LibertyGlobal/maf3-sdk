var ChannelHandler = (function() {
	this.channelList = [];
	var mediumSize = "station-logo-medium";

	var getChannelLogo = function(channelLogicalPosition, logoSize) {
		var logoUrl = "";
		if (ChannelHandler.channelList.length > 0) {
			for (var i = 0; i < ChannelHandler.channelList.length; i++) {
				if (ChannelHandler.channelList[i].channelNumber === channelLogicalPosition) {
					if (ChannelHandler.channelList[i].stationSchedules !== null && ChannelHandler.channelList[i].stationSchedules.length > 0) {
						for (var j = 0; j < ChannelHandler.channelList[i].stationSchedules[0].station.images.length; j++) {
							if (ChannelHandler.channelList[i].stationSchedules[0].station.images[j].assetType === logoSize) {
								logoUrl = ChannelHandler.channelList[i].stationSchedules[0].station.images[j].url;
							}
						}
					}
				}
			}
		}
		return logoUrl;
	};

	return {
		initialize: function() {
			var that = ChannelHandler;
			new Request({
				url: Config.common.channelApiUrl,
				onComplete: function(request) {
					if (request.status === 200) {
						var listOfChannels = JSON.parse(request.response);
						if (listOfChannels !== null) {
							if (listOfChannels.channels !== null) {
								that.channelList = listOfChannels.channels;
							}
						}
					}
				}
			}).send();
		},

		getChannelLogoMedium: function(channelLogicalPosition) {
			return getChannelLogo(channelLogicalPosition, mediumSize);
		},

		cleanUp: function() {
			delete this.channelList;
		}
	};
})();