var AssetCarouselCellControl = new MAF.Class({
	ClassName: 'AssetCarouselCellControl',

	Extends: MAF.element.Container,

	Protected: {	
		generateContents: function (){
			this.PosterContainer = new MAF.element.Container({
				styles: {
					height: 304,
					width: 215,
					backgroundColor: '#b2bfcb',
					padding: 2
				}
			}).appendTo(this);
			this.Poster = new MAF.element.Image({
				styles: {
					height: 300,
					width: 211
				}
			}).appendTo(this.PosterContainer);

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
				styles: {
					maxHeight: 40,
					maxWidth: 200,					
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
				// TODO https doesn't work on the live box. check with ML why
				this.Poster.setSource(data.video.imageLink.href.replace("https", "http"));
				this.PosterContainer.show();
				this.StartEnd.setText(moment(data.start).format("HH:mm") + " - " + moment(data.end).format("HH:mm"));
			
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
		else
		{
			this.Title.setText('');	
			this.Poster.setSource('');
			this.PosterContainer.hide();
			this.StartEnd.setText('');	
			this.Channel.setSource('');
			this.Channel.hide();
		}
	},

	suicide: function () {
		this.parent();
	}
});