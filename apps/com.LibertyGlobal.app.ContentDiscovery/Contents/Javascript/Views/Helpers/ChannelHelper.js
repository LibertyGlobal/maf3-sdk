var ChannelHelpers = (function() {
	var mediumSize = "station-logo-medium";

	var getChannelLogo = function(channelLogicalPosition, logoSize) {
		var logoUrl = "";
		if(Config.common.channelList.length>0)
		{
			for (var i = 0; i < Config.common.channelList.length; i++) {
				if (Config.common.channelList[i].channelNumber === channelLogicalPosition) {
					if(Config.common.channelList[i].stationSchedules!==null && Config.common.channelList[i].stationSchedules.length > 0) {
						for (var j = 0; j< Config.common.channelList[i].stationSchedules[0].station.images.length; j++) {
							if(Config.common.channelList[i].stationSchedules[0].station.images[j].assetType === logoSize)
							{
								logoUrl = Config.common.channelList[i].stationSchedules[0].station.images[j].url;
							}
						}
					}					
				}
			}
		}
		return logoUrl;
	};

	return {
		getChannelLogoMedium: function(channelLogicalPosition) {
			return getChannelLogo(channelLogicalPosition, mediumSize);
		}
	};
})();