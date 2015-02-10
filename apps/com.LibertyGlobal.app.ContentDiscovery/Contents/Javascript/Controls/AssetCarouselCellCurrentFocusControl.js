var AssetCarouselCellCurrentFocusControl = new MAF.Class({
	ClassName: 'AssetCarouselCellCurrentFocusControl',

	Extends: MAF.element.Container,

	Protected: {
		generateContents: function() {
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

			this.ExpiredImage = new MAF.element.Image({
				source: 'Images/asset_background_current_focus_expired.png',
				styles: {
					vOffset: 0,
					hOffset: 0,
					width: 836,
					height: 374
				}
			}).appendTo(this);
			this.ExpiredImage.hide();

			this.ExpiredText = new MAF.element.Text({
				text: $_('MainScreen_Asset_Focus_Asset_Ended_Text'),
				anchorStyle: 'center',
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 38,
					vOffset: 160,
					hOffset: 0,
					width: 836,
					heigh: 374
				}
			}).appendTo(this);
			this.ExpiredText.hide();
		}
	},

	config: {
		render: true,
		focus: true
	},

	initialize: function() {
		this.parent();
		this.generateContents();
		this.displayData = null;
		MAF.mediaplayer.init();
	},

	changeData: function(data) {
		var view = this;
		if (data !== null) {
			this.displayData = data;
			if (data.video !== null) {
				MAF.mediaplayer.setViewportBounds(254, 301, 836, 374);
				MAF.mediaplayer.setChannelByNumber(data.channel.logicalPosition);
				
				this.Title.setText(data.video.title);
				this.StartEnd.setText(moment(data.start).format("HH:mm") + " - " + moment(data.end).format("HH:mm"));
				this.OkView.setText($_('MainScreen_Asset_Focus_OkView'));

				var logoUrl = InitializationHandler.getChannelLogoMedium(data.channel.logicalPosition);
				if (logoUrl !== "") {
					this.Channel.setSource(logoUrl);
					this.Channel.show();
				}

				this.updateProgress(view);
				this.stopProgressInterval();
				this.timerId = setInterval(function() {
					view.updateProgress(view);
				}, Config.get('progressBarUpdateFreq'));
			}
		} else {
			this.displayData = null;
			this.Title.setText('');
			this.StartEnd.setText('');
			this.OkView.setText('');
			this.ProgressIndicator.setStyle("width", 0);
			this.stopProgressInterval();
		}
	},

	updateVideo: function() {
		MAF.mediaplayer.setViewportBounds(254, 301, 836, 374);
	},

	updateProgress: function(view) {
		if (view.displayData !== null) {
			var currentPercentage = ((moment() - moment(view.displayData.start)) / (moment(view.displayData.end) - moment(view.displayData.start)));
			if (currentPercentage <= 1) {
				view.ProgressIndicator.setStyle("width", (811 * currentPercentage));
				view.ExpiredImage.hide();
				view.ExpiredText.hide();
			} else {
				view.ProgressIndicator.setStyle("width", 811);
				view.ExpiredImage.show();
				view.ExpiredText.show();
			}
		}
	},

	stopProgressInterval: function() {
		if (this.timerId) {
			clearInterval(this.timerId);
			this.timerId = null;
		}
	},

	suicide: function() {
		this.stopProgressInterval();
		delete this.displayData;
		delete this.BackgroundImage;
		delete this.Title;
		delete this.InfoImage;
		delete this.StartEnd;
		delete this.OkView;
		delete this.Channel;
		delete this.ProgressContainer;
		delete this.ProgressIndicator;
		delete this.ExpiredImage;
		delete this.ExpiredText;
		this.parent();
	}
});