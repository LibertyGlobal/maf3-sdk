var AppInfoScreen = new MAF.Class({
	ClassName: 'AppInfoScreen',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initialize: function () {
		var view = this;
		view.parent();
	},

	// Create your view template
	createView: function () {
		var view = this;
		view.setStyles({
			backgroundColor: "Black",
			opacity: 0.5
		});

		view.elements.backgroundImageNormal = new MAF.element.Image({
			source: 'Images/background_popup.jpg',
			styles: {
				vOffset: 108,
				hOffset: 122,
				opacity: 1
			}
		}).appendTo(view);
	},

	updateView: function () {
		var view = this;
	},	

	destroyView: function () {
		var view = this;
	}
});