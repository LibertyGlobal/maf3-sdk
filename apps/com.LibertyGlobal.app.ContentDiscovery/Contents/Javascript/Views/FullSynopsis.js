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
			LGI.Guide.Broadcast.STATISTICS, LGI.Guide.Broadcast.POPULARITY, 'video.year',
			LGI.Guide.Broadcast.SYNOPSIS, LGI.Guide.Broadcast.IMAGE_LINK, LGI.Guide.Broadcast.CATEGORY)
		.filter(LGI.Guide.Broadcast.ID.equalTo(this.persist.assetId))
		.findOne(function(response){ 
			if(response.length>0)
			{
				view.controls.assetDetails.changeData(response[0]);
				view.elements.synopsisText.setText("The story opens on the Planet Krypton, wherein Lara Lor-Van (Ayelet Zurer), has just given birth to a son. She and her husband Jor-El (Russell Crowe) have birthed their son naturally and in violation of the basic laws of the planet, where babies are to be bred through genetic engineering with a planetary 'Codex' that imprints what a person's place in life is to be (leader, scientist, general, etc). Jor-El and his wife have chosen this path as their planet is on the brink of destruction. Harvesting their planet's core for resources has made it unstable and it will destroy itself. After the birth of his son, Jor-El appears before the Kryptonian Leaders, pleading with them to allow him to save the planet's Codex, and to search for a habitable world beyond Krypton. However, even with destruction imminent, the council will not abandon its ways. The council is set upon by General Zod (Michael Shannon) and numerous followers, intending to take control of the planet. Though Jor-El does disagree with Council, he refuses to join Zod's coup. Zod orders Jor-El to be arrested, but Jor-El escapes and flees to an area nearby, wherein the planet's birthing chamber resides. Right before he leaves, he tells Lara to prepare the small spacecraft he has built to transport his son from Krypton and to find a suitable world to send him to. Stealing the Codex from the chamber, Jor-El races back to his home where his wife Lara has found a planet to send their baby to: Earth. Though Lara is sad at the loss of their child, Jor-El claims he will live his life in a new way: free of the limitations imposed by Kryptonian society. Their son, Kal-El, will be able to choose his way in life. Lara worries about their son's ability to survive on his new planet; Jor-El assures her he will be stronger, faster, invulnerable and possess powers that will make him a super-being there because of Earth's yellow sun. Jor-El places the Codex into a device that bonds it to his son's living cells.Though Jor-El does disagree with Council, he refuses to join Zod's coup. Zod orders Jor-El to be arrested, but Jor-El escapes and flees to an area nearby, wherein the planet's birthing chamber resides. Right before he leaves, he tells Lara to prepare the small spacecraft he has built to transport his son from Krypton and to find a suitable world to send him to. Stealing the Codex from the chamber, Jor-El races back to his home where his wife Lara has found a planet to send their baby to: Earth. Though Lara is sad at the loss of their child, Jor-El claims he will live his life in a new way: free of the limitations imposed by Kryptonian society. Their son, Kal-El, will be able to choose his way in life. Lara worries about their son's ability to survive on his new planet; Jor-El assures her he will be stronger, faster, invulnerable and possess powers that will make him a super-being there because of Earth's yellow sun. Jor-El places the Codex into a device that bonds it to his son's living cells.");
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
			buttonText: $_('Back_Button_Text'),
			styles:{
				vOffset: 915,
				hOffset: 340,
				width: 379,
				height: 78				
			},
			events: {
				onButtonNavigate: function(eventData) {
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
				onButtonSelect: function() {
					MAF.application.loadView('view-MainScreen');
				}
			}		
		}).appendTo(this.elements.rightContainer);
		view.controls.backButton.focus();
	},

	updateView: function () {
		var view = this;
		view.controls.assetDetails.clearData();
		this.updateData(view);
	},	

	destroyView: function () {
		delete view.controls.assetDetails;
		delete view.elements.synopsisText;
	}
});