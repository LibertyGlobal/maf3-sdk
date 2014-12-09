function AssetReminder(assetId, start, title, channelName, channelNr) {
	this.assetId = assetId;
	this.start = start;
	this.title = title;
	this.channelName = channelName;
	this.channelNr = channelNr;
	this.timer = null;

	this.startTimer = function() {
		if(this.timer === null)
		{
			this.timer = new Timer();
			this.timer.start();
		}
	};

	this.cleanupTimer = function() {
		if (this.timer !== null) {
			this.timer.stop();
			this.timer = null;
		}
	};

	this.timeoutCallback = function() {
		this.timer.stop();
		this.timer = null;


	};

	this.cleanUp = function() {
		this.cleanupTimer();
	};
}