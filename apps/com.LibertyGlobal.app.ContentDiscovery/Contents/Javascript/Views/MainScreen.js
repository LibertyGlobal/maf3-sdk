var MainScreen = new MAF.Class({
	ClassName: 'MainScreen',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initialize: function () {
		var view = this;
		view.parent();

		ContentDataRetriever.collectData(this.dataLoaded, view);
		view.items = Config.common.menuItems;

		// LGI.Guide.config.APIURL = Config.common.apiUrl;
		// LGI.Guide.config.region = Config.common.apiRegion;
		// var startDateTime = moment().utc().format('YYYY-MM-DDTHH:mm') + "Z";
		// var endDateTime = moment().utc().add('hours', 2).format('YYYY-MM-DDTHH:mm') + "Z";
		// console.log('time frame1: ' + startDateTime + ', ' + endDateTime);
		// LGI.Guide.Broadcast.create()
		// 	.limit(256)
		// 	.fields(LGI.Guide.Broadcast.ID, LGI.Guide.Broadcast.IMI, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START, 
		// 			LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL, LGI.Guide.Broadcast.CHANNEL_NAME,
		// 			LGI.Guide.Broadcast.AGE_RATING, LGI.Guide.Broadcast.CAST, LGI.Guide.Broadcast.DIRECTORS,
		// 			LGI.Guide.Broadcast.WRITERS, LGI.Guide.Broadcast.BPM, LGI.Guide.Broadcast.POPULARITY,
		// 			LGI.Guide.Broadcast.SYNOPSIS, LGI.Guide.Broadcast.IMAGE_LINK, LGI.Guide.Broadcast.CATEGORY)
		// 	.filter(LGI.Guide.Broadcast.START.greaterThan(startDateTime))				
		// 	.filter(LGI.Guide.Broadcast.END.lessThan(endDateTime))
		// 	.sort(LGI.Guide.Broadcast.START)
		// 	.findOne(function(response){
		// 		// view.items.forEach(function(item){
		// 		// 	item.data = response;
		// 		// }, this);
		// 	});

// console.log("onMenuChanged: " + selectedMenuItem);
// 					var startDateTime = moment().format('YYYY-MM-DDTHH:mm') + "Z";
// 					var endDateTime = moment().add('hours', 2).format('YYYY-MM-DDTHH:mm') + "Z";
// 					LGI.Guide.Broadcast.create()
// 						.limit(256)
// 						.fields(LGI.Guide.Broadcast.ID, LGI.Guide.Broadcast.IMI, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START, 
// 							LGI.Guide.Broadcast.END, LGI.Guide.Broadcast.CHANNEL, LGI.Guide.Broadcast.CHANNEL_NAME,
// 							LGI.Guide.Broadcast.AGE_RATING, LGI.Guide.Broadcast.CAST, LGI.Guide.Broadcast.DIRECTORS,
// 							LGI.Guide.Broadcast.WRITERS, LGI.Guide.Broadcast.BPM, LGI.Guide.Broadcast.POPULARITY,
// 							LGI.Guide.Broadcast.SYNOPSIS, LGI.Guide.Broadcast.IMAGE_LINK, LGI.Guide.Broadcast.CATEGORY)
// 						//.filter(LGI.Guide.Broadcast.START.greaterThan(startDateTime))				
// 						.filter(LGI.Guide.Broadcast.END.lessThan(endDateTime))
// 						.sort(LGI.Guide.Broadcast.START)
// 						.findOne(function(response){ 
// 							view.assets = response;
// 		        			view.controls.assetCarousel.changeDataset(view.assets, true);
// 						});
	},

	dataLoaded: function(view) {
		console.log("HomeScreen: dataLoaded");
		// view.controls.verticalMenu.changeDataset(Config.common.menuItems);
		// view.controls.assetCarousel.changeDataset(Config.common.menuItems[0]);
		// view.controls.assetCarousel.setFocus();
	},

    // Create your view template
	createView: function () {
		var view = this;		
		
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
				width: 1738,
				position: 'relative',
				display: 'inline-block'
			}
		}).appendTo(view);

		view.controls.verticalMenu = new MenuCarouselControl({
			styles:{
				height: view.height,
				width: 'inherit',
		 		hOffset: -5
			},
			events: {
				onMenuChanged: function(selectedMenuItem){
					view.controls.assetCarousel.changeDataset(selectedMenuItem.data);					
				}				
			}		
		}).appendTo(this.elements.rightContainer);

		view.controls.assetCarousel = new AssetCarouselControl({
			styles:{
				height: 474,
				width: 'inherit',
				vOffset: 296
			},
			events: {
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
		var view = this;
		view.controls.verticalMenu.changeDataset(Config.common.menuItems);
		view.controls.assetCarousel.changeDataset(Config.common.menuItems[0].data);
		view.controls.assetCarousel.setFocus();
	},	

	// todo remove temporary added to shuffle asset list
	shuffle: function(anArray){ //v1.0
		for(var j, x, i = anArray.length; i; j = Math.floor(Math.random() * i), x = anArray[--i], anArray[i] = anArray[j], anArray[j] = x);
			return anArray;
	},

	showSidebar: function() { 
		console.log("HomeScreen: showSidebar");
		var view = this;
		view.elements.rightContainer.freeze();
		view.controls.verticalMenu.disable();
		view.controls.assetCarousel.disable();
		view.elements.rightContainer.width = 1460;	
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
		view.elements.rightContainer.width = 1738;
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