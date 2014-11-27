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
					width: 'inherit' - 150,
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
					width: 'inherit' - 150,
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
		if (ProfileHandler.isProfileSet()) {
			view.fire('onWelcomeClosed', {});
		} else {
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
		this.onProfileLoaded.subscribeTo(MAF.application, 'onLoadProfile', this);
		this.onProfileUnloaded.subscribeTo(MAF.application, 'onUnloadProfile', this);
		this.createContent();
	},

	bindData: function() {},

	setFocus: function() {
		this.closeButton.focus();
	},

	suicide: function() {
		this.parent();
		this.onProfileLoaded.unsubscribeFrom(MAF.application, 'onLoadProfile');
		this.onProfileUnloaded.unsubscribeFrom(MAF.application, 'onUnloadProfile');
		delete this.Title;
		delete this.MenuItemsTitle;
		delete view.setProfileButton;
		delete this.closeButton;
	}
});