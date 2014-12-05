var MainScreen = new MAF.Class({
	ClassName: 'MainScreen',
	Extends: MAF.system.FullscreenView,

	initialize: function() {
		var view = this;
		view.loading = false;
		view.parent();
		view.initializing = true;
		view.onInfoButtonPress.subscribeTo(MAF.application, 'onWidgetKeyPress', this);
		view.onProfileLoaded.subscribeTo(MAF.application, 'onLoadProfile', this);
		view.onProfileUnloaded.subscribeTo(MAF.application, 'onUnloadProfile', this);
		ChannelHandler.initialize(view.onChannelInitializeComplete, view);

	},

	onChannelInitializeComplete: function(view) {
		MenuHandler.initialize();
		view.initializing = false;
		view.updateView();
	},

	onInfoButtonPress: function(event) {
		switch (event.type) {
			case "onWidgetKeyPress":
				if (event.payload !== undefined) {
					if (event.payload.keyCode === 457 || event.payload.keyCode === 36) // info button or home button on keyboard
					{
						if (this.controls.sideBarContainer.isCollapsed === true) {
							if (this.loading === false) {
								this.loading = true; // avoid multiple clicks
								var selectedAsset = this.controls.assetCarousel.mainCollection[this.controls.assetCarousel.focusIndex];
								MAF.application.loadView('view-InfoScreen', {
									"assetId": selectedAsset.id
								});
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
				break;
		}
	},

	onProfileLoaded: function(event) {
		if (ProfileHandler.isProfileSet()) {
			console.log("Load profile: " + ProfileHandler.getVisibleMenuItems() + ", " + ProfileHandler.getContentTimeWindow());
			this.controls.sideBarContainer.setProfileName(profile.name);
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
		console.log("Unload profile: " + ProfileHandler.getVisibleMenuItems() + ", " + ProfileHandler.getContentTimeWindow());
		Twitter.reset();
		Facebook.reset();
		this.controls.sideBarContainer.setProfileName("");
		this.reloadMenu(this, true);
	},

	onMenuItemDataLoaded: function(menuItem, view) {
		console.log("onMenuItemDataLoaded" + menuItem.mainMenuLabel + ", " + view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex].mainMenuLabel);
		if (menuItem.mainMenuLabel === view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex].mainMenuLabel) {
			view.controls.assetCarousel.changeDataset(menuItem);
			view.showBackground(view, view.controls.assetCarousel.isLive);
		} else {
			console.log("reload again");
			view.controls.assetCarousel.setLoading();
			ContentDataRetriever.loadMenuData(view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex], false, view.onMenuItemDataLoaded, view);
		}
	},

	createView: function() {
		var view = this;
		view.elements.backgroundImageNormal = new MAF.element.Image({
			source: 'Images/background_main.jpg'
		}).appendTo(view);

		view.elements.backgroundImageLive = new MAF.element.Image({
			source: 'Images/background_main_live.png'
		}).appendTo(view);
		view.elements.backgroundImageLive.hide();

		view.controls.sideBarContainer = new SidebarControl({
			events: {
				onNavigateRight: function() {
					view.hideSidebar();
				},
				onSelect: function(eventData) {
					if (view.controls.sideBarContainer.isCollapsed === false) {
						switch (eventData.payload.action) {
							case "switch":
								if (ProfileHandler.isAppProfileSet()) {
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
				position: 'relative',
				display: 'inline-block'
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
					console.log("menu item changed");
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
				hOffset: 10
			},
			events: {
				onAssetChanged: function(eventData) {
					view.showBackground(view, eventData.payload.isLiveAsset);
				},
				onNavigateLeft: function() {
					view.showSidebar();
				},
				onNavigateUp: function() {
					view.controls.verticalMenu.doNavigate('up');
				},
				onNavigateDown: function() {
					view.controls.verticalMenu.doNavigate('down');
				},
				onAssetSelect: function(eventData) {
					if (view.controls.sideBarContainer.isCollapsed === true) {
						if (eventData.payload.asset !== null) {
							if (view.controls.assetCarousel.isLive === true) {
								MAF.HostEventManager.send("exitToDock");
								// TODO remove including empty screen MAF.application.loadView('view-EmptyScreen', {
								// "channelNr": eventData.payload.asset.channel.logicalPosition
								// });
							} else {
								setNotification(
									eventData.payload.asset.video.title,
									eventData.payload.asset.channel.name,
									eventData.payload.asset.channel.logicalPosition,
									eventData.payload.asset.start);
							}
						}
					}
				},
				onReloadItemsPressed: function(event) {
					console.log("reload items pressed");
					view.controls.assetCarousel.setLoading();
					ContentDataRetriever.loadMenuData(view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex],
						true, view.onMenuItemDataLoaded, view);
				}
			}
		}).appendTo(this.elements.rightContainer);
	},

	updateView: function() {
		console.log("update view: " + this.persist.returnFromPopup);
		this.loading = false;
		if (this.initializing !== true) {
			if (ProfileHandler.isAppFirstLoad()) {
				MAF.application.loadView('view-PopupScreen', {
					"popupName": "welcome",
					"redirectPage": "view-MainScreen",
					"redirectParams": {
						"returnFromPopup": "welcome"
					}
				});
			}
			if (this.persist.returnFromPopup !== undefined && this.persist.returnFromPopup === "preferences") {
				this.hideSidebar();
				this.reloadMenu(this, true);
			} else if (this.persist.returnFromPopup !== undefined && this.persist.returnFromPopup === "appInfo") {
				this.hideSidebar();
			} else {
				this.reloadMenu(this);
			}
		}
	},

	reloadMenu: function(view, clearMenuItems) {
		console.log("reload menu: " + clearMenuItems);
		if (view.controls.verticalMenu.mainCollection.length <= 0 || clearMenuItems === true) {
			view.controls.verticalMenu.changeDataset(MenuHandler.getVisualMenuItems());
		}
		view.controls.assetCarousel.updateVideo();
		view.showBackground(view, view.controls.assetCarousel.isLive);
	},

	showBackground: function(view, isLive) {
		console.log("showBackground: " + isLive);
		if (isLive === true) {
			view.elements.backgroundImageLive.show();
			view.elements.backgroundImageNormal.hide();
		} else {
			view.elements.backgroundImageLive.hide();
			view.elements.backgroundImageNormal.show();
		}
	},

	showSidebar: function() {
		var view = this;
		view.elements.rightContainer.freeze();
		view.controls.verticalMenu.disable();
		view.controls.assetCarousel.disable();
		view.elements.rightContainer.width = 1340;
		view.elements.backgroundImageLive.hide();
		view.elements.backgroundImageNormal.show();
		view.controls.sideBarContainer.expand();
		view.controls.sideBarContainer.setFocus();
	},

	hideSidebar: function() {
		var view = this;
		view.elements.rightContainer.thaw();
		view.controls.verticalMenu.enable();
		view.controls.assetCarousel.enable();
		view.controls.sideBarContainer.collapse();
		if (view.controls.assetCarousel.isLive === true) {
			view.elements.backgroundImageLive.show();
			view.elements.backgroundImageNormal.hide();
		}
		view.elements.rightContainer.width = 1680;
		view.controls.assetCarousel.setFocus();
	},

	destroyView: function() {
		var view = this;
		view.onInfoButtonPress.unsubscribeFrom(MAF.application, 'onWidgetKeyPress');
		view.onProfileLoaded.unsubscribeFrom(MAF.application, 'onLoadProfile');
		view.onProfileUnloaded.unsubscribeFrom(MAF.application, 'onUnloadProfile');
		ChannelHandler.cleanUp();
		MenuHandler.cleanUp();
		delete view.controls.sideBarContainer;
		delete view.elements.rightContainer;
		delete view.controls.verticalMenu;
		delete view.controls.assetCarousel;
		delete view.assets;
	}
});