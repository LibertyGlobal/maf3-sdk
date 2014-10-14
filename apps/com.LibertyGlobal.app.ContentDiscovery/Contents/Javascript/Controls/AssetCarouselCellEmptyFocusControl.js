var AssetCarouselCellEmptyFocusControl = new MAF.Class({
	ClassName: 'AssetCarouselCellEmptyFocusControl',

	Extends: MAF.element.Container,

	Protected: {	
		generateContents: function (){	
			this.futureContainer = new MAF.element.Container({
				styles: {	
					height: 'inherit',
					width: 'inherit',
					padding: 4		
				}
			}).appendTo(this);			
			
			this.Title = new MAF.element.TextField({
				totalLines: 3,
				visibleLines: 3,
				styles: {
					color: '#000000',
					fontFamily: 'InterstatePro-ExtraLight',
					fontSize: 40,
					vOffset: 40,
					hOffset: 35,
					width: 770,
					wrap: true,
					truncation: 'end'
				}
			}).appendTo(this);

			this.SubTitle = new MAF.element.TextField({
				totalLines: 3,
				visibleLines: 3,
				styles: {
					color: '#000000',
					fontFamily: 'InterstatePro-ExtraLight',
					fontSize: 30,
					vOffset: 240,
					hOffset: 40,
					width: 770,
					wrap: true,
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

	changeData: function(emptyType, data){	
		this.Title.setText("");
		this.SubTitle.setText("");	
		switch(emptyType)
		{
			case "empty":
				this.Title.setText($_('MainScreen_Asset_Focus_NoDataTitle', [data, Config.common.contentTimeWindow]));
				this.SubTitle.setText($_('MainScreen_Asset_Focus_NoDataSubTitle'));
			break;
			case "loading":
				this.Title.setText($_('MainScreen_Asset_Focus_LoadingTitle'));
				this.SubTitle.setText($_('MainScreen_Asset_Focus_LoadingSubTitle'));
			break;
		}		
	},

	suicide: function () {
		this.parent();
	}
});