var AssetCarouselCellControl = new MAF.Class({
	ClassName: 'AssetCarouselCellControl',

	Extends: MAF.element.Container,

	Protected: {	
		generateContents: function (){
			this.PosterContainer = new MAF.element.Container({
				styles: {
					height: 304,
					width: 215,
					position: 'relative',
					display: 'inline-block',
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
					vOffset: 15,
					height: 30,
					width: 215,
					position: 'relative',
					display: 'inline-block',
					truncation: 'end'
				}
			}).appendTo(this);
			this.StartEnd = new MAF.element.Text({
				styles: {
					color: '#cecece',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 28,
					height: 30,
					vOffset: 10,
					width: 215,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.Channel = new MAF.element.Image({
				styles: {
					maxHeight: 40,
					maxWidth: 200,					
					vOffset: 18,				
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
			this.Title.setText(data.video.title);
			this.Poster.setSource(data.video.imageLink.href);
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