var InfoScreen = new MAF.Class({
	ClassName: 'InfoScreen',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initView: function() {
		var view = this;
		view.parent();
		view.assetId = this.persist.assetId;
		view.menuLabel = this.persist.menuLabel;
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

					if (view.asset.video.cast !== undefined) {
						if (view.asset.video.cast.data.length > 0) {
							view.elements.coverBar.changeDataset(view.asset.video.cast.data);
							view.elements.coverBar.show();
							view.elements.coverBarTitle.show();
						}
					}

					view.elements.reminderSetImage.setSource("");
					if (view.isLive) {
						view.elements.viewReminderButton.content[0].setText($_('InfoScreen_Button_View_Now_Text'));
					} else {
						if (ReminderHandler.isReminderSet(view.asset.id) === true) {
							view.elements.viewReminderButton.content[0].setText($_('InfoScreen_Button_Remove_Reminder_Text'));
							view.elements.reminderSetImage.setSource("Images/UPC_Picto_Reminder.png");
						} else {
							view.elements.viewReminderButton.content[0].setText($_('InfoScreen_Button_Set_Reminder_Text'));
						}
					}
					view.elements.viewReminderButton.focus();
				}
			});
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
			styles: {
				height: 550,
				width: 'inherit',
				vOffset: 80,
				hOffset: 50
			}
		}).appendTo(this.elements.rightContainer);
		view.controls.assetDetails.clearData();

		view.elements.buttonBackground = new MAF.element.Container({
			styles: {
				backgroundImage: "Images/horizontal_menu_background.png",
				width: 1000,
				height: 71,
				vOffset: 476,
				hOffset: 340
			}
		}).appendTo(this.elements.rightContainer);

		view.elements.viewReminderButton = new MAF.element.Button({
			focus: true,
			content: [
				new MAF.element.Text({
					text: $_('InfoScreen_Button_Set_Reminder_Text'),
					anchorStyle: 'leftMiddle',
					styles: {
						width: 333,
						height: 66,
						hAlign: 'left',
						vAlign: 'center',
						marginLeft: 25
					}
				}), new MAF.element.Container({
					styles: {
						width: 333,
						height: 66,
						borderWidth: 3,
						borderColor: '#FFFFFF'
					}
				})
			],
			styles: {
				width: 333,
				height: 66,
				vOffset: 3,
				hOffset: 0
			},
			events: {
				onAppend: function() {
					this.element.removeClass('SubmenuButtonHighlight');
					this.element.addClass('SubmenuButtonNormal');
					this.content[1].setStyle("borderStyle", "none");
				},
				onFocus: function() {
					this.element.addClass('SubmenuButtonHighlight');
					this.element.removeClass('SubmenuButtonNormal');
					this.content[1].setStyle("borderStyle", "solid");
				},
				onBlur: function() {
					this.element.addClass('SubmenuButtonNormal');
					this.element.removeClass('SubmenuButtonHighlight');
					this.content[1].setStyle("borderStyle", "none");
				},
				onSelect: function() {
					if (view.isLive) {
						ReportingHandler.sendUsageReport(view.menuLabel, "tuneFromDetails");
						MAF.application.exitToLive();
					} else {
						if (ReminderHandler.isReminderSet(view.asset.id) === true) {
							ReportingHandler.decreaseCounterReminders();
							ReminderHandler.removeReminder(view.asset.id);
							view.elements.viewReminderButton.content[0].setText($_('InfoScreen_Button_Set_Reminder_Text'));
							view.elements.reminderSetImage.setSource("");
						} else {
							ReportingHandler.increaseCounterReminders();
							ReminderHandler.setReminder(
								view.asset.id,
								view.asset.start,
								view.asset.video.title,
								view.asset.channel.name,
								view.asset.channel.logicalPosition);
							view.elements.viewReminderButton.content[0].setText($_('InfoScreen_Button_Remove_Reminder_Text'));
							view.elements.reminderSetImage.setSource("Images/UPC_Picto_Reminder.png");
						}
					}
				}
			}
		}).appendTo(view.elements.buttonBackground);

		view.elements.shareButton = new MAF.element.Button({
			content: [
				new MAF.element.Text({
					text: $_('InfoScreen_Button_Share_Text'),
					anchorStyle: 'leftMiddle',
					styles: {
						width: 333,
						height: 66,
						hAlign: 'left',
						vAlign: 'center',
						marginLeft: 25
					}
				}), new MAF.element.Container({
					styles: {
						width: 333,
						height: 66,
						borderWidth: 3,
						borderColor: '#FFFFFF'
					}
				})
			],
			styles: {
				width: 333,
				height: 66,
				vOffset: 3,
				hOffset: 334
			},
			events: {
				onAppend: function() {
					this.element.removeClass('SubmenuButtonHighlight');
					this.element.addClass('SubmenuButtonNormal');
					this.content[1].setStyle("borderStyle", "none");
				},
				onFocus: function() {
					this.element.addClass('SubmenuButtonHighlight');
					this.element.removeClass('SubmenuButtonNormal');
					this.content[1].setStyle("borderStyle", "solid");
				},
				onBlur: function() {
					this.element.addClass('SubmenuButtonNormal');
					this.element.removeClass('SubmenuButtonHighlight');
					this.content[1].setStyle("borderStyle", "none");
				},
				onSelect: function() {
					MAF.application.loadView('view-ShareScreen', {
						"assetId": view.assetId
					});
				}
			}
		}).appendTo(view.elements.buttonBackground);

		view.elements.fullSynopsisButton = new MAF.element.Button({
			content: [
				new MAF.element.Text({
					text: $_('InfoScreen_Button_Full_Synopsis_Text'),
					anchorStyle: 'leftMiddle',
					styles: {
						width: 333,
						height: 66,
						hAlign: 'left',
						vAlign: 'center',
						marginLeft: 25
					}
				}), new MAF.element.Container({
					styles: {
						width: 333,
						height: 66,
						borderWidth: 3,
						borderColor: '#FFFFFF'
					}
				})
			],
			styles: {
				width: 333,
				height: 66,
				vOffset: 3,
				hOffset: 667
			},
			events: {
				onAppend: function() {
					this.element.removeClass('SubmenuButtonHighlight');
					this.element.addClass('SubmenuButtonNormal');
					this.content[1].setStyle("borderStyle", "none");
				},
				onFocus: function() {
					this.element.addClass('SubmenuButtonHighlight');
					this.element.removeClass('SubmenuButtonNormal');
					this.content[1].setStyle("borderStyle", "solid");
				},
				onBlur: function() {
					this.element.addClass('SubmenuButtonNormal');
					this.element.removeClass('SubmenuButtonHighlight');
					this.content[1].setStyle("borderStyle", "none");
				},
				onSelect: function() {
					MAF.application.loadView('view-FullSynopsis', {
						"asset": view.asset
					});
				}
			}
		}).appendTo(view.elements.buttonBackground);

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

		view.elements.coverBar = new MAF.element.SlideCarousel({
			visibleCells: 6,
			focusIndex: 1,
			slideDuration: 0.2,
			styles: {
				width: 1500,
				height: 380,
				vOffset: 645,
				hOffset: 45
			},
			cellCreator: function() {
				var cell = new MAF.element.SlideCarouselCell({
					styles: {
						height: 380,
						width: 250
					},
					events: {
						onFocus: function() {
							this.PosterBorderContainer.animate({
								borderStyle: 'solid'
							});
						},
						onBlur: function() {
							this.PosterBorderContainer.animate({
								borderStyle: 'none'
							});
						}
					}
				});

				cell.PosterContainer = new MAF.element.Container({
					styles: {
						height: 294,
						width: 204,
						marginTop: 5,
						marginLeft: 5,
						backgroundColor: '#b2bfcb'
					}
				}).appendTo(cell);
				cell.Poster = new MAF.element.Image({
					aspect: 'auto',
					styles: {
						margin: 1,
						height: 292,
						width: 202
					}
				}).appendTo(cell.PosterContainer);
				cell.PosterBorderContainer = new MAF.element.Container({
					styles: {
						height: 300,
						width: 210,
						vOffset: 2,
						hOffset: 2,
						borderWidth: 3,
						borderColor: '#FFFFFF'
					}
				}).appendTo(cell);

				cell.Title = new MAF.element.TextField({
					totalLines: 2,
					visibleLines: 2,
					styles: {
						color: '#aca7b2',
						fontFamily: 'UPCDigital-Regular',
						fontSize: 24,
						vOffset: 304,
						height: 70,
						width: 204,
						wrap: true,
						truncation: 'end'
					}
				}).appendTo(cell);
				return cell;
			},
			cellUpdater: function(cell, data) {
				cell.Title.setText(data.name);
				cell.Poster.setSource(data.image);
			},
			events: {
				onDatasetChanged: function() {
					this.getCurrentCell().focus();
					this.animate({
						opacity: 1,
						duration: 0.2
					});
				},
				onSelect: function() {
					ReportingHandler.increaseCounterBio();
					MAF.application.loadView('view-CastScreen', {
						"name": this.getCurrentCell().Title.text
					});
				}
			}
		}).appendTo(this.elements.rightContainer);
		view.elements.coverBar.hide();

		view.elements.reminderSetImage = new MAF.element.Image({
			source: '',
			styles: {
				vOffset: 181,
				hOffset: 700,
				height: 30,
				width: 30
			}
		}).appendTo(this.elements.rightContainer);
	},

	updateView: function() {
		var view = this;
		sideBarContainer.moveTo(this);
		view.controls.assetDetails.clearData();
		view.elements.reminderSetImage.setSource("");
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
		this.asset = null;
		delete this.asset;
		delete this.elements.coverBar;
		delete this.controls.assetDetails;
		delete this.elements.reminderSetImage;
		delete this.elements.buttonBackground;
		delete this.elements.viewReminderButton;
		delete this.elements.shareButton;
		delete this.elements.fullSynopsisButton;
		delete this.casts;
		delete this.asset;
	}
});