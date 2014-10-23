var InfoScreen = new MAF.Class({
	ClassName: 'InfoScreen',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initialize: function () {
		var view = this;
		view.parent();
		this.updateData(view);
		view.casts = [];
		// view.casts = [
		// { actor: "Gabriel Macht", name: "Harvey Specter", image: "https://image.tmdb.org/t/p/w396/15Q2drYXxNIf0Kzy55HQGJsLY7L.jpg" },
		// { actor: "Patrick J. Adams", name: "Mike Ross", image: "https://image.tmdb.org/t/p/w396/sBfavftAvY08ZvUnhDtCjA8XdlY.jpg" },
		// { actor: "Rick Hoffman", name: "Louis Litt", image: "https://image.tmdb.org/t/p/w396/d1B41muPxihy4YXsWRiXKfpzq0y.jpg" },
		// { actor: "Meghan Markle", name: "Rachel Zane", image: "https://image.tmdb.org/t/p/w396/vCYRriV2w19TBoRWn65Bo8vKy0l.jpg" },
		// { actor: "Sarah Rafferty", name: "Donna Paulsen", image: "https://image.tmdb.org/t/p/w396/3rTFrSH0Tt401RjeMijgYcgW1b3.jpg" },
		// { actor: "Gina Torres", name: "Jessica Pearson", image: "https://image.tmdb.org/t/p/w396/z43hy1X1vRD26vNDh0lzxg1rcBl.jpg" },
		// { actor: "Amanda Schull", name: "Katrina Bennett", image: "https://image.tmdb.org/t/p/w396/uVyoAKYP4HzUawgnjOWN3MwDrYK.jpg" },
		// { actor: "Max Topplin", name: "Harold Jakowski", image: "https://image.tmdb.org/t/p/w396/2QoRYXRrVgGphIM6V91VrObQMLF.jpg" },
		// { actor: "David Costabile", name: "Daniel Hardman", image: "https://image.tmdb.org/t/p/w396/j0WailErU7LN1X82zrHgFsp5yOX.jpg" },
		// { actor: "Vanessa Ray", name: "Jenny Griffith", image: "https://image.tmdb.org/t/p/w396/aum4cBjWAcRruNYggXBxari4Gom.jpg" }
		// ];
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
				view.controls.horizontalMenu.show();
				view.controls.horizontalMenu.setFocus();
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
		view.controls.assetDetails.clearData();

		view.controls.horizontalMenu = new HorizontalMenuControl({
			button1Text: $_('InfoScreen_Button_Set_Reminder_Text'),
			button2Text: $_('InfoScreen_Button_Share_Text'),
			button3Text: $_('InfoScreen_Button_Full_Synopsis_Text'),
			styles:{
				height: 72,
				width: 900,
				vOffset: 476,
				hOffset: 340
			},
			events: {
				onNavigateDown: function(){
					if(view.casts.length>0)
					{
						view.controls.coverBar.setFocus();
					}
				}	
			}		
		}).appendTo(this.elements.rightContainer);
		view.controls.horizontalMenu.hide();

		view.elements.coverBarTitle = new MAF.element.Text({
			data: $_('InfoScreen_Cast_Text'),
			styles: {
				color: '#cecece',
				fontFamily: 'InterstatePro-ExtraLight, sans-serif',
				fontSize: 33.3,
				height: 50,
				vOffset: 600,
				hOffset: 50
			}
		}).appendTo(this.elements.rightContainer);
		view.elements.coverBarTitle.hide();

		view.controls.coverBar = new CoverBarControl({
			styles:{
				height: 380,
				width: 'inherit',
				vOffset: 645,
				hOffset: 45
			},
			events: {
				onNavigateUp: function(){
					view.controls.horizontalMenu.setFocus();
				}	
			}
		}).appendTo(this.elements.rightContainer);
		view.controls.coverBar.hide();
	},

	updateView: function () {
		var view = this;
		view.controls.assetDetails.clearData();
		this.updateData(view);
		if(view.casts.length>0)
		{
			view.controls.coverBar.changeDataset(view.casts);
			view.controls.coverBar.show();
			view.elements.coverBarTitle.show();
		}
	},	

	destroyView: function () {
	}
});