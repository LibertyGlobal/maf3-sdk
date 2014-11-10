var AssetCarouselCellFutureFocusControl = new MAF.Class({
	ClassName: 'AssetCarouselCellFutureFocusControl',

	Extends: MAF.element.Container,

	Protected: {	
		generateContents: function (){	
			this.futureContainer = new MAF.element.Container({
				styles: {	
					height: 'inherit',
					width: 'inherit',
					padding: 5		
				}
			}).appendTo(this);			
			this.Poster = new MAF.element.Image({
				styles: {
					height: 465,
					width: 313,
					position: 'relative',
					display: 'inline'
				}
			}).appendTo(this.futureContainer);				
			this.Title = new MAF.element.Text({
				styles: {
					color: '#000000',
					fontFamily: 'UPCDigital-Bold',
					fontSize: 40,
					vOffset: 19,
					hOffset: 346,
					width: 410,
					truncation: 'end'
				}
			}).appendTo(this);	
			this.InfoImage = new MAF.element.Image({
				source: 'Images/info.png',
				styles: {
					vOffset: 21,
					hOffset: 775,
					height: 42,
					width: 40
				}
			}).appendTo(this);		
			this.Genre = new MAF.element.Text({
				styles: {
					color: '#7a7a7a',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 30,
					vOffset: 80,
					hOffset: 346
				}
			}).appendTo(this);
			this.GenreValue = new MAF.element.Text({
				styles: {
					color: '#000000',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 30,
					width: 356,
					vOffset: 80,
					hOffset: 452,
					truncation: 'end'
				}
			}).appendTo(this);
			this.Channel = new MAF.element.Image({
				aspect: 'auto',
				styles: {
					vOffset: 90,
					hOffset: 610,					
					height: 40,
					width: 180,
					hAlign: 'right',
					right: 40
				}
			}).appendTo(this);
			this.StartEnd = new MAF.element.Text({
				styles: {
					color: '#000000',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 30,
					vOffset: 115,
					hOffset: 346
				}
			}).appendTo(this);
			this.Synopsis = new MAF.element.TextField({
				totalLines: 7,
				visibleLines: 7,
				styles: {
					color: '#000000',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					vOffset: 166,
					hOffset: 346,
					height:240,
					width: 464,
					wrap: true,
					truncation: 'end'
				}
			}).appendTo(this);
			this.Reminder = new MAF.element.Text({
				styles: {
					color: '#000000',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 30,
					vOffset: 415,
					hOffset: 346
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
				this.Poster.setSource(data.video.imageLink.href.replace("https", "http"));	
				this.Title.setText(data.video.title);	
				this.Genre.setText($_('MainScreen_Asset_Focus_Genre'));
				var genreText = data.video.category.substring(data.video.category.indexOf("/") + 1);
				genreText = genreText.replace("/", ", ");
				this.GenreValue.setText(genreText);
				this.StartEnd.setText(moment(data.start).format("HH:mm") + " - " + moment(data.end).format("HH:mm"));
				this.Synopsis.setText(data.video.synopsis);
				this.Reminder.setText($_('MainScreen_Asset_Focus_Reminder'));
				var logoUrl = ChannelHandler.getChannelLogoMedium(data.channel.logicalPosition);
				if(logoUrl!=="")
				{
					this.Channel.setSource(logoUrl);
					this.Channel.show();
				}
			}
		}
		else
		{
			this.Poster.setSource('');
			this.Title.setText('');	
			this.Genre.setText('');
			this.GenreValue.setText('');
			this.StartEnd.setText('');	
			this.Synopsis.setText('');
			this.Reminder.setText('');
		}
	},

	suicide: function () {
		this.parent();
	}
});