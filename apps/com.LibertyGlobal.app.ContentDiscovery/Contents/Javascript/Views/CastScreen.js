var CastScreen = new MAF.Class({
	ClassName: 'CastScreen',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initialize: function() {
		var view = this;
		view.parent();
		view.cast = this.persist.cast;
	},

	updateData: function(view) {
		// if (view.cast.alsoKnown.length > 0) {
		// 	view.controls.coverBar.changeDataset(view.cast.alsoKnown);
		// 	view.controls.coverBar.show();
		// 	view.elements.coverBarTitle.show();
		// }
		view.elements.Title.setText("Amy Adams");
		view.elements.Prop1Value.setText("20 August 1974");
		view.elements.Prop2Value.setText("Vincenza, Italy");
		view.elements.Biography.setText("Amy Lou Adams was born in Italy, to American parents Kathryn (Hicken) and Richard Kent Adams, while her father was a U.S. serviceman. She was raised in a Mormon family of seven children in Castle Rock, Colorado, and has English, as well as Danish, German, and Norwegian, ancestry. Adams sang in the school choir at Douglas County High School and was an apprentice dancer at a local dance company, with the ambition of becoming a ballerina. However, she worked as a greeter at The Gap and as a Hooters hostess to support herself before finding work as a dancer at Boulder's Dinner Theatre and Country Dinner Playhouse in such productions as Brigadoon and A Chorus Line. It was there that she was spotted by a Minneapolis dinner-theater director who asked her to move to Chanhassen, Minnesota for more regional dinner theater work.");

		view.controls.horizontalMenu.show();
		view.controls.horizontalMenu.setFocus();
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

		view.elements.Biography = new MAF.element.TextField({
			totalLines: 4,
			visibleLines: 4,
			styles: {
				color: '#FFFFFF',
				fontFamily: 'UPCDigital-Regular',
				fontSize: 26,
				vOffset: 320,
				hOffset: 340,
				height: 250,
				width: 750,
				opacity: 0.59,
				wrap: true,
				lineHeight: '35px',
				truncation: 'end'
			}
		}).appendTo(this.elements.rightContainer);

		view.controls.horizontalMenu = new HorizontalMenuControl({
			width: 1000,
			button1Visible: true,
			button2Visible: false,
			button3Visible: false,
			showBackground: false,
			button1Text: $_('CastInfoScreen_FullBiography_Button'),
			styles: {
				vOffset: 476,
				hOffset: 340
			},
			events: {
				onNavigate: function(event) {
					switch (event.payload.direction) {
						case 'down':
						case 'right':
							view.controls.backButton.setFocus();
							event.preventDefault();
							event.stopPropagation();
							break;
					}
				},
				onButtonSelect: function(eventData) {
					switch (eventData.payload.action) {
						case 1:
							MAF.application.loadView('view-FullBiography', {
								"cast": view.cast
							});
							break;
					}
				}
			}
		}).appendTo(this.elements.rightContainer);

		view.elements.coverBarTitle = new MAF.element.Text({
			data: $_('CastInfoScreen_AlsoKnownFor_Text'),
			styles: {
				color: '#cecece',
				fontFamily: 'InterstatePro-ExtraLight, sans-serif',
				fontSize: 33.3,
				height: 50,
				vOffset: 580,
				hOffset: 50
			}
		}).appendTo(this.elements.rightContainer);
		view.elements.coverBarTitle.hide();

		view.controls.coverBar = new CoverBarControl({
			showText: false,
			styles: {
				height: 380,
				width: 'inherit',
				vOffset: 625,
				hOffset: 45
			},
			events: {}
		}).appendTo(this.elements.rightContainer);
		view.controls.coverBar.hide();

		view.controls.backButton = new ButtonControl({
			buttonText: $_('CastInfoScreen_Back_Button'),
			styles: {
				vOffset: 960,
				hOffset: 45,
				width: 379,
				height: 66
			},
			events: {
				onNavigate: function(eventData) {
					switch (eventData.payload.direction) {
						case "left":
						case "up":
							view.controls.horizontalMenu.setFocus();
							break;
						case "right":
						case "down":
							break;
					}
					eventData.preventDefault();
					eventData.stopPropagation();
				},
				onSelect: function() {
					MAF.application.loadView('view-MainScreen');
				}
			}
		}).appendTo(this.elements.rightContainer);
	},

	updateView: function() {
		var view = this;
		//view.assetId = this.persist.assetId;
		this.updateData(view);
	},

	destroyView: function() {
		delete this.elements.Title;
		delete this.elements.PosterContainer;
		delete this.elements.Poster;
		delete this.elements.Prop1Text;
		delete this.elements.Prop1Value;
		delete this.elements.Prop2Text;
		delete this.elements.Prop2Value;
		delete this.elements.Biography;
		delete this.elements.coverBarTitle;
		delete this.controls.coverBar;
		delete this.controls.horizontalMenu;
		delete this.controls.sideBarContainer;
		delete this.controls.backButton;
		delete this.cast.alsoKnown;
		delete this.cast;
	}
});