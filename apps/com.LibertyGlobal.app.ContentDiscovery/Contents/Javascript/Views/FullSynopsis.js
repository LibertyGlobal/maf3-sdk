var FullSynopsis = new MAF.Class({
	ClassName: 'FullSynopsis',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initialize: function() {
		var view = this;
		view.parent();
	},

	updateData: function(view) {
		if (this.persist.asset !== undefined) {
			view.controls.assetDetails.ReminderImage.hide();
			view.controls.assetDetails.changeData(this.persist.asset);
			view.elements.synopsisText.setText(this.persist.asset.video.synopsis);
			view.controls.backButton.focus();
		}
	},

	// Create your view template
	createView: function() {
		var view = this;
		view.elements.backgroundImageNormal = new MAF.element.Image({
			source: 'Images/background_main.jpg'
		}).appendTo(view);

		view.controls.sideBarContainer = new SidebarControl({}).appendTo(view);

		view.elements.rightContainer = new MAF.element.Container({
			styles: {
				height: 1080,
				width: 1680,
				position: 'relative',
				display: 'inline-block'
			}
		}).appendTo(view);

		view.controls.assetDetails = new AssetDetailControl({
			showSynopsis: false,
			styles: {
				height: 550,
				width: 'inherit',
				vOffset: 80,
				hOffset: 50
			}
		}).appendTo(this.elements.rightContainer);
		view.controls.assetDetails.clearData();

		view.elements.synopsisText = new PageableTextGridControl({
			styles: {
				vOffset: 500,
				hOffset: 340,
				width: 1100,
				height: 400
			}
		}).appendTo(this.elements.rightContainer);

		view.controls.backButton = new ButtonControl({
			buttonText: $_('FullSynopsisScreen_Back_Button'),
			styles: {
				vOffset: 915,
				hOffset: 340,
				width: 379,
				height: 66
			},
			events: {
				onNavigate: function(eventData) {
					switch (eventData.payload.direction) {
						case "left":
						case "right":
							view.elements.synopsisText.shiftPage(eventData.payload.direction);
							break;
						case "up":
						case "down":
							break;
					}
				},
				onSelect: function() {
					MAF.application.loadView('view-MainScreen');
				}
			}
		}).appendTo(this.elements.rightContainer);
		view.controls.backButton.focus();
	},

	updateView: function() {
		var view = this;
		view.elements.synopsisText.setText("");
		view.controls.assetDetails.clearData();
		this.updateData(view);
	},

	destroyView: function() {
		var view = this;
		delete view.elements.backgroundImageNormal;
		delete view.controls.sideBarContainer;
		delete view.elements.rightContainer;
		delete view.controls.assetDetails;
		delete view.elements.synopsisText;
		delete view.controls.backButton;
	}
});