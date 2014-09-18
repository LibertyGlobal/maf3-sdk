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
		
		this.controls.sideBarContainer = new SidebarControl().appendTo(view);

		this.elements.rightContainer = new MAF.element.Container({
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
					styles: this.getCellDimensions(),
					events: {
						onFocus: function () {
							this.animate({
							});
						},
						onBlur: function(){
							this.animate({
							});
						}
					}
				});

				cell.title = new MAF.element.Text({
					styles: {
						width: cell.width,
						color: '#ffffff',
						fontFamily: 'InterstatePro-Light, sans-serif',
						fontSize: 60,						
						paddingTop: 20,
					}
				}).appendTo(cell);

				return cell;
			},
			cellUpdater: function(cell, data){
				cell.title.setText(data.title);
			},
			events: {
				onDatasetChanged: function(){
					this.getCurrentCell().focus();
					this.animate({
						opacity: 1,
						duration: 0.2
					});
				}
			}
		}).appendTo(this.elements.rightContainer);

		view.controls.assets = new AssetCarouselControl({
			styles:{
		 		height: 474,
		 		width: 'inherit',
		 		vOffset: 296
			},
			cellCreator: function () {
				var cell = new AssetCarouselCellControl({
					//styles: this.getCellDimensions(),
					events: {
						onFocus: function () {
							this.animate({
							});
						},
						onBlur: function(){
							this.animate({
							});
						}
					}
				});

				cell.title = new MAF.element.Text({
					styles: {
						hOffset: 20,
						color: '#ffffff',
						fontSize: 32,
						paddingTop: 20,
						paddingLeft: 20
					}
				}).appendTo(cell);

				return cell;
			},
			cellUpdater: function(cell, data){
				//cell.title.setText(data.title);
			},
			events: {
				onDatasetChanged: function(){
					// this.getCurrentCell().focus();
					// this.animate({
					// 	opacity: 1,
					// 	duration: 0.2
					// });
				}
			}
		}).appendTo(this.elements.rightContainer);
	},

	updateView: function () {
		var view = this;
		view.controls.slider.changeDataset(view.items, true);
		view.controls.assets.changeDataset(view.assets, true);
	},

	// When closing the application make sure you unreference 
	// your objects and arrays from the view
	destroyView: function () {
		var view = this;
		delete view.items;
	}
});