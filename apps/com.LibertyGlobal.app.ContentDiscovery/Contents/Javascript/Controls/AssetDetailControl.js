var AssetDetailControl = new MAF.Class({
	ClassName: 'AssetDetailControl',

	Extends: MAF.element.Container,

	Protected: {	
		generateContents: function (){
			this.PosterContainer = new MAF.element.Container({
				styles: {
					vOffset: 90,
					height: 374,
					width: 260,
					backgroundColor: '#b2bfcb',
					padding: 1
				}
			}).appendTo(this);
			this.Poster = new MAF.element.Image({
				styles: {
					height: 372,
					width: 258
				}
			}).appendTo(this.PosterContainer);

			this.Title = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 50,
					width: 'inherit' - 20,
					truncation: 'end',
					vOffset: 0,
					hOffset: 0,
					margin: 0,
					padding: 0
				}
			}).appendTo(this);

			this.Prop1Text = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					vOffset: 100,
					hOffset: 290,
					opacity: 0.59,
					width: 180
				}
			}).appendTo(this);
			this.Prop1Value = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					hOffset: 490,
					vOffset: 100,
					width: 220,
					wrap: true,					
					truncation: 'end'
				}
			}).appendTo(this);

			this.Prop2Text = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					vOffset: 135,
					hOffset: 290,
					opacity: 0.59,
					width: 180
				}
			}).appendTo(this);
			this.Prop2Value = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					hOffset: 490,
					vOffset: 135,
					width: 220,
					wrap: true,					
					truncation: 'end'
				}
			}).appendTo(this);

			this.Prop3Text = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					vOffset: 170,
					hOffset: 290,
					opacity: 0.59,
					width: 180
				}
			}).appendTo(this);
			this.Prop3Value = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					hOffset: 490,
					vOffset: 170,
					width: 220,
					wrap: true,					
					truncation: 'end'
				}
			}).appendTo(this);

			this.Prop4Text = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					vOffset: 205,
					hOffset: 290,
					opacity: 0.59,
					width: 180
				}
			}).appendTo(this);
			this.Prop4Value = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					hOffset: 490,
					vOffset: 205,
					width: 220,
					wrap: true,					
					truncation: 'end'
				}
			}).appendTo(this);

			this.Prop5Text = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					vOffset: 240,
					hOffset: 290,
					opacity: 0.59,
					width: 180
				}
			}).appendTo(this);
			this.Prop5Value = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					hOffset: 490,
					vOffset: 240,
					width: 220,
					wrap: true,					
					truncation: 'end'
				}
			}).appendTo(this);

			this.Prop6Text = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					vOffset: 275,
					hOffset: 290,
					opacity: 0.59,
					width: 180
				}
			}).appendTo(this);
			this.Prop6Value = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					hOffset: 490,
					vOffset: 275,
					width: 220,
					wrap: true,					
					truncation: 'end'
				}
			}).appendTo(this);

			this.Channel = new MAF.element.Image({
				aspect: 'auto',
				styles: {
					vOffset: 340,
					hOffset: 290,
					height: 30,
					width: 180
				}
			}).appendTo(this);

			this.ImdbContainer = new MAF.element.Container({
				styles: {
					maxWidth: 180,					
					vOffset: 330,
					hOffset: 490,
					height: 50,
					width: 220
				}
			}).appendTo(this);
			this.ImdbContainer.hide();

			this.ImdbLogo = new MAF.element.Image({
				source: 'Images/imdb_logo.png',
				styles: {
					marginTop: 7	
				}
			}).appendTo(this.ImdbContainer);

			this.ImdbRating = new MAF.element.Text({
				styles: {
					color: '#e2bc38',
					fontFamily: 'InterstatePro-Light',
					fontSize: 28,
					hOffset: 85,
					marginTop: 7
				}
			}).appendTo(this.ImdbContainer);

			this.ImdbText = new MAF.element.Text({
				data: $_('InfoScreen_Imdb_Text'),
				styles: {
					color: '#e2bc38',
					fontFamily: 'InterstatePro-Light',
					fontSize: 16,
					hOffset: 135,
					marginTop: 18					
				}
			}).appendTo(this.ImdbContainer);

			this.Synopsis = new MAF.element.TextField({
				totalLines: 6,
				visibleLines: 6,
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					vOffset: 100,					
					hOffset: 746,
					height: 250,
					width: 520,
					opacity: 0.59,
					wrap: true,	
					lineHeight: '35px',				
					truncation: 'end'
				}
			}).appendTo(this);
			if(this.config.showSynopsis!==true)
			{
				this.Synopsis.hide();
			}
		}		
	},

	config: {
		render: true,
		focus: false,
		showSynopsis: true
	},

	initialize: function(){
		this.parent();
		this.generateContents();
	},

	changeData: function(data){		
		if(data !== null)
		{	
			this.clearData();
			if(data.video !== null)
			{
				var categories = Config.common.InfoScreenMovieSerieCategory.split(',');
				if (categories.indexOf(data.video.category.substring(0, data.video.category.indexOf("/"))) > -1) {
					// movies/series info screen
					this.ImdbRating.setText("8.9"); // TODO
					this.ImdbContainer.show();

					this.Prop6Text.setText($_('InfoScreen_Asset_Year_Produced_Text'));
					this.Prop6Value.setText(data.video.year);
				}
				else
				{
					this.Prop6Text.setText("");
					this.Prop6Value.setText("");
					this.ImdbContainer.hide();			
				}
			
				// both linear and movies / series info screen
				this.Title.setText(data.video.title);

				this.Prop1Text.setText($_('InfoScreen_Asset_Duration_Text'));
				this.Prop1Value.setText(moment(data.start).format("HH:mm") + " - " + moment(data.end).format("HH:mm"));
				this.Prop2Text.setText($_('InfoScreen_Asset_Genre_Text'));
				var genreText = data.video.category.substring(data.video.category.indexOf("/") + 1);
				genreText = genreText.replace("/", ", ");
				this.Prop2Value.setText(genreText);
				this.Prop3Text.setText($_('InfoScreen_Asset_Language_Text'));
				this.Prop3Value.setText("TODO Value 3");
				this.Prop4Text.setText($_('InfoScreen_Asset_Subtitles_Text'));
				this.Prop4Value.setText("TODO Value 4");
				this.Prop5Text.setText($_('InfoScreen_Asset_Rating_Text'));
				this.Prop5Value.setText(data.video.ageRating);

				// TODO https doesn't work on the live box. check with ML why
				this.Poster.setSource(data.video.imageLink.href.replace("https", "http"));
				this.PosterContainer.show();
				
				this.Synopsis.setText(data.video.synopsis);

				var logoUrl = ChannelHelpers.getChannelLogoMedium(data.channel.logicalPosition);
				if(logoUrl!=="")
				{
					this.Channel.setSource(logoUrl);
					this.Channel.show();
				}
			}
			else
			{
				console.log("video null: " + data.id);	
			}
		}
		else
		{
			this.clearData();
		}
	},

	clearData: function () {
		this.PosterContainer.hide();
		this.ImdbContainer.hide();
		this.Channel.hide();
		this.Prop1Text.setText('');
		this.Prop1Value.setText('');
		this.Prop2Text.setText('');
		this.Prop2Value.setText('');
		this.Prop3Text.setText('');
		this.Prop3Value.setText('');
		this.Prop4Text.setText('');
		this.Prop4Value.setText('');
		this.Prop5Text.setText('');
		this.Prop5Value.setText('');
		this.Prop6Text.setText('');
		this.Prop6Value.setText('');
		this.Title.setText('');
		this.Synopsis.setText('');		
	},

	suicide: function () {
		this.parent();
	}
});