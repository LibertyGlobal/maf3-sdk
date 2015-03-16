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
			this.menu1Container = new MAF.element.Text({
				styles: {
					width: 'inherit',
					color: '#ffffff',
					fontFamily: 'InterstatePro-ExtraLight',
					fontSize: 60,
					paddingTop: 20,
					height: 92,
					position: 'relative',
					display: 'inline-block',
					opacity: 0.1
				}
			}).appendTo(this);
			this.menu2Container = new MAF.element.Text({
				styles: {
					width: 'inherit',
					color: '#ffffff',
					fontFamily: 'InterstatePro-ExtraLight',
					fontSize: 60,
					paddingTop: 20,
					height: 92,
					position: 'relative',
					display: 'inline-block',
					opacity: 0.25
				}
			}).appendTo(this);
			this.menu3Container = new MAF.element.Text({
				styles: {
					width: 'inherit',
					color: '#ffffff',
					fontFamily: 'InterstatePro-ExtraLight',
					fontSize: 60,
					paddingTop: 20,
					height: 92,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.menu4Container = new MAF.element.Text({
				styles: {
					width: 'inherit',
					color: '#ffffff',
					fontFamily: 'InterstatePro-ExtraLight',
					fontSize: 60,
					paddingTop: 20,
					height: 92,
					vOffset: 505,
					position: 'relative',
					display: 'inline-block',
					opacity: 0.25
				}
			}).appendTo(this);
			this.menu5Container = new MAF.element.Text({
				styles: {
					width: 'inherit',
					color: '#ffffff',
					fontFamily: 'InterstatePro-ExtraLight',
					fontSize: 60,
					paddingTop: 20,
					height: 92,
					vOffset: 505,
					position: 'relative',
					display: 'inline-block',
					opacity: 0.25
				}
			}).appendTo(this);
			this.menu6Container = new MAF.element.Text({
				styles: {
					width: 'inherit',
					color: '#ffffff',
					fontFamily: 'InterstatePro-ExtraLight',
					fontSize: 60,
					paddingTop: 20,
					height: 92,
					vOffset: 505,
					position: 'relative',
					display: 'inline-block',
					opacity: 0.05
				}
			}).appendTo(this);
		},
		updateCells: function() {
			this.menu3Container.setText(this.mainCollection[0].mainMenuLabel);
			this.menu4Container.setText((this.mainCollection.length > 1) ? this.mainCollection[1].mainMenuLabel : "");
			this.menu5Container.setText((this.mainCollection.length > 2) ? this.mainCollection[2].mainMenuLabel : "");
			this.menu6Container.setText((this.mainCollection.length > 3) ? this.mainCollection[3].mainMenuLabel : "");
			this.menu1Container.setText((this.mainCollection.length > 5) ? this.mainCollection[this.mainCollection.length - 2].mainMenuLabel : "");
			this.menu2Container.setText((this.mainCollection.length > 4) ? this.mainCollection[this.mainCollection.length - 1].mainMenuLabel : "");
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
		this.focusIndex = 0;
	},

	changeDataset: function(data) {
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