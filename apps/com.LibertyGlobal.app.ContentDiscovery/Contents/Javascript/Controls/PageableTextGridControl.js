var PageableTextGridControl = new MAF.Class({
	ClassName: 'PageableTextGridControl',

	Extends: MAF.element.Container,

	Protected: {
		createContent: function() {
			this.pageIndicator = new MAF.control.PageIndicator({
				theme: false,
				styles: {
					width: this.width - 192,
					height: 50,
					vOffset: this.height - 70,
					hOffset: 96,
					fontFamily: 'UPCDigital-Bold',
					fontSize: 29,
					opacity: 0.40,
					backgroundColor: "#1e3551",
					color: "#c0c8cd"
				},
				events: {
					updateText: function(curpage, pagecount, state) {
						return $_('FullSynopsisScreen_Pagination', [parseInt(curpage, 10) + 1, pagecount]);
					}
				}
			}).appendTo(this);
			this.pageIndicator.hide();

			this.pageLeft = new MAF.element.Image({
				styles: {
					width: 96,
					height: 54,
					vOffset: this.height - 72,
					hOffset: 0
				},
				source: 'Images/paging_left.png'
			}).appendTo(this);
			this.pageLeft.hide();

			this.pageRight = new MAF.element.Image({
				styles: {
					width: 96,
					height: 54,
					vOffset: this.height - 72,
					hOffset: this.width - 96
				},
				source: 'Images/paging_right.png'
			}).appendTo(this);
			this.pageRight.hide();

			this.textGrid = new MAF.element.TextGrid({
				styles: {
					vOffset: 0,
					hOffset: 0,
					fontFamily: 'UPCDigital-Regular',
					fontSize: 27,
					width: this.width,
					height: this.height - 80,
					wrap: true
				}
			}).appendTo(this);
			this.textGrid.attachAccessories(this.pageIndicator);
		},
		updateText: function(text) {
			this.textGrid.setText(text);
			if (this.textGrid.getPageCount() > 1) {
				
				this.pageLeft.show();
				this.pageRight.setStyles({ hOffset: 0 });
				this.pageRight.show();
				this.pageRight.setStyles({ hOffset: this.width - 96 });
				this.pageIndicator.visible = true;
			} else {
				this.pageLeft.hide();
				this.pageLeft.setStyles({ hOffset: -3000 });
				this.pageRight.hide();
				this.pageRight.setStyles({ hOffset: -3000 });
				this.pageIndicator.visible = false;
			}
		}
	},

	config: {
		render: true,
		focus: false
	},

	initialize: function() {
		this.parent();
		this.createContent();
		this.pageIndicator.focus = this.config.focus;
	},

	setText: function(text) {
		this.updateText(text);
	},

	shiftPage: function(direction) {
		this.pageIndicator.shiftSource(direction);
		this.pageIndicator.focus = this.config.focus;
	},

	suicide: function() {
		delete this.pageIndicator;
		delete this.pageLeft;
		delete this.pageRight;
		delete this.textGrid;
		this.parent();
	}
});