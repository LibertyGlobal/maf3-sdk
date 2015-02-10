var MenuCarouselControl = new MAF.Class({
	ClassName: 'MenuCarouselControl',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event) {
			this.parent(event);
			switch (event.type) {
				case 'navigate':
					if (event.detail) {
						this.doNavigate(event.detail.direction);
					}
					break;
			}
		},

		generateCells: function() {
			this.menu1Container = new MenuCarouselCellControl({
				styles: {
					height: 92,
					width: 'inherit',
					position: 'relative',
					display: 'inline-block',
					opacity: 0.1
				}
			}).appendTo(this);
			this.menu2Container = new MenuCarouselCellControl({
				styles: {
					height: 92,
					width: 'inherit',
					position: 'relative',
					display: 'inline-block',
					opacity: 0.25
				}
			}).appendTo(this);
			this.menu3Container = new MenuCarouselCellControl({
				styles: {
					height: 92,
					width: 'inherit',
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.menu4Container = new MenuCarouselCellControl({
				styles: {
					height: 92,
					width: 'inherit',
					vOffset: 505,
					position: 'relative',
					display: 'inline-block',
					opacity: 0.25
				}
			}).appendTo(this);
			this.menu5Container = new MenuCarouselCellControl({
				styles: {
					height: 92,
					width: 'inherit',
					vOffset: 505,
					position: 'relative',
					display: 'inline-block',
					opacity: 0.25
				}
			}).appendTo(this);
			this.menu6Container = new MenuCarouselCellControl({
				styles: {
					height: 92,
					width: 'inherit',
					vOffset: 505,
					position: 'relative',
					display: 'inline-block',
					opacity: 0.05
				}
			}).appendTo(this);
		},
		updateCells: function() {
			this.menu3Container.changeData(this.mainCollection[0]);
			this.menu4Container.changeData((this.mainCollection.length > 1) ? this.mainCollection[1] : null);
			this.menu5Container.changeData((this.mainCollection.length > 2) ? this.mainCollection[2] : null);
			this.menu6Container.changeData((this.mainCollection.length > 3) ? this.mainCollection[3] : null);
			this.menu1Container.changeData((this.mainCollection.length > 5) ? this.mainCollection[this.mainCollection.length - 2] : null);
			this.menu2Container.changeData((this.mainCollection.length > 4) ? this.mainCollection[this.mainCollection.length - 1] : null);
			this.fire('onMenuChanged', {
				selectedMenuItem: this.mainCollection[0]
			});
		}
	},

	config: {
		render: true,
		focus: false
	},

	initialize: function() {
		this.parent();
		this.generateCells();
		this.mainCollection = [];
		console.log("MenuCarouselControl initialize ");
		this.focusIndex = 0;
	},

	changeDataset: function(data) {
		console.log("MenuCarouselControl changeDataset ");
		this.focusIndex = 0;
		this.mainCollection = [].concat(data);
		this.updateCells();
	},

	setFocus: function() {
		this.focus();
	},

	disable: function() {
		this.setStyles({
			opacity: 0.3
		});
		this.menu3Container.setStyles({
			opacity: 0.3
		});
	},

	enable: function() {
		this.setStyles({
			opacity: 1
		});
		this.menu3Container.setStyles({
			opacity: 1
		});
	},

	doNavigate: function(direction) {
		if (this.mainCollection.length > 0) {
			if (direction) {
				switch (direction) {
					case 'up':
						this.mainCollection.unshift(this.mainCollection.pop());
						break;
					case 'down':
						this.mainCollection.push(this.mainCollection.shift());
						break;
				}
				this.updateCells();
			}
		}
	},

	suicide: function() {
		this.mainCollection = null;
		delete this.menu1Container;
		delete this.menu2Container;
		delete this.menu3Container;
		delete this.menu4Container;
		delete this.menu5Container;
		delete this.menu6Container;
		this.parent();
	}
});