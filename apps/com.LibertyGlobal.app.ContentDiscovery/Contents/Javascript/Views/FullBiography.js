var FullBiography = new MAF.Class({
	ClassName: 'FullBiography',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initView: function() {
		var view = this;
		view.parent();
	},

	updateData: function(view) {
		if (this.persist.cast !== undefined) {
			view.elements.Title.setText(this.persist.cast.name);
			view.elements.Prop1Value.setText(this.persist.cast.dateofBirth);
			view.elements.Prop2Value.setText(this.persist.cast.placeOfBirth);
			view.elements.Biography.setText(this.persist.cast.biography);
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

		view.elements.Title = new MAF.element.Text({
			styles: {
				color: '#FFFFFF',
				fontFamily: 'InterstatePro-Light, sans-serif',
				fontSize: 50,
				width: 'inherit' - 20,
				truncation: 'end',
				vOffset: 80,
				hOffset: 50,
				margin: 0,
				padding: 0
			}
		}).appendTo(this.elements.rightContainer);

		view.elements.PosterContainer = new MAF.element.Container({
			styles: {
				vOffset: 170,
				hOffset: 50,
				height: 374,
				width: 260,
				backgroundColor: '#b2bfcb',
				padding: 1
			}
		}).appendTo(this.elements.rightContainer);
		view.elements.Poster = new MAF.element.Image({
			styles: {
				height: 372,
				width: 258
			}
		}).appendTo(this.PosterContainer);

		view.elements.Prop1Text = new MAF.element.Text({
			data: $_('CastInfoScreen_DateOfBirth_Text'),
			styles: {
				color: '#FFFFFF',
				fontFamily: 'UPCDigital-Regular',
				fontSize: 26,
				height: 30,
				vOffset: 180,
				hOffset: 340,
				opacity: 0.59,
				width: 180
			}
		}).appendTo(this.elements.rightContainer);
		view.elements.Prop1Value = new MAF.element.Text({
			styles: {
				color: '#FFFFFF',
				fontFamily: 'UPCDigital-Regular',
				fontSize: 26,
				height: 30,
				hOffset: 540,
				vOffset: 180,
				width: 220,
				wrap: true,
				truncation: 'end'
			}
		}).appendTo(this.elements.rightContainer);

		view.elements.Prop2Text = new MAF.element.Text({
			data: $_('CastInfoScreen_PlaceOfBirth_Text'),
			styles: {
				color: '#FFFFFF',
				fontFamily: 'UPCDigital-Regular',
				fontSize: 26,
				height: 30,
				vOffset: 215,
				hOffset: 340,
				opacity: 0.59,
				width: 180
			}
		}).appendTo(this.elements.rightContainer);
		view.elements.Prop2Value = new MAF.element.Text({
			styles: {
				color: '#FFFFFF',
				fontFamily: 'UPCDigital-Regular',
				fontSize: 26,
				height: 30,
				hOffset: 540,
				vOffset: 215,
				width: 220,
				wrap: true,
				truncation: 'end'
			}
		}).appendTo(this.elements.rightContainer);

		view.elements.Biography = new PageableTextGridControl({
			styles: {
				vOffset: 300,
				hOffset: 340,
				width: 1100,
				height: 600
			}
		}).appendTo(this.elements.rightContainer);

		view.controls.backButton = new ButtonControl({
			buttonText: $_('CastFullBiographyScreen_Back_Button'),
			styles: {
				vOffset: 960,
				hOffset: 340,
				width: 379,
				height: 66
			},
			events: {
				onNavigate: function(eventData) {
					switch (eventData.payload.direction) {
						case "left":
						case "right":
							view.elements.Biography.shiftPage(eventData.payload.direction);
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
		view.elements.Biography.setText("");
		this.updateData(view);
	},

	destroyView: function() {
		var view = this;
		delete view.elements.backgroundImageNormal;
		delete view.controls.sideBarContainer;
		delete view.elements.rightContainer;
		delete view.elements.Title;
		delete view.elements.PosterContainer;
		delete view.elements.Poster;
		delete view.elements.Prop1Text;
		delete view.elements.Prop1Value;
		delete view.elements.Prop2Text;
		delete view.elements.Prop2Value;
		delete view.elements.Biography;
		delete view.controls.backButton;
	}
});