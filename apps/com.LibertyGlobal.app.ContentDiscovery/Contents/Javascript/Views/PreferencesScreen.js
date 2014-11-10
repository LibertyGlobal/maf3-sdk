var PreferencesScreen = new MAF.Class({
	ClassName: 'PreferencesScreen',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event){
		},
		createContent: function() {	
			this.Title = new MAF.element.Text({
				text: $_('PreferencesScreen_Title'),
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 48,
					width: 'inherit' - 150,
					vOffset: 40,
					hOffset: 75
				}
			}).appendTo(this);

			this.MenuItemsTitle = new MAF.element.Text({
				text: $_('PreferencesScreen_MenuItems_Title'),
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 36,
					width: 'inherit' - 150,
					vOffset: 115,
					hOffset: 75
				}
			}).appendTo(this);	

			this.facebookButton = new ButtonControl({
				buttonText: $_('PreferencesScreen_ConnectFacebook_Button'),
				styles:{
					vOffset: 438,
					hOffset: 75,
					width: 379,
					height: 66				
				},
				events: {
					onButtonNavigate: function(eventData) {
						switch(eventData.payload.direction)
						{
							case "left":
							case "right":
							case "up":
							case "down":
							break;
						}
					},
					onButtonSelect: function() {
					}
				}
			}).appendTo(this);

			this.twitterButton = new ButtonControl({
				buttonText: $_('PreferencesScreen_ConnectTwitter_Button'),
				styles:{
					vOffset: 438,
					hOffset: 485,
					width: 379,
					height: 66				
				},
				events: {
					onButtonNavigate: function(eventData) {
						switch(eventData.payload.direction)
						{
							case "left":
							case "right":
							case "up":
							case "down":
							break;
						}
					},
					onButtonSelect: function() {
					}
				}
			}).appendTo(this);

			this.ContentTimeTitle = new MAF.element.Text({
				text: $_('PreferencesScreen_ContentTime_Title'),
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 36,
					width: 'inherit' - 150,
					vOffset: 550,
					hOffset: 75
				}
			}).appendTo(this);	

			this.ContentTimeSubTitle = new MAF.element.Text({
				text: $_('PreferencesScreen_ContentTime_SubTitle'),
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-ExtraLight, sans-serif',
					fontSize: 30,
					width: 'inherit' - 150,
					vOffset: 600,
					hOffset: 75
				}
			}).appendTo(this);	

			this.ContentTimeFooter = new MAF.element.Text({
				text: $_('PreferencesScreen_ContentTime_Footer'),
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-ExtraLight, sans-serif',
					fontSize: 26,
					width: 'inherit' - 150,
					vOffset: 725,
					hOffset: 75
				}
			}).appendTo(this);

			this.doneButton = new ButtonControl({
				buttonText: $_('PreferencesScreen_Close_Button'),
				styles:{
					vOffset: 756,
					hOffset: 1239,
					width: 379,
					height: 66				
				},
				events: {
					onButtonNavigate: function(eventData) {
						switch(eventData.payload.direction)
						{
							case "left":
							case "right":
							case "up":
							case "down":
							break;
						}
					},
					onButtonSelect: function() {
						this.fire('onPreferencesClosed', { });		
					}
				}		
			}).appendTo(this);	
		}
	},

	config: {
		render: true,
		focus: false
	},

	initialize: function() {
		this.parent();
		this.createContent();
	},

	setFocus: function(){

	},

	suicide: function() {
		this.parent();
	}
});