var MainScreen = new MAF.Class({
	ClassName: 'MainScreen',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initialize: function () {	 
		var view = this;
		view.parent();
		view.onInfoButtonPress.subscribeTo(MAF.application, 'onWidgetKeyPress', this);	

		// retrieve channels for icons
		new Request({
			url: Config.common.channelApiUrl,
			onComplete: function (request) {
			if (request.status === 200)
				channelList = JSON.parse(request.response);
				if(channelList.channels !== null)
				{
					Config.common.channelList = channelList.channels;
				}
			}
		}).send();

		view.items = Config.common.menuItems;		
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

	menuItemDataLoaded: function(menuItem, view) {
		if(menuItem.mainMenuLabel === view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex].mainMenuLabel)
		{
			//console.log("displaying data for: " + menuItem.mainMenuLabel);
			view.controls.assetCarousel.changeDataset(menuItem);
			view.controls.assetCarousel.setFocus();
			view.showBackground(view, view.controls.assetCarousel.isLive);
		}
		else
		{
			//console.log("menu changed, restart loading data: " + view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex].mainMenuLabel);
			view.controls.assetCarousel.setLoading();
			var retriever = new ContentDataRetriever();
			retriever.loadMenuData(view.controls.verticalMenu.mainCollection[view.controls.verticalMenu.focusIndex], view.menuItemDataLoaded, view);
		}
	},

    // Create your view template
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
								// TODO
							break;
							case "edit":
								// TODO
							break;
							case "about":
								//MAF.application.loadView('view-AppInfoScreen');
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
					retriever.loadMenuData(eventData.payload.selectedMenuItem, view.menuItemDataLoaded, view);
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
								setNotification($_('Notification_Text', [eventData.payload.asset.video.title, eventData.payload.asset.channel.name, eventData.payload.asset.channel.logicalPosition]), eventData.payload.asset.start);
							}
						}
					}
				}
			}			
		}).appendTo(this.elements.rightContainer);
	},

	updateView: function () {
		if(this.controls.verticalMenu.mainCollection.length<=0)
		{
			this.controls.verticalMenu.changeDataset(Config.common.menuItems);			
		}
		this.controls.assetCarousel.updateVideo();
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
		view.onInfoButtonPress.subscribeTo(MAF.application, 'onWidgetKeyPress', this);
		delete view.controls.sideBarContainer;
		delete view.elements.rightContainer;
		delete view.controls.verticalMenu;
		delete view.controls.assetCarousel;
		delete view.items;
		delete view.assets;
	}
});