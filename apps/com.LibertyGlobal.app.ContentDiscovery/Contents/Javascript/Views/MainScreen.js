var MainScreen = new MAF.Class({
	ClassName: 'MainScreen',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initialize: function() {
		var view = this;
		view.parent();
		view.onInfoButtonPress.subscribeTo(MAF.application, 'onWidgetKeyPress', this);
		view.onProfileLoaded.subscribeTo(MAF.application, 'onLoadProfile', this);
		view.onProfileUnloaded.subscribeTo(MAF.application, 'onUnloadProfile', this);
		ChannelHandler.initialize();
		MenuHandler.initialize();
	},

	onInfoButtonPress: function(event) {
		switch (event.type) {
			case "onWidgetKeyPress":
				if (event.payload !== undefined) {
					if (event.payload.keyCode === 457 || event.payload.keyCode === 36) // info button or home button on keyboard
					{
						if (this.controls.sideBarContainer.isCollapsed === true) {
							var selectedAsset = this.controls.assetCarousel.mainCollection[this.controls.assetCarousel.focusIndex];
							MAF.application.loadView('view-InfoScreen', {
								"assetId": selectedAsset.id
							});
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
				break;
		}
	},

	onProfileLoaded: function(event) {
		console.log("Load profile: " + ProfileHandler.getVisibleMenuItems() + ", " + ProfileHandler.getContentTimeWindow());
		this.controls.sideBarContainer.setProfileName(profile.name);
		this.reloadMenu(this, true);
	},

	onProfileUnloaded: function(event) {
		console.log("Unload profile: " + ProfileHandler.getVisibleMenuItems() + ", " + ProfileHandler.getContentTimeWindow());
		Twitter.reset();
		Facebook.reset();
		this.controls.sideBarContainer.setProfileName("");
		this.reloadMenu(this, true);
	},

	onMenuItemDataLoaded: function(menuItem, view) {
		if (menuItem.mainMenuLabel === view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex].mainMenuLabel) {
			view.controls.assetCarousel.changeDataset(menuItem);
			view.showBackground(view, view.controls.assetCarousel.isLive);
		} else {
			view.controls.assetCarousel.setLoading();
			var retriever = new ContentDataRetriever();
			retriever.loadMenuData(view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex], view.onMenuItemDataLoaded, view);
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
								MAF.HostEventManager.send("changeProfile");
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
					view.controls.assetCarousel.setLoading();
					var retriever = new ContentDataRetriever();
					retriever.loadMenuData(eventData.payload.selectedMenuItem, view.onMenuItemDataLoaded, view);
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
								// MAF.application.loadView('view-EmptyScreen', {
								// "channelNr": eventData.payload.asset.channel.logicalPosition
								// });
							} else {
								setNotification(eventData.payload.asset.video.title,
									eventData.payload.asset.channel.name,
									eventData.payload.asset.channel.logicalPosition,
									eventData.payload.asset.start);
							}
						}
					}
				}
			}
		}).appendTo(this.elements.rightContainer);
	},

	updateView: function() {
		if (this.persist.returnFromPopup !== undefined && this.persist.returnFromPopup === "preferences") {
			this.hideSidebar();
			this.reloadMenu(this, true);
		} else if (this.persist.returnFromPopup !== undefined && this.persist.returnFromPopup === "appInfo") {
			this.hideSidebar();
		} else {
			this.reloadMenu(this);
		}
	},

	reloadMenu: function(view, clearMenuItems) {
		if (view.controls.verticalMenu.mainCollection.length <= 0 || clearMenuItems === true) {
			view.controls.verticalMenu.changeDataset(MenuHandler.getVisualMenuItems());
		}
		view.controls.assetCarousel.updateVideo();
	},

	showBackground: function(view, isLive) {
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