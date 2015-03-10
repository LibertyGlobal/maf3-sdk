var MainScreen = new MAF.Class({
	ClassName: 'MainScreen',
	Extends: MAF.system.FullscreenView,

	initView: function() {
		//screen.log("reminderhandler: " + ReminderHandler.handleCall2Action + ", " + ReminderHandler.handleCall2ActionChannelNr);
		// if (ReminderHandler.handleCall2Action !== null && ReminderHandler.handleCall2Action !== undefined) {
		// if (ReminderHandler.handleCall2Action === true) {
		// MAF.mediaplayer.setChannelByNumber(ReminderHandler.handleCall2ActionChannelNr);
		// MAF.application.exitToLive();
		// }
		// }
		var view = this;
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
								var selectedAsset = this.controls.assetCarousel.mainCollection[this.controls.assetCarousel.focusIndex];
								if (selectedAsset !== undefined) {
									ReportingHandler.increaseCounterDetails();
									MAF.application.loadView('view-InfoScreen', {
										"assetId": selectedAsset.id,
										"menuLabel": this.controls.verticalMenu.mainCollection[this.controls.verticalMenu.focusIndex].mainMenuLabel
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

	onMenuItemDataLoaded: function(menuItem, view) {
		if (menuItem.mainMenuLabel === view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex].mainMenuLabel) {
			view.controls.assetCarousel.changeDataset(menuItem);
			(menuItem.autoNavigate === true) ? view.controls.assetCarousel.startAutoNavigate(): view.controls.assetCarousel.stopAutoNavigate();
			view.showBackground(view, view.controls.assetCarousel.isLive);
		} else {
			view.controls.assetCarousel.setLoading();
			ContentDataRetriever.loadMenuData(view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex], false, view.onMenuItemDataLoaded, view);
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

		view.controls.verticalMenu = new MenuCarouselControl({
			styles: {
				height: view.height,
				width: 'inherit',
				hOffset: 5
			},
			events: {
				onMenuChanged: function(eventData) {
					MenuHandler.cleanData();
					view.controls.assetCarousel.setLoading();
					ContentDataRetriever.loadMenuData(eventData.payload.selectedMenuItem, false, view.onMenuItemDataLoaded, view);
				}
			}
		}).appendTo(this.elements.rightContainer);

		view.controls.assetCarousel = new AssetCarouselControl({
			styles: {
				height: 498,
				width: 'inherit',
				vOffset: 296,
				hOffset: 0
			},
			events: {
				onAssetChanged: function(eventData) {
					view.showBackground(view, eventData.payload.isLiveAsset);
				},
				onNavigateLeft: function() {
					view.controls.assetCarousel.stopAutoNavigate();
					view.showSidebar();
				},
				onNavigateUp: function() {
					view.controls.verticalMenu.doNavigate('up');
				},
				onNavigateDown: function() {
					view.controls.verticalMenu.doNavigate('down');
				},
				onAssetSelect: function(eventData) {
					if (sideBarContainer.isCollapsed === true) {
						if (eventData.payload.asset !== undefined && eventData.payload.asset !== null) {
							if (view.controls.assetCarousel.isLive === true) {
								ReportingHandler.sendUsageReport(view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex].mainMenuLabel, "tuneFromMain");
								MAF.application.exitToLive();
							} else {
								if (ReminderHandler.isReminderSet(eventData.payload.asset.id) === true) {
									ReportingHandler.decreaseCounterReminders();
									ReminderHandler.removeReminder(eventData.payload.asset.id);
								} else {
									ReportingHandler.increaseCounterReminders();
									ReminderHandler.setReminder(
										eventData.payload.asset.id,
										eventData.payload.asset.start,
										eventData.payload.asset.video.title,
										eventData.payload.asset.channel.name,
										eventData.payload.asset.channel.logicalPosition);
								}
								view.controls.assetCarousel.updateReminder();
							}
						}
					}
				},
				onReloadItemsPressed: function(event) {
					view.controls.assetCarousel.setLoading();
					ContentDataRetriever.loadMenuData(view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex],
						true, view.onMenuItemDataLoaded, view);
				}
			}
		}).appendTo(this.elements.rightContainer);
	},

	updateView: function() {
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
				this.reloadMenu(this, false);				
			}
		}
	},

	unselectView: function() {
		this.controls.assetCarousel.stopAutoNavigate();
	},

	reloadMenu: function(view, clearMenuItems) {
		if (view.controls.verticalMenu.mainCollection.length <= 0 || clearMenuItems === true) {
			view.controls.verticalMenu.changeDataset(MenuHandler.getVisualMenuItems());
		} else {
			(view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex].autoNavigate === true) ?
			view.controls.assetCarousel.startAutoNavigate(): view.controls.assetCarousel.stopAutoNavigate();
		}
		view.controls.assetCarousel.updateVideo();
		view.controls.assetCarousel.updateReminder();
		view.showBackground(view, view.controls.assetCarousel.isLive);
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
		sideBarContainer.expand();
		sideBarContainer.setFocus();
		view.controls.verticalMenu.disable();
		view.controls.assetCarousel.disable();
		view.elements.rightContainer.setStyles({
			width: 1340,
			hOffset: sideBarContainer.width
		});
		view.elements.backgroundImageLive.hide();
		view.elements.backgroundImageNormal.show();
		
	},

	hideSidebar: function() {
		var view = this;
		view.controls.verticalMenu.enable();
		view.controls.assetCarousel.enable();
		sideBarContainer.collapse();
		if (view.controls.assetCarousel.isLive === true) {
			view.elements.backgroundImageLive.show();
			view.elements.backgroundImageNormal.hide();
		}
		view.elements.rightContainer.setStyles({
			width: 1680,
			hOffset: sideBarContainer.width
		});
		view.controls.assetCarousel.setFocus();
	},

	destroyView: function() {
		var view = this;
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
		delete view.elements.rightContainer;
		delete view.controls.verticalMenu;
		delete view.controls.assetCarousel;
		delete view.assets;
	}
});