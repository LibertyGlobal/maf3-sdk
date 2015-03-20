var FullSynopsis = new MAF.Class({
	ClassName: 'FullSynopsis',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initView: function() {
		var view = this;
		view.parent();
	},

	updateData: function(view) {
		if (this.persist.asset !== undefined) {
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

		view.elements.rightContainer = new MAF.element.Container({
			styles: {
				height: 1080,
				width: 1680,
				hOffset: sideBarContainer.width
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

		view.controls.backButton = new MAF.element.Button({
			focus: true,
			content: [
				new MAF.element.Text({
					text: $_('FullSynopsisScreen_Back_Button'),
					anchorStyle: 'center',
					styles: {
						width: 379,
						height: 66,
						hAlign: 'center',
						vAlign: 'center'
					}
				})
			],
			styles: {
				vOffset: 915,
				hOffset: 340,
				width: 379,
				height: 66
			},
			events: {
				onAppend: function() {
					this.element.addClass('GeneralButtonNormal');
				},
				onFocus: function() {
					this.element.addClass('GeneralButtonHighlight');
					this.element.removeClass('GeneralButtonNormal');
				},
				onBlur: function() {
					this.element.addClass('GeneralButtonNormal');
					this.element.removeClass('GeneralButtonHighlight');
				},
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
	},

	updateView: function() {
		var view = this;
		sideBarContainer.moveTo(this);
		view.elements.synopsisText.setText("");
		view.controls.assetDetails.clearData();
		this.updateData(view);
	},

	destroyView: function() {
		var view = this;
		delete view.elements.backgroundImageNormal;
		delete view.elements.rightContainer;
		delete view.controls.assetDetails;
		delete view.elements.synopsisText;
		delete view.controls.backButton;
	}
});