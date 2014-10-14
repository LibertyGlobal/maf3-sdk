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
					width: 155
				}
			}).appendTo(this);
			this.Prop1Value = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					hOffset: 455,
					vOffset: 100,
					width: 220
				}
			}).appendTo(this);

			this.Prop2Text = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					vOffset: 140,
					hOffset: 290,
					opacity: 0.59,
					width: 155
				}
			}).appendTo(this);
			this.Prop2Value = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					hOffset: 455,
					vOffset: 140,
					width: 220
				}
			}).appendTo(this);

			this.Prop3Text = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					vOffset: 180,
					hOffset: 290,
					opacity: 0.59,
					width: 155
				}
			}).appendTo(this);
			this.Prop3Value = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					hOffset: 455,
					vOffset: 180,
					width: 220
				}
			}).appendTo(this);

			this.Prop4Text = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					vOffset: 220,
					hOffset: 290,
					opacity: 0.59,
					width: 155
				}
			}).appendTo(this);
			this.Prop4Value = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					hOffset: 455,
					vOffset: 220,
					width: 220
				}
			}).appendTo(this);

			this.Prop5Text = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					vOffset: 260,
					hOffset: 290,
					opacity: 0.59,
					width: 155
				}
			}).appendTo(this);
			this.Prop5Value = new MAF.element.Text({
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					height: 30,
					hOffset: 455,
					vOffset: 260,
					width: 220
				}
			}).appendTo(this);

			this.Channel = new MAF.element.Image({
				styles: {
					maxHeight: 40,
					maxWidth: 200,					
					vOffset: 330,
					hOffset: 290
				}
			}).appendTo(this);

			this.Synopsis = new MAF.element.TextField({
				totalLines: 6,
				visibleLines: 6,
				styles: {
					color: '#FFFFFF',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 26,
					vOffset: 100,
					hOffset: 705,
					height:250,
					width: 520,
					wrap: true,
					opacity: 0.59,
					truncation: 'end'
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

			if(data.video !== null)
			{
				// TODO https doesn't work on the live box. check with ML why
				this.Poster.setSource(data.video.imageLink.href.replace("https", "http"));
				this.PosterContainer.show();

				this.Title.setText(data.video.title);
				this.Synopsis.setText(data.video.synopsis);
				
				this.Prop1Text.setText($_('InfoScreen_Asset_Duration_Text'));
				this.Prop1Value.setText(moment(data.start).format("HH:mm") + " - " + moment(data.end).format("HH:mm"));
				this.Prop2Text.setText($_('InfoScreen_Asset_Genre_Text'));
				var genreText = data.video.category.substring(data.video.category.indexOf("/") + 1);
				genreText = genreText.replace("/", ", ");
				this.Prop2Value.setText(genreText);
				this.Prop3Text.setText($_('InfoScreen_Asset_Language_Text'));
				this.Prop3Value.setText("TODO");
				this.Prop4Text.setText($_('InfoScreen_Asset_Rating_Text'));
				this.Prop4Value.setText(data.video.ageRating);
				this.Prop5Text.setText("TODO:");
				this.Prop5Value.setText("TODO:");
			
				if(Config.common.channelList.length>0)
				{
					for (var i = 0; i < Config.common.channelList.length; i++) {
						if (Config.common.channelList[i].channelNumber === data.channel.logicalPosition) {
							if(Config.common.channelList[i].stationSchedules!==null && Config.common.channelList[i].stationSchedules.length > 0) {
								for (var j = 0; j< Config.common.channelList[i].stationSchedules[0].station.images.length; j++) {
									if(Config.common.channelList[i].stationSchedules[0].station.images[j].assetType === "station-logo-medium")
									{
										this.Channel.setSource(Config.common.channelList[i].stationSchedules[0].station.images[j].url);
											this.Channel.show();
										break;
									}
								}
							}					
						}
					}
				}
			}
			else
			{
				console.log("video null: " + data.id);	
			}
		}
	},

	suicide: function () {
		this.parent();
	}
});