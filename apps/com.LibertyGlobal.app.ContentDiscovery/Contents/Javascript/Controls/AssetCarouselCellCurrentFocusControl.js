var AssetCarouselCellCurrentFocusControl = new MAF.Class({
	ClassName: 'AssetCarouselCellCurrentFocusControl',

	Extends: MAF.element.Container,

	Protected: {	
		generateContents: function (){	
			this.BackgroundImage = new MAF.element.Image({
				source: 'Images/asset_background_current_focus.png',
				styles: {
					vOffset: 370,
					hOffset: 0
				}
			}).appendTo(this);			
			this.Title = new MAF.element.Text({
				styles: {
					color: '#000000',
					fontFamily: 'UPCDigital-Bold',
					fontSize: 40,
					vOffset: 390,
					hOffset: 20,
					width: 803,
					truncation: 'end'
				}
			}).appendTo(this);				
			this.InfoImage = new MAF.element.Image({
				source: 'Images/info.png',
				styles: {
					vOffset: 446,
					hOffset: 240,
					height: 42,
					width: 40
				}
			}).appendTo(this);			
			this.StartEnd = new MAF.element.Text({
				styles: {
					color: '#000000',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 30,
					vOffset: 446,
					hOffset: 20
				}
			}).appendTo(this);
			this.OkView = new MAF.element.Text({
				styles: {
					color: '#000000',
					fontFamily: 'UPCDigital-Regular',
					fontSize: 30,
					vOffset: 446,
					hOffset: 307
				}
			}).appendTo(this);
			this.Channel = new MAF.element.Image({
				aspect: 'auto',
				styles: {
					vOffset: 446,
					hOffset: 620,
					height: 40,
					width: 180,
					hAlign: 'right',
					right: 30
				}
			}).appendTo(this);
			this.ProgressContainer = new MAF.element.Container({
				styles: {
					backgroundColor: '#898989',
					vOffset: 377,
					height: 10,
					hOffset: 11,
					width: 811
				}
			}).appendTo(this);
			this.ProgressIndicator = new MAF.element.Container({
				styles: {
					backgroundColor: '#FFFFFF',
					vOffset: 377,
					height: 10,
					hOffset: 11,
					borderStyle: 'solid',
					borderWidth: 1,
					borderColor: '#898989'
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
		this.displayData = null;
		MAF.mediaplayer.init(); 
	},

	changeData: function(data){		
		if(data !== null)
		{		
			this.displayData = data;
			if(data.video !== null)
			{				
				MAF.mediaplayer.setViewportBounds(254, 301, 836, 374);
				MAF.mediaplayer.setChannelByNumber(data.channel.logicalPosition);
				var currentPercentage = ((moment() - moment(data.start)) / (moment(data.end) - moment(data.start)));
				this.ProgressIndicator.setStyle("width", (811 * currentPercentage));
				this.Title.setText(data.video.title);			
				this.StartEnd.setText(moment(data.start).format("HH:mm") + " - " + moment(data.end).format("HH:mm"));				
				this.OkView.setText($_('MainScreen_Asset_Focus_OkView'));

				var logoUrl = ChannelHelpers.getChannelLogoMedium(data.channel.logicalPosition);
				if(logoUrl!=="")
				{
					this.Channel.setSource(logoUrl);
					this.Channel.show();
				}

				var view = this;
				this.stopProgressInterval();
				this.timerId = setInterval(function() {
					if(view.displayData!==null)
					{
						var currentPercentage = ((moment() - moment(view.displayData.start)) / (moment(view.displayData.end) - moment(view.displayData.start)));
						view.ProgressIndicator.setStyle("width", (811 * currentPercentage));
					}
				}, Config.common.progressBarUpdateFreq);
			}
		}
		else
		{
			this.displayData = null;
			this.Title.setText('');	
			this.StartEnd.setText('');	
			this.OkView.setText('');
			this.ProgressIndicator.setStyle("width", 0);
			this.stopProgressInterval();
		}
	},

	stopProgressInterval: function() {
		if(this.timerId)	{
			clearInterval(this.timerId);
			this.timerId = null;
		}
	},

	suicide: function () {
		this.parent();
		MAF.mediaplayer.control.stop();
		this.stopProgressInterval();
	}
});