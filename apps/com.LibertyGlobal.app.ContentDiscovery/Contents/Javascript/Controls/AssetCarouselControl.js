var AssetCarouselControl = new MAF.Class({
	ClassName: 'AssetCarouselControl',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event) {
			this.parent(event);
			switch (event.type) {
				case 'navigate':
					if (event.detail) {
						this.doNavigate(event.detail.direction);
					}
					event.preventDefault();
					event.stopPropagation();
					break;
				case 'select':
					this.fire("onAssetSelect", {
						asset: this.mainCollection[this.focusIndex]
					});
					break;
			}
		},

		generateCells: function() {
			var view = this;
			this.leftArrow = new MAF.element.Image({
				source: 'Images/arrow_left.png',
				styles: {
					height: 63,
					width: 63,
					vOffset: 200,
					hOffset: 0
				}
			}).appendTo(this);
			this.leftArrow.hide();

			this.rightArrow = new MAF.element.Image({
				source: 'Images/arrow_right.png',
				aspect: 'crop',
				styles: {
					height: 63,
					width: 63,
					vOffset: 200,
					hOffset: 930
				}
			}).appendTo(this);
			this.rightArrow.hide();

			this.emptyFocusContainer = new AssetCarouselCellEmptyFocusControl({
				styles: {
					backgroundImage: 'Images/asset_background_future_focus.png',
					backgroundColor: '#FFFFFF',
					height: 474,
					width: 843,
					hOffset: 75,
					padding: 5
				},
				events: {
					onReload: function(event) {
						view.fire("onReloadItemsPressed", {});
						event.preventDefault();
						event.stopPropagation();
					}
				}
			}).appendTo(this);
			this.futureFocusContainer = new AssetCarouselCellFutureFocusControl({
				styles: {
					backgroundImage: 'Images/asset_background_future_focus.png',
					backgroundColor: '#FFFFFF',
					height: 474,
					width: 843,
					hOffset: 75,
					padding: 5
				}
			}).appendTo(this);
			this.currentFocusContainer = new AssetCarouselCellCurrentFocusControl({
				styles: {
					height: 498,
					width: 843,
					hOffset: 75,
					borderStyle: 'solid',
					borderWidth: 4,
					borderColor: '#FFFFFF',
					padding: 0
				}
			}).appendTo(this);
			this.asset1Container = new AssetCarouselCellControl({
				styles: {
					height: 'inherit',
					width: 215,
					vOffset: 45,
					hOffset: 1010
				}
			}).appendTo(this);
			this.cells.push(this.asset1Container);
			this.asset2Container = new AssetCarouselCellControl({
				styles: {
					height: 'inherit',
					width: 215,
					vOffset: 45,
					hOffset: 1270
				}
			}).appendTo(this);
			this.cells.push(this.asset2Container);
			this.asset3Container = new AssetCarouselCellControl({
				styles: {
					height: 'inherit',
					width: 215,
					vOffset: 45,
					hOffset: 1530
				}
			}).appendTo(this);
			this.cells.push(this.asset3Container);
		},
		displayFocussed: function(focussedData, menuItem) {			
			this.emptyFocusContainer.hide();
			this.futureFocusContainer.hide();
			this.currentFocusContainer.hide();
			this.futureFocusContainer.changeData(null);
			this.currentFocusContainer.changeData(null);
			if (focussedData !== null) {
				if (moment() > moment(focussedData.start)) {
					this.fire('onAssetChanged', {
						isLiveAsset: true
					});
					this.currentFocusContainer.show();
					this.currentFocusContainer.changeData(focussedData);
					this.isLive = true;
					this.currentFocusContainer.focus();
				} else {
					this.fire('onAssetChanged', {
						isLiveAsset: false
					});
					this.futureFocusContainer.show();
					this.futureFocusContainer.changeData(focussedData);
					this.isLive = false;
					this.futureFocusContainer.focus();
				}
			} else {
				this.emptyFocusContainer.show();
				this.emptyFocusContainer.changeData("empty", this.menuItemText, this.menuItemTimeWindow);
				this.emptyFocusContainer.setFocus();
			}
		},
		updateCells: function() {
			this.leftArrow.hide();
			this.rightArrow.hide();
			for (var i = 0; i < this.cells.length; i++) {
				this.cells[i].changeData(null);
			}
			this.displayFocussed(null);

			if(this.focusIndex>0)
			{
				this.leftArrow.show();
			}
			if(this.mainCollection.length>0)
			{
				this.rightArrow.show();
			}

			var pos = 0; // unfocussed cells
			var maxItems = (this.mainCollection.length >= 4) ? this.cells.length : this.mainCollection.length - 1;
			for (i = this.focusIndex; i < this.mainCollection.length && pos < maxItems; i++) {
				if (i === this.focusIndex) {
					this.displayFocussed(this.mainCollection[i]);
				} else {
					this.cells[pos].changeData(this.mainCollection[i]);
					pos++;
				}
			}

			// if not all cells filled, start at beginning			
			i = 0;
			while (pos < maxItems) {
				this.cells[pos].changeData(this.mainCollection[i]);
				pos++;
				i++;
			}
		}
	},

	config: {
		render: true,
		focus: false
	},

	initialize: function() {
		this.parent();
		this.timer = null;
		this.cells = [];
		this.generateCells();
		this.menuItemText = "";
		this.menuItemTimeWindow = "";
		this.mainCollection = [];
		this.focusIndex = 0;
		this.isLive = false;
		this.setLoading();
	},

	setLoading: function() {
		this.futureFocusContainer.hide();
		this.currentFocusContainer.hide();
		this.emptyFocusContainer.show();
		this.emptyFocusContainer.changeData("loading", null);
		for (var i = 0; i < this.cells.length; i++) {
			this.cells[i].changeData(null);
		}
	},

	changeDataset: function(menuItem) {
		this.focusIndex = 0;
		this.mainCollection = [].concat(menuItem.data);
		this.menuItemText = menuItem.mainMenuLabel;
		this.menuItemTimeWindow = menuItem.dataTimeframe;
		this.updateCells();
	},

	updateVideo: function() {
		if (this.currentFocusContainer.visible) {
			this.currentFocusContainer.updateVideo();
		}
	},

	updateReminder: function() {
		if (this.futureFocusContainer.visible) {
			this.futureFocusContainer.updateReminder();
		}
	},

	startAutoNavigate: function() {
		var carousel = this;
		this.stopAutoNavigate();
		if(this.timer === null)
		{
			this.timer = new Timer(Config.get('carouselAutoNavigateToggleTimeout'), function() {
				if(carousel.visible===true)
				{
					carousel.doNavigate('right');
				}
			});
			this.timer.start();
		}
	},

	stopAutoNavigate: function() {
		if (this.timer !== null) {
			this.timer.stop();
			this.timer = null;
		}
	},

	setFocus: function() {
		if (this.mainCollection.length > 0) {
			if (this.isLive === true) {
				this.currentFocusContainer.focus();
			} else {
				this.futureFocusContainer.focus();
			}
		} else {
			this.emptyFocusContainer.setFocus();
		}
	},

	disable: function() {
		this.setStyles({
			opacity: 0.3
		});
	},

	enable: function() {
		this.setStyles({
			opacity: 1
		});
	},

	doNavigate: function(direction) {
		var handled = true;
		if (direction) {
			switch (direction) {
				case 'left':
					if (this.focusIndex - 1 >= 0)
					{
						this.focusIndex--;
						this.updateCells();
					}
					else
					{
						this.focusIndex = 0;
						this.fire('onNavigateLeft');
					}
					break;
				case 'right':
					if (this.focusIndex + 1 < this.mainCollection.length)
						this.focusIndex++;
					else
						this.focusIndex = 0;

					this.updateCells();
					break;
				case 'up':
					this.fire('onNavigateUp');
					break;
				case 'down':
					this.fire('onNavigateDown');
					break;
				default:
					handled = false;
					break;
			}
		}
		return handled;
	},

	suicide: function() {
		if (this.timer !== null) {
			this.timer.stop();
			this.timer = null;
		}
		this.mainCollection = null;
		this.cells = null;
		this.menuItemText = null;
		this.menuItemTimeWindow = null;
		delete this.cells;
		delete this.menuItemText;
		delete this.menuItemTimeWindow;
		delete this.mainCollection;
		delete this.leftArrow;
		delete this.rightArrow;
		delete this.currentFocusContainer;
		delete this.futureFocusContainer;
		delete this.emptyFocusContainer;
		delete this.asset1Container;
		delete this.asset2Container;
		delete this.asset3Container;
		this.parent();
	}
});