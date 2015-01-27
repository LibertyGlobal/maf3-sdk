var WelcomePopup = new MAF.Class({
	ClassName: 'WelcomePopup',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event) {},
		createContent: function() {
			var view = this;
			view.Title = new MAF.element.Text({
				text: $_('WelcomeScreen_Title'),
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 48,
					width: 1520,
					vOffset: 40,
					hOffset: 75
				}
			}).appendTo(view);

			view.MenuItemsTitle = new MAF.element.TextField({
				text: $_('WelcomeScreen_Text'),
				visibleLines: 11,
				totalLines: 11,
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-ExtraLight, sans-serif',
					fontSize: 36,
					width: 1520,
					height: 500,
					vOffset: 115,
					hOffset: 75,
					wrap: true
				}
			}).appendTo(view);

			view.setProfileButton = new ButtonControl({
				buttonText: $_('WelcomeScreen_SetProfile_Button'),
				styles: {
					vOffset: 756,
					hOffset: 849,
					width: 379,
					height: 66
				},
				events: {
					onSelect: function() {
						MAF.HostEventManager.send("changeProfile");
					}
				}
			}).appendTo(this);

			view.closeButton = new ButtonControl({
				buttonText: $_('WelcomeScreen_Skip_Button'),
				styles: {
					vOffset: 756,
					hOffset: 1239,
					width: 379,
					height: 66
				},
				events: {
					onSelect: function() {
						view.fire('onWelcomeClosed', {});
					}
				}
			}).appendTo(this);
		}
	},

	config: {
		render: true,
		focus: false
	},

	onProfileLoaded: function(event) {
		if (ConfigurationStorageHandler.isProfileSet(profile.name)) {
			this.fire('onWelcomeClosed', {});
		} else {
			ConfigurationStorageHandler.createProfile(profile.name);
			MAF.application.loadView('view-PopupScreen', {
				"popupName": "preferences",
				"redirectPage": "view-MainScreen",
				"redirectParams": {
					"returnFromPopup": "preferences"
				}
			});
		}
	},

	onProfileUnloaded: function(event) {
		
	},

	initialize: function() {
		this.parent();
		this.fnOnProfileLoaded = this.onProfileLoaded.subscribeTo(MAF.application, 'onLoadProfile', this);
		this.fnOnProfileUnloaded = this.onProfileUnloaded.subscribeTo(MAF.application, 'onUnloadProfile', this);
		this.createContent();
	},

	bindData: function() {},

	setFocus: function() {
		this.closeButton.focus();
	},

	suicide: function() {		
		this.fnOnProfileLoaded.unsubscribeFrom(MAF.application, 'onLoadProfile');
		this.fnOnProfileLoaded = null;
		this.fnOnProfileUnloaded.unsubscribeFrom(MAF.application, 'onUnloadProfile');
		this.fnOnProfileUnloaded = null;
		delete this.Title;
		delete this.MenuItemsTitle;
		delete this.setProfileButton;
		delete this.closeButton;
		this.parent();
	}
});