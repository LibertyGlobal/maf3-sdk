function Reminder(assetId, start, title, channelName, channelNr) {
	this.assetId = assetId;
	this.start = start;
	this.title = title;
	this.channelName = channelName;
	this.channelNr = channelNr;
	this.timer = null;

	this.cleanUp = function() {
		if (this.timer !== null) {
			this.timer.stop();
			this.timer = null;
		}
	};
}