var HomeScreen = new MAF.Class({
	ClassName: 'HomeScreen',

	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initialize: function () {
		var view = this;
		view.parent();

		view.items = [
			{ title: $_('Kids') },
			{ title: $_('Documentaries') },
			{ title: $_('Movies') },
			{ title: $_('Trending') },
			{ title: $_('Recommendations') },
			{ title: $_('Shuffle') },
			{ title: $_('Sports') },
			{ title: $_('Your TV Tips') }
		];
		
		view.assets = testdata;
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

		view.controls.slider = new CarouselControl({
			visibleCells: 6,
			focusIndex: 3,
			itemSize: 8.3,
			focusItemSize: 56,
			blockFocus: true, // focus should be on the asset list
			orientation: 'vertical',
			opacityOffset: 0.32,
			slideDuration: 0.2,
			styles:{
				height: view.height,
				width: 'inherit',
				hOffset: -5
			},
			cellCreator: function () {
				var cell = new CarouselCellControl({
					styles: this.getCellDimensions()
				});

				cell.title = new MAF.element.Text({
					styles: {
						width: cell.width,
						color: '#ffffff',
						fontFamily: 'InterstatePro-Light, sans-serif',
						fontSize: 60,						
						paddingTop: 20
					}
				}).appendTo(cell);

				return cell;
			},
			cellUpdater: function(cell, data){
				cell.title.setText(data.title);
				view.controls.assets.changeDataset(view.shuffle(view.assets), true);
				view.controls.assets.focus();
			}
		}).appendTo(this.elements.rightContainer);

		view.controls.assets = new AssetCarouselControl({
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
					view.controls.slider.doNavigate('up');
				},
				onNavigateDown: function(){
					view.controls.slider.doNavigate('down');
				}
			}			
		}).appendTo(this.elements.rightContainer);
	},

	updateView: function () {
		console.log("HomeScreen: updateView");
		var view = this;
		view.controls.slider.changeDataset(view.items, true);
		view.controls.assets.changeDataset(view.assets, true);
		view.controls.assets.setFocus();
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
		view.elements.rightContainer.opacity = 32;
		view.elements.rightContainer.width = 1460;
		view.controls.sideBarContainer.expand();
		view.controls.sideBarContainer.setFocus();
	},

	hideSidebar: function() {
		console.log("HomeScreen: hideSidebar");
		var view = this;
		//view.elements.rightContainer.thaw();
		//view.elements.rightContainer.opacity = 100;
		view.controls.sideBarContainer.collapse();
		view.elements.rightContainer.width = 1738;
		view.controls.assets.setFocus();
	},

	destroyView: function () {
		var view = this;
		delete view.controls.sideBarContainer;
		delete view.elements.rightContainer;
		delete view.controls.slider;
		delete view.controls.assets;
		delete view.items;
		delete view.assets;
	}
});