var MainScreen = new MAF.Class({
	ClassName: 'MainScreen',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initialize: function () {	 
		var view = this;
		view.parent();
		view.onInfoButtonPress.subscribeTo(MAF.application, 'onWidgetKeyPress', this);	
		view.onProfileLoaded.subscribeTo(MAF.application, 'onLoadProfile', this);
		ChannelHandler.initialize();
		MenuHandler.initialize();
	},

	onInfoButtonPress: function(event) {	
		switch(event.type)
		{
			case "onWidgetKeyPress":
				if(event.payload !== undefined)	
				{
					if(event.payload.keyCode === 457 || event.payload.keyCode === 36) // info button or home button on keyboard
					{
						if(this.controls.sideBarContainer.isCollapsed === true)
						{						
							var selectedAsset = this.controls.assetCarousel.mainCollection[this.controls.assetCarousel.focusIndex];
							MAF.application.loadView('view-InfoScreen', { 
								"assetId": selectedAsset.id });
						}
					}
				}
			break;
		}
	},

	onProfileLoaded: function(event) {
		MenuHandler.reloadFromProfile();
		this.reloadMenu(this);
	},

	onMenuItemDataLoaded: function(menuItem, view) {
		if(menuItem.mainMenuLabel === view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex].mainMenuLabel)
		{
			view.controls.assetCarousel.changeDataset(menuItem);
			view.controls.assetCarousel.setFocus();
			view.showBackground(view, view.controls.assetCarousel.isLive);
		}
		else
		{
			view.controls.assetCarousel.setLoading();
			var retriever = new ContentDataRetriever();
			retriever.loadMenuData(view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex], view.onMenuItemDataLoaded, view);
		}
	},

	createView: function () {
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
				onNavigateRight: function(){
					view.hideSidebar();
				},
				onSelect: function(eventData){
					if(view.controls.sideBarContainer.isCollapsed === false)
					{
						switch(eventData.payload.action)
						{
							case "switch":
								MAF.HostEventManager.send("changeProfile"); 
							break;
							case "edit":
								view.showPopup(view, "preferences");
							break;
							case "about":
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
			styles:{
				height: view.height,
				width: 'inherit',
				hOffset: 5
			},
			events: {
				onMenuChanged: function(eventData){
					view.controls.assetCarousel.setLoading();
					var retriever = new ContentDataRetriever();
					retriever.loadMenuData(eventData.payload.selectedMenuItem, view.onMenuItemDataLoaded, view);
				}				
			}		
		}).appendTo(this.elements.rightContainer);

		view.controls.assetCarousel = new AssetCarouselControl({
			styles:{
				height: 498,
				width: 'inherit',
				vOffset: 296,
				hOffset: 10
			},
			events: {
				onAssetChanged: function(eventData) {
					view.showBackground(view, eventData.payload.isLiveAsset);
				},
				onNavigateLeft: function(){
					view.showSidebar();
				},
				onNavigateUp: function(){
					view.controls.verticalMenu.doNavigate('up');
				},
				onNavigateDown: function(){
					view.controls.verticalMenu.doNavigate('down');
				},
				onAssetSelect: function(eventData){
					if(view.controls.sideBarContainer.isCollapsed === true)
					{
						if(eventData.payload.asset!==null)
						{
							if(view.controls.assetCarousel.isLive===true)
							{
								MAF.application.loadView('view-EmptyScreen', { 
									"channelNr": eventData.payload.asset.channel.logicalPosition });
							}
							else
							{
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

		view.elements.popup = new MAF.element.Container({
			styles: {
				height: 'inherit',
				width: 'inherit'
			}
		}).appendTo(view);

		view.elements.fullscreenPopup = new MAF.element.Container({
			styles: {
				height: 'inherit',
				width: 'inherit',
				backgroundColor: "#000000",
				opacity: 0.5 
			}
		}).appendTo(view.elements.popup);		
		view.elements.fullscreenPopupBackground = new MAF.element.Container({
			styles: {
				hOffset: 122,
				vOffset: 108,
				width: 1676,
				height: 863,
				backgroundImage: 'Images/background_popup.jpg'
			}
		}).appendTo(view.elements.popup);
		view.elements.preferencesView = new PreferencesScreen({
			styles: {
				height: 'inherit',
				width: 'inherit'
			},
			events: {
				onPreferencesClosed: function(eventData) {
					view.closePopup(view);
					view.reloadMenu(view);
				}
			}
		}).appendTo(view.elements.fullscreenPopupBackground);
		view.elements.preferencesView.hide();
		view.elements.popup.hide();
	},

	updateView: function () {
		this.reloadMenu(this);
	},

	reloadMenu: function(view)
	{
		if(view.controls.verticalMenu.mainCollection.length<=0)
		{
			view.controls.verticalMenu.changeDataset(MenuHandler.getVisualMenuItems());			
		}
		view.controls.assetCarousel.updateVideo();
	},

	showPopup: function(view, popupName)
	{
		view.elements.popup.show();	
		switch(popupName)
		{
			case "welcome":
			break;
			case "preferences":
				view.elements.preferencesView.show();
				view.elements.preferencesView.setFocus();
			break;
			case "facebook":

			break;
			case "twitter": 

			break;
		}
	},

	closePopup: function(view)
	{
		view.elements.preferencesView.hide();
		view.elements.popup.hide();	
	},

	showBackground: function(view, isLive)
	{
		if(isLive===true)
		{
			view.elements.backgroundImageLive.show();
			view.elements.backgroundImageNormal.hide();
		}
		else
		{
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
		if(view.controls.assetCarousel.isLive===true)
		{
			view.elements.backgroundImageLive.show();
			view.elements.backgroundImageNormal.hide();
		}
		view.elements.rightContainer.width = 1680;
		view.controls.assetCarousel.setFocus();
	},

	destroyView: function () {
		var view = this;
		view.onInfoButtonPress.unsubscribeFrom(MAF.application, 'onWidgetKeyPress');
		view.onProfileLoaded.unsubscribeFrom(MAF.application, 'onLoadProfile');
		ChannelHandler.cleanUp();
		MenuHandler.cleanUp();
		delete view.controls.sideBarContainer;
		delete view.elements.rightContainer;
		delete view.controls.verticalMenu;
		delete view.controls.assetCarousel;
		delete view.assets;
	}
});