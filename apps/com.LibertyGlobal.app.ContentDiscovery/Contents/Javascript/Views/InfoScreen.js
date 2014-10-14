var InfoScreen = new MAF.Class({
	ClassName: 'InfoScreen',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initialize: function () {
		var view = this;
		view.parent();
		this.updateData(view);
	},

	updateData: function(view) {	
		LGI.Guide.Broadcast.create()
		.fields(LGI.Guide.Broadcast.ID, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START, LGI.Guide.Broadcast.END, 
			LGI.Guide.Broadcast.AGE_RATING, LGI.Guide.Broadcast.CAST, LGI.Guide.Broadcast.CHANNEL,
			LGI.Guide.Broadcast.POPULARITY, LGI.Guide.Broadcast.SEASON, LGI.Guide.Broadcast.EPISODE, 
			LGI.Guide.Broadcast.STATISTICS, LGI.Guide.Broadcast.POPULARITY,
			LGI.Guide.Broadcast.SYNOPSIS, LGI.Guide.Broadcast.IMAGE_LINK, LGI.Guide.Broadcast.CATEGORY)
		.filter(LGI.Guide.Broadcast.ID.equalTo(this.persist.assetId))
		.findOne(function(response){ 
			if(response.length>0)
			{
				view.controls.assetDetails.changeData(response[0]);
			}
		});
	},

	// Create your view template
	createView: function () {
		var view = this;		
		view.elements.backgroundImageNormal = new MAF.element.Image({
			source: 'Images/background_main.jpg'
		}).appendTo(view);

		view.controls.sideBarContainer = new SidebarControl({
		}).appendTo(view);

		view.elements.rightContainer = new MAF.element.Container({
			styles: {
				height: 1080,
				width: 1680,
				position: 'relative',
				display: 'inline-block'
			}
		}).appendTo(view);
		
		view.controls.assetDetails = new AssetDetailControl({
			styles:{
				height: 550,
				width: 'inherit',
				vOffset: 80,
				hOffset: 50
			}			
		}).appendTo(this.elements.rightContainer);
	},

	updateView: function () {
		var view = this;
		this.updateData(view);
	},	

	destroyView: function () {
		var view = this;
	}
});