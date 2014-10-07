var MainScreen = new MAF.Class({
	ClassName: 'MainScreen',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initialize: function () {
		var view = this;
		view.parent();

		// retrieve channels for icons
		new Request({
			url: Config.common.channelApiUrl,
			onComplete: function (request) {
			if (request.status === 200)
				channelList = JSON.parse(request.response);
				if(channelList.channels != null)
				{
					Config.common.channelList = channelList.channels;
				}
			}
		}).send();

		var retriever = new ContentDataRetriever();
		retriever.collectData(this.dataLoaded, view);
		view.items = Config.common.menuItems;
		// view.items.forEach(function(menuItem, u){
		// 			menuItem.data = testdata;
		// 		}, this);
	},

	dataLoaded: function(view) {		
		view.controls.verticalMenu.changeDataset(Config.common.menuItems);
		view.controls.assetCarousel.changeDataset(Config.common.menuItems[0].data);
		view.controls.assetCarousel.setFocus();
	},

    // Create your view template
	createView: function () {
		var view = this;		
		view.elements.backgroundImageNormal = new MAF.element.Image({
			source: 'Images/background_main.jpg',
		}).appendTo(view);

		view.elements.backgroundImageLive = new MAF.element.Image({
			source: 'Images/background_main_live.png',
		}).appendTo(view);
		view.elements.backgroundImageLive.hide();

		// view.elements.console = new MAF.element.TextField({
		// 	totalLines: 7,
		// 	visibleLines: 7,
		// 	styles: {
		// 		color: '#000000',
		// 		fontFamily: 'UPCDigital-Regular',
		// 		fontSize: 26,
		// 		vOffset: 30,
		// 		hOffset: 1200,
		// 		height:240,
		// 		width: 464,
		// 		wrap: true,
		// 		truncation: 'end'
		// 	}
		// }).appendTo(view); 

		view.controls.sideBarContainer = new SidebarControl({
			events: {
				onNavigateRight: function(){
					view.hideSidebar();
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
					view.controls.assetCarousel.changeDataset(eventData.payload.selectedMenuItem.data);					
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
					if(eventData.payload.isLiveAsset===true)
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
				onNavigateLeft: function(){
					view.showSidebar();
				},
				onNavigateUp: function(){
					view.controls.verticalMenu.doNavigate('up');
				},
				onNavigateDown: function(){
					view.controls.verticalMenu.doNavigate('down');
				}
			}			
		}).appendTo(this.elements.rightContainer);
	},

	updateView: function () {
		// var view = this;
		// view.controls.verticalMenu.changeDataset(Config.common.menuItems);
		// view.controls.assetCarousel.changeDataset(Config.common.menuItems[0].data);
		// view.controls.assetCarousel.setFocus();
	},	

	showSidebar: function() { 
		console.log("HomeScreen: showSidebar");
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
		console.log("HomeScreen: hideSidebar");
		var view = this;
		view.elements.rightContainer.thaw();
		view.controls.verticalMenu.enable();
		view.controls.assetCarousel.enable();
		view.controls.sideBarContainer.collapse();
		if(view.controls.assetCarousel.isLive===true)
		{
			view.elements.backgroundImageLive.show();
			view.elements.backgroundImageNormal.hide();
			console.log("onAssetChanged: live asset");
		}
		view.elements.rightContainer.width = 1680;
		view.controls.assetCarousel.setFocus();
	},

	destroyView: function () {
		var view = this;
		delete view.controls.sideBarContainer;
		delete view.elements.rightContainer;
		delete view.controls.verticalMenu;
		delete view.controls.assetCarousel;
		delete view.items;
		delete view.assets;
	}
});