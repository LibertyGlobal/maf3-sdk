var InfoScreen = new MAF.Class({
	ClassName: 'InfoScreen',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initialize: function() {
		var view = this;
		view.parent();
		view.assetId = this.persist.assetId;
		view.isLive = false;
		view.asset = null;
	},

	updateData: function(view) {
		LGI.Guide.Broadcast.create()
			.fields(LGI.Guide.Broadcast.ID, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START, LGI.Guide.Broadcast.END,
				LGI.Guide.Broadcast.AGE_RATING, LGI.Guide.Broadcast.CAST, LGI.Guide.Broadcast.CHANNEL,
				LGI.Guide.Broadcast.POPULARITY, LGI.Guide.Broadcast.SEASON, LGI.Guide.Broadcast.EPISODE,
				LGI.Guide.Broadcast.STATISTICS, LGI.Guide.Broadcast.POPULARITY, 'video.year', "video.language", LGI.Guide.Broadcast.SYNOPSIS,
				"video.shortSynopsis", LGI.Guide.Broadcast.IMAGE_LINK, LGI.Guide.Broadcast.CATEGORY, "video.subcategory")
			.filter(LGI.Guide.Broadcast.ID.equalTo(view.assetId))
			.findOne(function(response) {
				if (response.length > 0) {
					view.asset = response[0];
					view.ExtractIMDBRating(view);
					view.isLive = (moment() > moment(response[0].start) && moment() < moment(response[0].end));
					view.controls.assetDetails.changeData(response[0]);

					if (view.isLive) {
						view.controls.horizontalMenu.config.button1Text = $_('InfoScreen_Button_View_Now_Text');
					} else {
						if (ReminderHandler.isReminderSet(view.asset.id) === true) {
							view.controls.horizontalMenu.config.button1Text = $_('InfoScreen_Button_Remove_Reminder_Text');
						} else {
							view.controls.horizontalMenu.config.button1Text = $_('InfoScreen_Button_Set_Reminder_Text');
						}
					}
					view.controls.horizontalMenu.updateButtonText();
					view.controls.horizontalMenu.show();
					view.controls.horizontalMenu.setFocus();

					if (view.asset.video.cast !== undefined) {
						if (view.asset.video.cast.data.length > 0) {
							view.controls.coverBar.changeDataset(view.asset.video.cast.data);
							view.controls.coverBar.show();
							view.elements.coverBarTitle.show();
						}
					}
				}
			});
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
			styles: {
				height: 550,
				width: 'inherit',
				vOffset: 80,
				hOffset: 50
			}
		}).appendTo(this.elements.rightContainer);
		view.controls.assetDetails.clearData();

		view.controls.horizontalMenu = new HorizontalMenuControl({
			width: 1000,
			button1Text: $_('InfoScreen_Button_Set_Reminder_Text'),
			button2Text: $_('InfoScreen_Button_Share_Text'),
			button3Text: $_('InfoScreen_Button_Full_Synopsis_Text'),
			styles: {
				vOffset: 476,
				hOffset: 340
			},
			events: {
				onNavigate: function(event) {
					switch (event.payload.direction) {
						case 'down':
							if (view.asset.video.cast.data.length > 0) {
								view.controls.coverBar.setFocus();
							}
							event.preventDefault();
							event.stopPropagation();
							break;
					}
				},
				onButtonSelect: function(eventData) {
					switch (eventData.payload.action) {
						case 1:
							if (view.isLive) {
								MAF.application.exitToLive();
							} else {
								if (ReminderHandler.isReminderSet(view.asset.id) === true) {
									ReminderHandler.removeReminder(view.asset.id);
									view.controls.horizontalMenu.config.button1Text = $_('InfoScreen_Button_Set_Reminder_Text');
								} else {
									ReminderHandler.setReminder(
										view.asset.id,
										view.asset.start,
										view.asset.video.title,
										view.asset.channel.name,
										view.asset.channel.logicalPosition);
									view.controls.horizontalMenu.config.button1Text = $_('InfoScreen_Button_Remove_Reminder_Text');
								}
								view.controls.horizontalMenu.updateButtonText();
							}
							break;
						case 2:
							MAF.application.loadView('view-ShareScreen', {
								"assetId": view.assetId
							});
							break;
						case 3:
							MAF.application.loadView('view-FullSynopsis', {
								"asset": view.asset
							});
							break;
					}
				}
			}
		}).appendTo(this.elements.rightContainer);
		view.controls.horizontalMenu.hide();

		view.elements.coverBarTitle = new MAF.element.Text({
			data: $_('InfoScreen_Cast_Text'),
			styles: {
				color: '#cecece',
				fontFamily: 'InterstatePro-ExtraLight, sans-serif',
				fontSize: 33.3,
				height: 50,
				vOffset: 600,
				hOffset: 50
			}
		}).appendTo(this.elements.rightContainer);
		view.elements.coverBarTitle.hide();

		view.controls.coverBar = new CoverBarControl({
			styles: {
				height: 380,
				width: 'inherit',
				vOffset: 645,
				hOffset: 45
			},
			events: {
				onNavigateUp: function() {
					view.controls.horizontalMenu.setFocus();
				},
				onCastSelect: function(eventData) {
					MAF.application.loadView('view-CastScreen', {
						"cast": eventData.payload.cast
					});
				}
			}
		}).appendTo(this.elements.rightContainer);
		view.controls.coverBar.hide();
	},

	updateView: function() {
		var view = this;
		view.controls.assetDetails.clearData();
		view.assetId = this.persist.assetId;
		this.updateData(view);
	},

	ExtractIMDBRating: function(view) {
		var startImdb = view.asset.video.synopsis.indexOf(" IMDb");
		if (startImdb >= 0) {
			var endImdb = view.asset.video.synopsis.indexOf("/10");
			var imdbText = view.asset.video.synopsis.substring(startImdb, endImdb);
			var firstPart = view.asset.video.synopsis.substring(0, startImdb);
			var secondPart = view.asset.video.synopsis.substring(endImdb + 3, view.asset.video.synopsis.length);
			var imdbRating = imdbText.slice(imdbText.indexOf(":") + 1, endImdb).trim();
			view.asset.video.synopsis = firstPart + secondPart;
			view.asset.video.retrievedImdb = imdbRating;
		}
	},

	destroyView: function() {
		delete this.controls.coverBar;
		delete this.controls.assetDetails;
		delete this.controls.horizontalMenu;
		delete this.controls.sideBarContainer;
		delete this.casts;
		delete this.asset;
	}
});