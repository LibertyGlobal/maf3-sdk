var CoverBarControl = new MAF.Class({
	ClassName: 'CoverBarControl',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event) {
			this.parent(event);
			if (this.config.clickable === true) {
				switch (event.type) {
					case 'navigate':
						if (event.detail) {
							this.doNavigate(event.detail.direction);
						}
						break;
					case 'select':
						this.fire("onCastSelect", {
							cast: this.mainCollection[this.focusIndex]
						});
						break;
				}
			}
		},

		generateCells: function() {
			this.cover1Container = new CoverBarItemFocusControl({
				showText: this.config.showText,
				styles: {
					height: 380,
					width: 214,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.cells.push(this.cover1Container);
			this.cover2Container = new CoverBarItemControl({
				showText: this.config.showText,
				styles: {
					height: 380,
					width: 209,
					hOffset: 40,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.cells.push(this.cover2Container);
			this.cover3Container = new CoverBarItemControl({
				showText: this.config.showText,
				styles: {
					height: 380,
					width: 209,
					hOffset: 80,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.cells.push(this.cover3Container);
			this.cover4Container = new CoverBarItemControl({
				showText: this.config.showText,
				styles: {
					height: 380,
					width: 209,
					hOffset: 120,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.cells.push(this.cover4Container);
			this.cover5Container = new CoverBarItemControl({
				showText: this.config.showText,
				styles: {
					height: 380,
					width: 209,
					hOffset: 160,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.cells.push(this.cover5Container);
			this.cover6Container = new CoverBarItemControl({
				showText: this.config.showText,
				styles: {
					height: 380,
					width: 209,
					hOffset: 200,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.cells.push(this.cover6Container);
			this.cover7Container = new CoverBarItemControl({
				showText: this.config.showText,
				styles: {
					height: 380,
					width: 209,
					hOffset: 240,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.cells.push(this.cover7Container);
		},
		updateCells: function() {
			for (i = 0; i < this.cells.length; i++) {
				(i < this.mainCollection.length) ? this.cells[i].changeData(this.mainCollection[i]): this.cells[i].changeData(null);
			}
		}
	},

	config: {
		render: true,
		focus: false,
		showText: true,
		clickable: true,
	},

	initialize: function() {
		this.parent();
		this.config.showText = this.config.showText;
		this.config.clickable = this.config.clickable;
		this.cells = [];
		this.generateCells();
		this.mainCollection = [];
		this.focusIndex = 0;
	},

	changeDataset: function(data) {
		if (data !== null) {
			this.focusIndex = 0;
			this.mainCollection = [].concat(data);
			this.updateCells();
		}
	},

	setFocus: function() {
		if (this.config.clickable === true) {
			this.cover1Container.focus();
		}
	},

	doNavigate: function(direction) {
		if (direction) {
			switch (direction) {
				case 'left':
					this.mainCollection.unshift(this.mainCollection.pop());
					break;
				case 'right':
					this.mainCollection.push(this.mainCollection.shift());
					break;
				case 'up':
					this.fire("onNavigateUp");
					break;
			}
			this.updateCells();
		}
	},

	suicide: function() {
		delete this.mainCollection;
		delete this.cells;
		delete this.cover1Container;
		delete this.cover2Container;
		delete this.cover3Container;
		delete this.cover4Container;
		delete this.cover5Container;
		delete this.cover6Container;
		delete this.cover7Container;
		this.parent();
	}
});