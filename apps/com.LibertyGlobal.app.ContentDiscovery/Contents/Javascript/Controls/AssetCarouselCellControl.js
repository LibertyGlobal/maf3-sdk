var AssetCarouselCellControl = new MAF.Class({
	ClassName: 'AssetCarouselCellControl',

	Extends: MAF.element.Container,

	Protected: {	
		generateContents: function (){
			this.Poster = new MAF.element.Image({
				styles: {
					height: 304,
					width: 215,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.Title = new MAF.element.Text({
				styles: {
					color: '#cecece',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 28,
					vOffset: 15,
					height: 30,
					width: 215,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.StartEnd = new MAF.element.Text({
				styles: {
					color: '#cecece',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 28,
					height: 30,
					vOffset: 16,
					width: 215,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.Channel = new MAF.element.Image({
				styles: {
					height: 30,
					vOffset: 22,
					opacity: 0.7,					
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
		}		
	},

	config: {
		render: true,
		focus: false
	},

	initialize: function(){
		this.parent();
		this.generateContents();
	},

	changeData: function(data){		
		if(data !== undefined)
		{			
			this.Title.setText(data.title);
			this.Poster.setSource(data.poster);
			this.StartEnd.setText(moment(data.start).format("HH:mm") + " - " + moment(data.end).format("HH:mm"));
			this.Channel.setSource(data.channel_logo);
		}
		else
		{
			this.Title.setText('');	
			this.Poster.setSource('');
			this.StartEnd.setText('');	
			this.Channel.setSource('');
		}
	},

	suicide: function () {
		delete this.Title;
		delete this.Poster;
		delete this.StartEnd;
		delete this.Channel;
		this.parent();
	}
});