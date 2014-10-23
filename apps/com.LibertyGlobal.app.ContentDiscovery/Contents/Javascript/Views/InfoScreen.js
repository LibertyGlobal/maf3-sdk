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
// { actor: "Gabriel Macht", name: "Harvey Specter", image: "http://ia.media-imdb.com/images/M/MV5BNzA2ODkwMjc3MV5BMl5BanBnXkFtZTcwOTc4ODYwNA@@._V1_SX214_CR0,0,214,317_AL_.jpg" },
// { actor: "Patrick J. Adams", name: "Mike Ross", image: "http://ia.media-imdb.com/images/M/MV5BMjE1MzM2MjI4NF5BMl5BanBnXkFtZTgwNDQ5ODkyMDE@._V1_SY317_CR20,0,214,317_AL_.jpg" },
// { actor: "Rick Hoffman", name: "Louis Litt", image: "http://ia.media-imdb.com/images/M/MV5BMTY2NTUxNjg0M15BMl5BanBnXkFtZTcwNDM2ODg1Ng@@._V1_SY317_CR95,0,214,317_AL_.jpg" },
// { actor: "Meghan Markle", name: "Rachel Zane", image: "http://ia.media-imdb.com/images/M/MV5BMjExNzU3ODY3NF5BMl5BanBnXkFtZTcwMjI0MzM0OA@@._V1_SY317_CR47,0,214,317_AL_.jpg" },
// { actor: "Sarah Rafferty", name: "Donna Paulsen", image: "http://ia.media-imdb.com/images/M/MV5BMjEwOTIzMDM3OV5BMl5BanBnXkFtZTcwNTk3MjMyOQ@@._V1_SY317_CR2,0,214,317_AL_.jpg" },
// { actor: "Gina Torres", name: "Jessica Pearson", image: "http://ia.media-imdb.com/images/M/MV5BNzcwNTc5OTAxMF5BMl5BanBnXkFtZTcwODIyNTI4Nw@@._V1_SY317_CR2,0,214,317_AL_.jpg" },
// { actor: "Amanda Schull", name: "Katrina Bennett", image: "http://ia.media-imdb.com/images/M/MV5BMjI3NDk3NTQ2NV5BMl5BanBnXkFtZTcwNTAyODY4Nw@@._V1_SX214_CR0,0,214,317_AL_.jpg" },
// { actor: "Max Topplin", name: "Harold Jakowski", image: "http://ia.media-imdb.com/images/M/MV5BNTM2NjIyMTk2Nl5BMl5BanBnXkFtZTcwMjY4NDUxNw@@._V1_SX214_CR0,0,214,317_AL_.jpg" },
// { actor: "David Costabile", name: "Daniel Hardman", image: "http://ia.media-imdb.com/images/M/MV5BMTU2NTg3MjE0OV5BMl5BanBnXkFtZTcwNDE4NDE1Mg@@._V1_SY317_CR16,0,214,317_AL_.jpg" },
// { actor: "Abigail Spencer", name: "Dana Scott", image: "http://ia.media-imdb.com/images/M/MV5BMTc1MTUxMDkxNV5BMl5BanBnXkFtZTgwMTUzOTg5MDE@._V1_SY317_CR20,0,214,317_AL_.jpg" }
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
		var view = this;
	}
});