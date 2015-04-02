var MainScreen = new MAF.Class({
	ClassName: 'MainScreen',
	Extends: MAF.system.FullscreenView,

	initView: function() {
		//screen.log("reminderhandler: " + ReminderHandler.handleCall2Action + ", " + ReminderHandler.handleCall2ActionChannelNr);
		// if (ReminderHandler.handleCall2Action !== null && ReminderHandler.handleCall2Action !== undefined) {
		// if (ReminderHandler.handleCall2Action === true) {
		// MAF.mediaplayer.setChannelByNumber(ReminderHsandler.handleCall2ActionChannelNr);
		// MAF.application.exitToLive();
		// }
		// }
		var view = this;
		view.menuOpacityIndex = [0.1, 0.25, 1, 0.25, 0.25, 0.05];
		view.currentMenu = [];
		view.currentAssets = [];
		view.currentAssetIndex = 1;
		view.autoNavigateTimer = null;
		view.currentProgressTimer = null;
		view.isLive = false;
		view.loading = false;
		view.parent();
		view.initializing = true;
		view.fnOnInfoButtonPress = view.onInfoButtonPress.subscribeTo(MAF.application, 'onWidgetKeyPress', view);
		view.fnOnProfileLoaded = view.onProfileLoaded.subscribeTo(MAF.application, 'onLoadProfile', view);
		view.fnOnProfileUnloaded = view.onProfileUnloaded.subscribeTo(MAF.application, 'onUnloadProfile', view);
		view.fnOnDialogCancelled = view.onDialogCancelledEvent.subscribeTo(MAF.application, 'onDialogCancelled', view);
		ConfigurationStorageHandler.initialize();
		InitializationHandler.initialize(view.onChannelInitializeComplete, view);
		ReportingHandler.clearCounters();
	},

	onChannelInitializeComplete: function(view) {
		MenuHandler.initialize();
		view.initializing = false;
		if (profile.name !== "") {
			view.updateProfileSettings(view, profile.name);
		}
		view.updateView();
	},

	onInfoButtonPress: function(event) {
		switch (event.type) {
			case "onWidgetKeyPress":
				if (event.payload !== undefined) {
					if (event.payload.keyCode === Config.get('infoButtonKeyCode')) // info button or home button on keyboard
					{
						if (sideBarContainer.isCollapsed === true) {
							if (this.loading === false) {
								this.loading = true; // avoid multiple clicks
								var selectedAsset = this.currentAssets[0];
								if (selectedAsset !== undefined) {
									ReportingHandler.increaseCounterDetails();
									MAF.application.loadView('view-InfoScreen', {
										"assetId": selectedAsset.id,
										"menuLabel": this.currentAssets[0].mainMenuLabel
									});
									event.preventDefault();
									event.stopPropagation();
								}
							}
						}
					}
				}
				break;
		}
	},

	onProfileLoaded: function(event) {
		var view = this;
		ConfigurationStorageHandler.retrieveProfileSettings();
		if (ConfigurationStorageHandler.isProfileSet()) {
			sideBarContainer.setProfileName(profile.name);
			MenuHandler.updateTextForItem("recommendations", $_("MenuItem_Recommendations_Preference_Text"), $_("MenuItem_Recommendations_MainMenu_Profile_Text", [profile.name]));
			if (FacebookService.isPaired() === true) {
				FacebookService.getProfilePicture(function(url) {
					ConfigurationStorageHandler.updateProfileImage(url);
					view.updateProfileSettings(view, profile.name);
				});
			}
			this.updateProfileSettings(this, profile.name);
			this.hideSidebar();
			this.reloadMenu(this, true);
		} else {
			MAF.application.loadView('view-PopupScreen', {
				"popupName": "preferences",
				"redirectPage": "view-MainScreen",
				"redirectParams": {
					"returnFromPopup": "preferences"
				}
			});
		}
	},

	onProfileUnloaded: function(event) {
		// not used as it is not sure that the profile dialog is closed already when this event occurs, 
		// moved code to onDialogDoneEvent as work around for this
	},

	onDialogCancelledEvent: function(event, data) {
		if (!profile.name || profile.name === "") {
			Twitter.reset();
			Facebook.reset();
			ConfigurationStorageHandler.updateProfileImage(ConfigurationStorageHandler.defaultProfileImage);
			this.updateProfileSettings(this, "");
			this.hideSidebar();
			this.reloadMenu(this, true);
		}
	},

	onMenuItemDataLoaded: function(menuItem, assets, view) {
		if (menuItem.mainMenuLabel === view.currentMenu[2].mainMenuLabel) {
			view.currentAssets = assets;
			view.currentAssetIndex = 0;
			view.setFocus(view, view.currentAssets[0]);
			view.elements.assetCarousel.changeDataset(view.currentAssets.slice(1), true);
			(view.currentMenu[2].autoNavigate === true) ? view.startAutoNavigate(view): view.stopAutoNavigate(view);
			view.elements.leftArrow.show();
			if (view.currentAssets.length > 0) {
				view.elements.rightArrow.show();
				view.elements.assetCarousel.show();
			} else {
				view.elements.rightArrow.hide();
				view.elements.assetCarousel.hide();

			}
		} else {
			view.setLoading(view);
			ContentDataRetriever.loadMenuData(view.currentMenu[2], false, view.onMenuItemDataLoaded, view);
		}
	},

	createView: function() {
		var view = this;
		view.elements.backgroundImageNormal = new MAF.element.Image({
			source: 'Images/background_main.jpg',
			aspect: 'source',
			manageWaitIndicator: true
		}).appendTo(view);

		view.elements.backgroundImageLive = new MAF.element.Image({
			source: 'Images/background_main_live.png',
			aspect: 'source',
			manageWaitIndicator: true
		}).appendTo(view);
		view.elements.backgroundImageLive.hide();

		sideBarContainer = new SidebarControl({
			styles: {
				vOffset: 0,
				hOffset: 0
			},
			events: {
				onNavigateRight: function() {
					view.hideSidebar();
				},
				onSelect: function(eventData) {
					if (sideBarContainer.isCollapsed === false) {
						switch (eventData.payload.action) {
							case "switch":
								if (ConfigurationStorageHandler.isAppProfileSet()) {
									MAF.HostEventManager.send("changeProfile");
								} else {
									MAF.application.loadView('view-PopupScreen', {
										"popupName": "welcome",
										"redirectPage": "view-MainScreen",
										"redirectParams": {
											"returnFromPopup": "welcome"
										}
									});
								}
								break;
							case "edit":
								MAF.application.loadView('view-PopupScreen', {
									"popupName": "preferences",
									"redirectPage": "view-MainScreen",
									"redirectParams": {
										"returnFromPopup": "preferences"
									}
								});
								break;
							case "about":
								MAF.application.loadView('view-PopupScreen', {
									"popupName": "appInfo",
									"redirectPage": "view-MainScreen",
									"redirectParams": {
										"returnFromPopup": "appInfo"
									}
								});
								break;
							case "exit":
								ReportingHandler.sendUsageReport("-", "close");
								MAF.HostEventManager.send("exitToDock");
								break;
						}
					}
				}
			}
		}).appendTo(view);

		view.elements.rightContainer = new MAF.element.Container({
			styles: {
				height: 1080,
				width: 1680,
				vOffset: 0,
				hOffset: sideBarContainer.width
			}
		}).appendTo(view);

		view.elements.verticalMenu = new MAF.element.Grid({
			rows: 6,
			columns: 1,
			orientation: 'vertical',
			styles: {
				width: 'inherit',
				height: 560,
				vOffset: 10,
				hOffset: 5,
				overflow: 'visible'
			},
			cellCreator: function() {
				var cell = new MAF.element.GridCell({
					focus: false,
					styles: {
						width: 1200,
						height: 92
					}
				});

				cell.title = new MAF.element.Text({
					styles: {
						color: '#ffffff',
						fontFamily: 'InterstatePro-ExtraLight',
						fontSize: 60,
						width: cell.width,
						height: 92,
						anchorStyle: 'leftMiddle'
					}
				}).appendTo(cell);
				return cell;
			},
			cellUpdater: function(cell, data) {
				cell.title.setText(data.mainMenuLabel);
				cell.title.setStyle('opacity', view.menuOpacityIndex[cell.getCellDataIndex()]);
				cell.setStyle('vOffset', (cell.getCellDataIndex() === 3) ? 500 : 0);
			}
		}).appendTo(this.elements.rightContainer);

		view.elements.assetCarousel = new MAF.element.Grid({
			rows: 1,
			columns: 3,
			carousel: true,
			styles: {
				height: 498,
				width: 780,
				vOffset: 341,
				hOffset: 1010
			},
			cellCreator: function() {
				var cell = new MAF.element.GridCell({
					focus: false,
					styles: this.getCellDimensions()
				});

				cell.poster = new MAF.element.Image({
					aspect: 'crop',
					styles: {
						height: 304,
						width: 215,
						borderColor: '#b2bfcb',
						borderStyle: 'solid',
						borderWidth: 2
					}
				}).appendTo(cell);

				cell.title = new MAF.element.Text({
					styles: {
						color: '#cecece',
						fontFamily: 'InterstatePro-Light, sans-serif',
						fontSize: 28,
						vOffset: 310,
						height: 30,
						width: 215,
						truncation: 'end'
					}
				}).appendTo(cell);

				cell.startEnd = new MAF.element.Text({
					styles: {
						color: '#cecece',
						fontFamily: 'InterstatePro-Light, sans-serif',
						fontSize: 28,
						height: 30,
						vOffset: 345,
						width: 215
					}
				}).appendTo(cell);
				cell.channel = new MAF.element.Image({
					aspect: 'auto',
					styles: {
						height: 30,
						width: 200,
						vOffset: 395
					}
				}).appendTo(cell);
				return cell;
			},
			cellUpdater: function(cell, data) {
				if (data !== null) {
					if (data.video !== null) {
						cell.title.setText(data.video.title);
						cell.poster.setSource(data.video.imageLink.href);
						cell.poster.show();
						cell.startEnd.setText(moment(data.start).format("HH:mm") + " - " + moment(data.end).format("HH:mm"));

						var logoUrl = InitializationHandler.getChannelLogoMedium(data.channel.logicalPosition);
						if (logoUrl !== "") {
							cell.channel.setSource(logoUrl);
							cell.channel.show();
						}
					}
				} else {
					cell.title.setText('');
					cell.poster.setSource('');
					cell.poster.hide();
					cell.startEnd.setText('');
					cell.channel.setSource('');
					cell.channel.hide();
				}
			},
			events: {
				onDatasetChanged: function() {
					this.animate({
						opacity: 1,
						duration: 0.2
					});
				}
			}
		}).appendTo(this.elements.rightContainer);

		view.elements.leftArrow = new MAF.element.Image({
			source: 'Images/arrow_left.png',
			styles: {
				height: 63,
				width: 63,
				vOffset: 496,
				hOffset: 0
			}
		}).appendTo(this.elements.rightContainer);
		view.elements.leftArrow.hide();

		view.elements.rightArrow = new MAF.element.Image({
			source: 'Images/arrow_right.png',
			aspect: 'crop',
			styles: {
				height: 63,
				width: 63,
				vOffset: 496,
				hOffset: 930
			}
		}).appendTo(this.elements.rightContainer);

		// future item
		this.elements.futureContainer = new MAF.element.Container({
			focus: true,
			styles: {
				backgroundImage: 'Images/asset_background_future_focus.png',
				backgroundColor: '#FFFFFF',
				height: 474,
				width: 843,
				hOffset: 75,
				vOffset: 296,
				padding: 5
			},
			events: {
				onNavigate: function(event) {
					view.navigate(event, view);
				},
				onSelect: function(eventData) {
					if (ReminderHandler.isReminderSet(view.currentAssets[0].id) === true) {
						ReportingHandler.decreaseCounterReminders();
						ReminderHandler.removeReminder(view.currentAssets[0].id);
					} else {
						ReportingHandler.increaseCounterReminders();
						ReminderHandler.setReminder(
							view.currentAssets[0].id,
							view.currentAssets[0].start,
							view.currentAssets[0].video.title,
							view.currentAssets[0].channel.name,
							view.currentAssets[0].channel.logicalPosition);
					}
					view.updateReminder(view);
				}
			}
		}).appendTo(this.elements.rightContainer);
		this.elements.futureContainer.hide();
		this.elements.futurePoster = new MAF.element.Image({
			aspect: 'crop',
			styles: {
				height: 465,
				width: 313,
				position: 'relative',
				display: 'inline'
			}
		}).appendTo(this.elements.futureContainer);
		this.elements.futureTitle = new MAF.element.Text({
			styles: {
				color: '#000000',
				fontFamily: 'UPCDigital-Bold',
				fontSize: 40,
				vOffset: 19,
				hOffset: 346,
				width: 410,
				truncation: 'end'
			}
		}).appendTo(this.elements.futureContainer);
		this.elements.futureInfoImage = new MAF.element.Image({
			source: 'Images/info.png',
			styles: {
				vOffset: 21,
				hOffset: 775,
				height: 42,
				width: 40
			}
		}).appendTo(this.elements.futureContainer);
		this.elements.futureGenre = new MAF.element.Text({
			styles: {
				color: '#7a7a7a',
				fontFamily: 'UPCDigital-Regular',
				fontSize: 30,
				vOffset: 80,
				hOffset: 346
			}
		}).appendTo(this.elements.futureContainer);
		this.elements.futureGenreValue = new MAF.element.Text({
			styles: {
				color: '#000000',
				fontFamily: 'UPCDigital-Regular',
				fontSize: 30,
				width: 356,
				vOffset: 80,
				hOffset: 452,
				truncation: 'end'
			}
		}).appendTo(this.elements.futureContainer);
		this.elements.futureChannel = new MAF.element.Image({
			aspect: 'auto',
			styles: {
				vOffset: 90,
				hOffset: 610,
				height: 40,
				width: 180,
				hAlign: 'right',
				right: 40
			}
		}).appendTo(this.elements.futureContainer);
		this.elements.futureStartEnd = new MAF.element.Text({
			styles: {
				color: '#000000',
				fontFamily: 'UPCDigital-Regular',
				fontSize: 30,
				vOffset: 115,
				hOffset: 346
			}
		}).appendTo(this.elements.futureContainer);
		this.elements.futureReminderImage = new MAF.element.Image({
			source: 'Images/UPC_Picto_Reminder_black.png',
			styles: {
				vOffset: 119,
				hOffset: 527,
				height: 30,
				width: 30
			}
		}).appendTo(this.elements.futureContainer);
		this.elements.futureReminderImage.hide();
		this.elements.futureSynopsis = new MAF.element.TextField({
			totalLines: 7,
			visibleLines: 7,
			styles: {
				color: '#000000',
				fontFamily: 'UPCDigital-Regular',
				fontSize: 26,
				vOffset: 166,
				hOffset: 346,
				height: 240,
				width: 464,
				wrap: true,
				truncation: 'end'
			}
		}).appendTo(this.elements.futureContainer);
		this.elements.futureReminder = new MAF.element.Text({
			styles: {
				color: '#000000',
				fontFamily: 'UPCDigital-Regular',
				fontSize: 30,
				vOffset: 415,
				hOffset: 346
			}
		}).appendTo(this.elements.futureContainer);

		// current item
		view.elements.currentContainer = new MAF.element.Container({
			focus: true,
			styles: {
				height: 498,
				width: 843,
				hOffset: 75,
				vOffset: 296,
				borderStyle: 'solid',
				borderWidth: 4,
				borderColor: '#FFFFFF',
				padding: 0
			},
			events: {
				onNavigate: function(event) {
					view.navigate(event, view);
				},
				onSelect: function(eventData) {
					ReportingHandler.sendUsageReport(view.currentMenu[2].mainMenuLabel, "tuneFromMain");
					MAF.application.exitToLive();
				}
			}
		}).appendTo(this.elements.rightContainer);
		this.elements.currentContainer.hide();
		view.elements.currentBackgroundImage = new MAF.element.Image({
			source: 'Images/asset_background_current_focus.png',
			styles: {
				vOffset: 370,
				hOffset: 0
			}
		}).appendTo(view.elements.currentContainer);
		view.elements.currentTitle = new MAF.element.Text({
			styles: {
				color: '#000000',
				fontFamily: 'UPCDigital-Bold',
				fontSize: 40,
				vOffset: 390,
				hOffset: 20,
				width: 803,
				truncation: 'end'
			}
		}).appendTo(view.elements.currentContainer);
		view.elements.currentInfoImage = new MAF.element.Image({
			source: 'Images/info.png',
			styles: {
				vOffset: 446,
				hOffset: 240,
				height: 42,
				width: 40
			}
		}).appendTo(view.elements.currentContainer);
		view.elements.currentStartEnd = new MAF.element.Text({
			styles: {
				color: '#000000',
				fontFamily: 'UPCDigital-Regular',
				fontSize: 30,
				vOffset: 446,
				hOffset: 20
			}
		}).appendTo(view.elements.currentContainer);
		view.elements.currentOkView = new MAF.element.Text({
			styles: {
				color: '#000000',
				fontFamily: 'UPCDigital-Regular',
				fontSize: 30,
				vOffset: 446,
				hOffset: 307
			}
		}).appendTo(view.elements.currentContainer);
		view.elements.currentChannel = new MAF.element.Image({
			aspect: 'auto',
			styles: {
				vOffset: 446,
				hOffset: 620,
				height: 40,
				width: 180,
				hAlign: 'right',
				right: 30
			}
		}).appendTo(view.elements.currentContainer);
		view.elements.currentProgressContainer = new MAF.element.Container({
			styles: {
				backgroundColor: '#898989',
				vOffset: 377,
				height: 10,
				hOffset: 11,
				width: 811
			}
		}).appendTo(view.elements.currentContainer);
		view.elements.currentProgressIndicator = new MAF.element.Container({
			styles: {
				backgroundColor: '#FFFFFF',
				vOffset: 377,
				height: 10,
				hOffset: 11,
				borderStyle: 'solid',
				borderWidth: 1,
				borderColor: '#898989'
			}
		}).appendTo(view.elements.currentContainer);

		view.elements.currentExpiredImage = new MAF.element.Image({
			source: 'Images/asset_background_current_focus_expired.png',
			styles: {
				vOffset: 0,
				hOffset: 0,
				width: 836,
				height: 374
			}
		}).appendTo(view.elements.currentContainer);
		view.elements.currentExpiredImage.hide();

		view.elements.currentExpiredText = new MAF.element.Text({
			text: $_('MainScreen_Asset_Focus_Asset_Ended_Text'),
			anchorStyle: 'center',
			styles: {
				color: '#FFFFFF',
				fontFamily: 'InterstatePro-Light, sans-serif',
				fontSize: 38,
				vOffset: 160,
				hOffset: 0,
				width: 836,
				heigh: 374
			}
		}).appendTo(view.elements.currentContainer);
		view.elements.currentExpiredText.hide();

		// no items
		view.elements.noItemsContainer = new MAF.element.Container({
			focus: true,
			styles: {
				backgroundImage: 'Images/asset_background_future_focus.png',
				backgroundColor: '#FFFFFF',
				height: 474,
				width: 843,
				hOffset: 75,
				vOffset: 296,
				padding: 5
			},
			events: {
				onNavigate: function(event) {
					view.navigate(event, view);
				}
			}
		}).appendTo(this.elements.rightContainer);
		view.elements.noItemsContainer.hide();

		view.elements.noItemsTitle = new MAF.element.TextField({
			totalLines: 3,
			visibleLines: 3,
			styles: {
				color: '#000000',
				fontFamily: 'InterstatePro-ExtraLight',
				fontSize: 40,
				vOffset: 40,
				hOffset: 35,
				width: 770,
				wrap: true,
				truncation: 'end'
			}
		}).appendTo(view.elements.noItemsContainer);

		view.elements.noItemsSubTitle = new MAF.element.TextField({
			totalLines: 3,
			visibleLines: 3,
			styles: {
				color: '#000000',
				fontFamily: 'InterstatePro-ExtraLight',
				fontSize: 30,
				vOffset: 240,
				hOffset: 35,
				width: 770,
				wrap: true,
				truncation: 'end'
			}
		}).appendTo(view.elements.noItemsContainer);

		view.elements.noItemsReloadButton = new MAF.element.Button({
			focus: true,
			content: [
				new MAF.element.Text({
					text: $_('MainScreen_Asset_Focus_ShowLaterContent_Button'),
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
				vOffset: 360,
				hOffset: 35,
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
				onNavigate: function(event) {
					view.navigate(event, view);
				},
				onSelect: function() {
					view.setLoading(view);
					ContentDataRetriever.loadMenuData(view.currentMenu[2], true, view.onMenuItemDataLoaded, view);
				}
			}
		}).appendTo(view.elements.noItemsContainer);
		view.elements.noItemsReloadButton.hide();
	},

	updateView: function() {
		MAF.mediaplayer.init();
		this.loading = false;
		if (this.initializing !== true) {
			if (ConfigurationStorageHandler.checkAppFirstLoad() === true) {
				MAF.application.loadView('view-PopupScreen', {
					"popupName": "welcome",
					"redirectPage": "view-MainScreen",
					"redirectParams": {
						"returnFromPopup": "welcome"
					}
				});
			}
			if (this.persist.returnFromPopup !== undefined && this.persist.returnFromPopup === "preferences") {
				sideBarContainer.moveTo(this);
				this.persist.returnFromPopup = null;
				this.updateProfileSettings(this, profile.name);
				this.hideSidebar();
				this.reloadMenu(this, true);
			} else if (this.persist.returnFromPopup !== undefined && this.persist.returnFromPopup === "appInfo") {
				sideBarContainer.moveTo(this);
				this.persist.returnFromPopup = null;
				this.hideSidebar();
			} else {
				sideBarContainer.moveTo(this);
				this.hideSidebar();
				this.reloadMenu(this, false);
			}
		}
	},

	navigate: function(event, view) {
		switch (event.payload.direction) {
			case 'left':
				view.navigateLeft(view);
				break;
			case 'up':
				view.navigateUp(view);
				break;
			case 'down':
				view.navigateDown(view);
				break;
			case 'right':
				view.navigateRight(view);
				break;
		}
		event.preventDefault();
		event.stopPropagation();
	},

	navigateDown: function(view) {
		view.setLoading(view);
		view.currentMenu.push(view.currentMenu.shift());
		view.elements.verticalMenu.changeDataset(view.currentMenu, true);
		ContentDataRetriever.loadMenuData(view.currentMenu[2], false, view.onMenuItemDataLoaded, view);
	},

	navigateUp: function(view) {
		view.setLoading(view);
		view.currentMenu.unshift(view.currentMenu.pop());
		view.elements.verticalMenu.changeDataset(view.currentMenu, true);
		ContentDataRetriever.loadMenuData(view.currentMenu[2], false, view.onMenuItemDataLoaded, view);
	},

	navigateRight: function(view) {
		(view.currentAssetIndex < (view.currentAssets.length - 1)) ? view.currentAssetIndex++: view.currentAssetIndex = 0;
		(view.currentAssetIndex === 0) ? view.elements.leftArrow.show(): view.elements.leftArrow.hide();
		view.currentAssets.push(view.currentAssets.shift());
		view.setFocus(view, view.currentAssets[0]);
		view.elements.assetCarousel.changeDataset(view.currentAssets.slice(1), true);
	},

	navigateLeft: function(view) {
		if (view.currentAssetIndex > 0) {
			view.currentAssets.unshift(view.currentAssets.pop());
			view.currentAssetIndex--;
			(view.currentAssetIndex === 0) ? view.elements.leftArrow.show(): view.elements.leftArrow.hide();
			view.setFocus(view, view.currentAssets[0]);
			view.elements.assetCarousel.changeDataset(view.currentAssets.slice(1), true);
		} else {
			view.showSidebar();
		}
	},

	setLoading: function(view) {
		view.elements.currentContainer.hide();
		view.elements.futureContainer.hide();
		view.elements.noItemsContainer.hide();
		view.elements.assetCarousel.hide();
		view.stopCurrentProgressInterval(view);
		view.isLive = false;
		view.setFocusEmptyLoading(view, "loading");
	},

	setFocus: function(view, data) {
		view.elements.currentContainer.hide();
		view.elements.futureContainer.hide();
		view.elements.noItemsContainer.hide();
		view.stopCurrentProgressInterval(view);
		view.isLive = false;

		if (data !== null && data !== undefined) {
			if (moment() > moment(data.start)) {
				view.setFocusCurrent(view, data);
				view.isLive = true;
			} else {
				view.setFocusFuture(view, data);
			}
		} else {
			view.setFocusEmptyLoading(view, "empty");
		}
		view.showBackground(view, view.isLive);
	},

	setFocusEmptyLoading: function(view, emptyType) {
		view.elements.noItemsTitle.setText("");
		view.elements.noItemsSubTitle.setText("");
		view.elements.noItemsReloadButton.hide();
		switch (emptyType) {
			case "empty":
				var emptyText = "";
				if (view.currentMenu[2].dataTimeframe < 60) {
					emptyText = $_('MainScreen_Asset_Focus_NoDataTitle', [view.currentMenu[2].mainMenuLabel, view.currentMenu[2].dataTimeframe]);
					emptyText = emptyText + $_('MainScreen_Asset_Focus_Minutes');
				} else {
					var period = view.currentMenu[2].dataTimeframe / 60;
					emptyText = $_('MainScreen_Asset_Focus_NoDataTitle', [view.currentMenu[2].mainMenuLabel, period]);
					emptyText = emptyText + $_('MainScreen_Asset_Focus_Hours');
				}

				view.elements.noItemsTitle.setText(emptyText);
				view.elements.noItemsSubTitle.setText($_('MainScreen_Asset_Focus_NoDataSubTitle'));
				view.elements.noItemsReloadButton.show();
				view.elements.noItemsContainer.show();
				view.elements.noItemsReloadButton.focus();

				break;
			case "loading":
				view.elements.noItemsTitle.setText($_('MainScreen_Asset_Focus_LoadingTitle'));
				view.elements.noItemsSubTitle.setText($_('MainScreen_Asset_Focus_LoadingSubTitle'));
				view.elements.noItemsContainer.show();
				view.elements.noItemsContainer.focus();
				break;
		}

	},

	setFocusFuture: function(view, data) {
		if (data !== null) {
			if (data.video !== null) {
				view.elements.futurePoster.setSource(data.video.imageLink.href.replace("https", "http"));
				view.elements.futureTitle.setText(data.video.title);
				view.elements.futureGenre.setText($_('MainScreen_Asset_Focus_Genre'));
				view.elements.futureGenreValue.setText(data.video.subcategory);
				view.elements.futureStartEnd.setText(moment(data.start).format("HH:mm") + " - " + moment(data.end).format("HH:mm"));
				view.elements.futureSynopsis.setText(data.video.shortSynopsis);
				view.updateReminder(view);

				var logoUrl = InitializationHandler.getChannelLogoMedium(data.channel.logicalPosition);
				if (logoUrl !== "") {
					view.elements.futureChannel.setSource(logoUrl);
					view.elements.futureChannel.show();
				}
				view.elements.futureContainer.show();
			}
		} else {
			view.elements.futurePoster.setSource('');
			view.elements.futureTitle.setText('');
			view.elements.futureGenre.setText('');
			view.elements.futureGenreValue.setText('');
			view.elements.futureStartEnd.setText('');
			view.elements.futureSynopsis.setText('');
			view.elements.futureReminder.setText('');
			view.elements.futureReminderImage.hide();
		}
		view.elements.futureContainer.focus();
	},

	setFocusCurrent: function(view, data) {
		if (data !== null) {
			if (data.video !== null) {
				MAF.mediaplayer.setViewportBounds(319, 301, 836, 374);
				MAF.mediaplayer.setChannelByNumber(data.channel.logicalPosition);

				view.elements.currentTitle.setText(data.video.title);
				view.elements.currentStartEnd.setText(moment(data.start).format("HH:mm") + " - " + moment(data.end).format("HH:mm"));
				view.elements.currentOkView.setText($_('MainScreen_Asset_Focus_OkView'));

				view.elements.currentChannel.hide();
				var logoUrl = InitializationHandler.getChannelLogoMedium(data.channel.logicalPosition);
				if (logoUrl !== "") {
					view.elements.currentChannel.setSource(logoUrl);
					view.elements.currentChannel.show();
				}

				view.updateCurrentProgress(view);
				view.stopCurrentProgressInterval(view);
				view.currentProgressTimer = setInterval(function() {
					view.updateCurrentProgress(view);
				}, Config.get('progressBarUpdateFreq'));

				view.elements.currentContainer.show();
			}
		} else {
			view.elements.currentTitle.setText('');
			view.elements.currentStartEnd.setText('');
			view.elements.currentOkView.setText('');
			view.elements.currentProgressIndicator.setStyle("width", 0);
			view.stopCurrentProgressInterval();
		}
		view.elements.currentContainer.focus();
	},

	updateCurrentProgress: function(view) {
		if (view.currentAssets[0] !== null) {
			var currentPercentage = ((moment() - moment(view.currentAssets[0].start)) / (moment(view.currentAssets[0].end) - moment(view.currentAssets[0].start)));
			if (currentPercentage <= 1) {
				view.elements.currentProgressIndicator.setStyle("width", (811 * currentPercentage));
				view.elements.currentExpiredImage.hide();
				view.elements.currentExpiredText.hide();
			} else {
				view.elements.currentProgressIndicator.setStyle("width", 811);
				view.elements.currentExpiredImage.show();
				view.elements.currentExpiredText.show();
			}
		}
	},

	stopCurrentProgressInterval: function(view) {
		if (view.currentProgressTimer) {
			clearInterval(view.currentProgressTimer);
			view.currentProgressTimer = null;
		}
	},

	updateReminder: function(view) {
		if (view.currentAssets.length > 0) {
			if (ReminderHandler.isReminderSet(view.currentAssets[0].id) === true) {
				view.elements.futureReminder.setText($_('MainScreen_Asset_Focus_Remove_Reminder'));
				view.elements.futureReminderImage.show();
			} else {
				view.elements.futureReminder.setText($_('MainScreen_Asset_Focus_Reminder'));
				view.elements.futureReminderImage.hide();
			}
		}
	},

	startAutoNavigate: function(view) {
		view.stopAutoNavigate(view);
		if (view.autoNavigateTimer === null) {
			view.autoNavigateTimer = new Timer(Config.get('carouselAutoNavigateToggleTimeout'), function() {
				if (view.visible === true) {
					view.navigateRight(view);
				}
			});
			view.autoNavigateTimer.start();
		}
	},

	stopAutoNavigate: function(view) {
		if (view.autoNavigateTimer !== null) {
			view.autoNavigateTimer.stop();
			view.autoNavigateTimer = null;
		}
	},

	unselectView: function() {
		this.stopAutoNavigate(this);
	},

	reloadMenu: function(view, clearMenuItems) {
		if (view.elements.verticalMenu.cells.length <= 0 || clearMenuItems === true) {
			view.currentMenu = MenuHandler.getVisualMenuItems();
			view.elements.verticalMenu.changeDataset(view.currentMenu);
			ContentDataRetriever.loadMenuData(view.currentMenu[2], false, view.onMenuItemDataLoaded, view);
		} else {
			(view.currentMenu[2].autoNavigate === true) ?
			view.startAutoNavigate(view): view.stopAutoNavigate(view);
		}
		MAF.mediaplayer.setViewportBounds(319, 301, 836, 374);
		view.updateReminder(view);
		view.showBackground(view, view.isLive);
	},

	updateProfileSettings: function(view, profileName) {
		sideBarContainer.setProfileName(profileName);
		if (profileName !== "" && profileName !== undefined) {
			MenuHandler.updateTextForItem("recommendations", $_("MenuItem_Recommendations_Preference_Text"), $_("MenuItem_Recommendations_MainMenu_Profile_Text", [profileName]));
		} else {
			MenuHandler.updateTextForItem("recommendations", $_("MenuItem_Recommendations_Preference_Text"), $_("MenuItem_Recommendations_MainMenu_Text"));
		}
		sideBarContainer.updateProfilePicture();
	},

	showBackground: function(view, isLive) {
		if (isLive === true && sideBarContainer.isCollapsed === true) {
			view.elements.backgroundImageLive.show();
			view.elements.backgroundImageNormal.hide();
		} else {
			view.elements.backgroundImageLive.hide();
			view.elements.backgroundImageNormal.show();
		}
	},

	showSidebar: function() {
		var view = this;
		view.stopAutoNavigate(view);
		sideBarContainer.expand();
		sideBarContainer.setFocus();
		view.elements.rightContainer.setStyles({
			width: 1340,
			hOffset: sideBarContainer.width,
			opacity: 0.3
		});
		view.elements.backgroundImageLive.hide();
		view.elements.backgroundImageNormal.show();

	},

	hideSidebar: function() {
		var view = this;
		sideBarContainer.collapse();
		if (view.isLive === true) {
			view.elements.backgroundImageLive.show();
			view.elements.backgroundImageNormal.hide();
		}
		view.elements.rightContainer.setStyles({
			width: 1680,
			hOffset: sideBarContainer.width,
			opacity: 1.0
		});
		if (view.currentAssets.length > 0) {
			view.setFocus(view, view.currentAssets[0]);
		} else {
			view.elements.noItemsReloadButton.focus();
		}
	},

	destroyView: function() {
		var view = this;
		view.stopAutoNavigate(view);
		view.stopCurrentProgressInterval(view);
		view.menuOpacityIndex = null;
		view.currentMenu = null;
		view.currentAssets = null;
		view.fnOnInfoButtonPress.unsubscribeFrom(MAF.application, 'onWidgetKeyPress');
		view.fnOnInfoButtonPress = null;
		view.fnOnProfileLoaded.unsubscribeFrom(MAF.application, 'onLoadProfile');
		view.fnOnProfileLoaded = null;
		view.fnOnProfileUnloaded.unsubscribeFrom(MAF.application, 'onUnloadProfile');
		view.fnOnProfileUnloaded = null;
		view.fnOnDialogCancelled.unsubscribeFrom(MAF.application, 'onDialogCancelled');
		view.fnOnDialogCancelled = null;
		InitializationHandler.cleanUp();
		MenuHandler.cleanUp();
		sideBarContainer = null;
	}
});