var AssetCarouselCellFocusControl = new MAF.Class({
	ClassName: 'AssetCarouselCellFocusControl',

	Extends: MAF.element.Container,

	Protected: {	
		generateContents: function (){				
			this.Poster = new MAF.element.Image({
				styles: {
					height: 464,
					width: 313,
					position: 'relative',
					display: 'inline'
				}
			}).appendTo(this);				
			this.Title = new MAF.element.Text({
				styles: {
					color: '#000000',
					fontFamily: 'UPCDigital-Bold',
					fontSize: 40,
					vOffset: 19,
					hOffset: 346
				}
			}).appendTo(this);	
			this.InfoImage = new MAF.element.Image({
				source: 'Images/info.png',
				styles: {
					vOffset: 24,
					hOffset: 650,
					height: 42,
					width: 40
				}
			}).appendTo(this);		
			this.Genre = new MAF.element.Text({
				styles: {
					color: '#000000',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 30,
					vOffset: 90,
					hOffset: 346
				}
			}).appendTo(this);
			this.StartEnd = new MAF.element.Text({
				styles: {
					color: '#000000',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 30,
					vOffset: 90,
					hOffset: 580
				}
			}).appendTo(this);
			this.Synopsis = new MAF.element.TextField({
				totalLines: 6,
				styles: {
					color: '#000000',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 30,
					vOffset: 148,
					hOffset: 346,
					height:240,
					width: 464,
					wrap: true,
					truncation: true
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
		if(data !== undefined)
		{		
			this.Poster.setSource(data.poster);	
			this.Title.setText(data.title);			
			this.Genre.setText($_('Home_Asset_Focus_Genre') + data.genre);
			this.StartEnd.setText(moment(data.start).format("HH:mm") + " - " + moment(data.end).format("HH:mm"));
			this.Synopsis.setText(data.short_sysnopsis);
			this.Reminder.setText($_('Home_Asset_Focus_Reminder'));
		}
		else
		{
			this.Poster.setSource('');
			this.Title.setText('');	
			this.Genre.setText('');
			this.StartEnd.setText('');	
			this.Synopsis.setText('');
			this.Reminder.setText('');
		}
	},

	suicide: function () {
		this.parent();
		delete this.Poster;
		delete this.InfoImage;
		delete this.Title;
		delete this.Genre;
		delete this.StartEnd;
		delete this.Synopsis;
	}
});