var EmptyScreen = new MAF.Class({
	ClassName: 'EmptyScreen',
	Extends: MAF.system.FullscreenView,

	initialize: function () {
		this.parent();
		MAF.mediaplayer.init();
	},

	createView: function () {	
	},

	updateView: function () {
		MAF.mediaplayer.setViewportBounds(0, 0, 1920, 1080);
		MAF.mediaplayer.setChannelByNumber(this.persist.channelNr);
	},	

	destroyView: function () {
	}
});