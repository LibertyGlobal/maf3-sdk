var AssetCarouselCellControl = new MAF.Class({
	ClassName: 'AssetCarouselCellControl',

	Extends: MAF.element.Container,

	Protected: {	
		generateContents: function (){
			this.Poster = new MAF.element.Image({
				aspect: 'crop',
				styles: {
					height: 304,
					width: 215,
					borderColor: '#b2bfcb',
					borderStyle: 'solid',
					borderWidth: 2
				}
			}).appendTo(this);

			this.Title = new MAF.element.Text({
				styles: {
					color: '#cecece',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 28,
					vOffset: 310,
					height: 30,
					width: 215,
					truncation: 'end'
				}
			}).appendTo(this);
			this.StartEnd = new MAF.element.Text({
				styles: {
					color: '#cecece',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 28,
					height: 30,
					vOffset: 345,
					width: 215
				}
			}).appendTo(this);
			this.Channel = new MAF.element.Image({
				aspect: 'auto',
				styles: {
					height: 30,
					width: 200,
					vOffset: 395
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
		if(data !== null)
		{			
			if(data.video !== null)
			{
				this.Title.setText(data.video.title);
				this.Poster.setSource(data.video.imageLink.href);
				this.Poster.show();
				this.StartEnd.setText(moment(data.start).format("HH:mm") + " - " + moment(data.end).format("HH:mm"));
			
				var logoUrl = InitializationHandler.getChannelLogoMedium(data.channel.logicalPosition);
				if(logoUrl!=="")
				{
					this.Channel.setSource(logoUrl);
					this.Channel.show();
				}				
			}
		}
		else
		{
			this.Title.setText('');	
			this.Poster.setSource('');
			this.Poster.hide();
			this.StartEnd.setText('');	
			this.Channel.setSource('');
			this.Channel.hide();
		}
	},

	suicide: function () {		
		delete this.Poster;
		delete this.Title;
		delete this.StartEnd;
		delete this.Channel;
		this.parent();
	}
});