var CoverBarItemControl = new MAF.Class({
	ClassName: 'CoverBarItemControl',

	Extends: MAF.element.Container,

	Protected: {
		createContent: function() {
			this.PosterContainer = new MAF.element.Container({
				styles: {
					height: 294,
					width: 204,
					marginTop: 5,
					marginLeft: 5,
					backgroundColor: '#b2bfcb'
				}
			}).appendTo(this);
			this.Poster = new MAF.element.Image({
				styles: {
					margin: 1,
					height: 292,
					width: 202
				}
			}).appendTo(this.PosterContainer);

			this.Title = new MAF.element.TextField({
				totalLines: 2,
				visibleLines: 2,
				styles: {
					color: '#aca7b2',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 24,
					vOffset: 304,
					height: 70,
					width: 204,
					wrap: true,
					truncation: 'end'
				}
			}).appendTo(this);
			if (this.config.showText === false) this.Title.hide();
		}
	},

	config: {
		render: true,
		focus: false,
		showText: true
	},

	initialize: function() {
		this.parent();
		this.config.showText = this.config.showText;
		this.createContent();
		this.PosterContainer.hide();
	},

	changeData: function(data) {
		if (data !== null) {
			this.Title.setText(data.name);
			this.Poster.setSource(data.image);
			this.PosterContainer.show();
		} else {
			this.Title.setText('');
			this.Poster.setSource('');
			this.PosterContainer.hide();
		}
	},

	suicide: function() {
		this.parent();
	}
});