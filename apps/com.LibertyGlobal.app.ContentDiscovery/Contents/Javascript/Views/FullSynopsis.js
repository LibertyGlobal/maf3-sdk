var FullSynopsis = new MAF.Class({
	ClassName: 'FullSynopsis',
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
			LGI.Guide.Broadcast.STATISTICS, LGI.Guide.Broadcast.POPULARITY, 'video.year', "video.language", 
			LGI.Guide.Broadcast.SYNOPSIS, LGI.Guide.Broadcast.IMAGE_LINK, LGI.Guide.Broadcast.CATEGORY, "video.subcategory")
		.filter(LGI.Guide.Broadcast.ID.equalTo(this.persist.assetId))
		.findOne(function(response){ 
			if(response.length>0)
			{
				view.controls.assetDetails.changeData(response[0]);
				view.elements.synopsisText.setText(response[0].video.synopsis);
				view.controls.backButton.focus();
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
			showSynopsis: false,
			styles:{
				height: 550,
				width: 'inherit',
				vOffset: 80,
				hOffset: 50
			}			
		}).appendTo(this.elements.rightContainer);
		view.controls.assetDetails.clearData();		

		view.elements.synopsisText = new PageableTextGridControl({
			styles:{
				vOffset: 500,
				hOffset: 340,
				width: 1100,
				height: 400				
			}		
		}).appendTo(this.elements.rightContainer);

		view.controls.backButton = new ButtonControl({
			buttonText: $_('FullSynopsisScreen_Back_Button'),
			styles:{
				vOffset: 915,
				hOffset: 340,
				width: 379,
				height: 66			
			},
			events: {
				onNavigate: function(eventData) {
					switch(eventData.payload.direction)
					{
						case "left":
						case "right":
							view.elements.synopsisText.shiftPage(eventData.payload.direction);
						break;
						case "up":
						case "down":
						break;
					}
				},
				onSelect: function() {
					MAF.application.loadView('view-MainScreen');
				}
			}		
		}).appendTo(this.elements.rightContainer);
		view.controls.backButton.focus();
	},

	updateView: function () {
		var view = this;
		view.elements.synopsisText.setText("");
		view.controls.assetDetails.clearData();
		this.updateData(view);
	},	

	destroyView: function () {
		var view = this;
		delete view.elements.backgroundImageNormal;
		delete view.controls.sideBarContainer;
		delete view.elements.rightContainer;
		delete view.controls.assetDetails;
		delete view.elements.synopsisText;
		delete view.controls.backButton;
	}
});