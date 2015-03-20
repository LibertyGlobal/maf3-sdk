var PopupScreen = new MAF.Class({
	ClassName: 'PopupScreen',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initView: function() {
		var view = this;
		view.parent();
	},

	// Create your view template
	createView: function() {
		var view = this;
		view.elements.backgroundImageNormal = new MAF.element.Image({
			source: 'Images/background_main.jpg'
		}).appendTo(view);

		view.elements.popup = new MAF.element.Container({
			styles: {
				height: 'inherit',
				width: 'inherit',
				zOrder: 500
			}
		}).appendTo(view);

		view.elements.fullscreenPopup = new MAF.element.Container({
			styles: {
				height: 'inherit',
				width: 'inherit',
				backgroundColor: "#000000",
				opacity: 0.5
			}
		}).appendTo(view.elements.popup);
		view.elements.fullscreenPopupBackground = new MAF.element.Container({
			styles: {
				hOffset: 122,
				vOffset: 108,
				width: 1676,
				height: 863,
				backgroundImage: 'Images/background_popup.jpg'
			}
		}).appendTo(view.elements.popup);

		preferencesPopup = new PreferencesPopup({
			styles: {
				height: 'inherit',
				width: 'inherit'
			},
			events: {
				onPreferencesClosed: function() {
					view.closePopup(view);
				}
			}
		}).appendTo(view.elements.fullscreenPopupBackground);
		preferencesPopup.hide();

		appInfoPopup = new AppInfoPopup({
			styles: {
				height: 'inherit',
				width: 'inherit'
			},
			events: {
				onAppInfoClosed: function() {
					view.closePopup(view);
				}
			}
		}).appendTo(view.elements.fullscreenPopupBackground);
		appInfoPopup.hide();

		welcomePopup = new WelcomePopup({
			styles: {
				height: 'inherit',
				width: 'inherit'
			},
			events: {
				onWelcomeClosed: function() {
					view.closePopup(view);
				}
			}
		}).appendTo(view.elements.fullscreenPopupBackground);
		welcomePopup.hide();
	},

	updateView: function() {
		var view = this;	
		sideBarContainer.moveTo(this);
		sideBarContainer.collapse();	
		preferencesPopup.moveTo(this.elements.fullscreenPopupBackground);
		welcomePopup.moveTo(this.elements.fullscreenPopupBackground);
		appInfoPopup.moveTo(this.elements.fullscreenPopupBackground);
		view.showPopup(view, this.persist.popupName, this.persist.redirectPage, this.persist.redirectParams);
	},

	showPopup: function(view, popupName, redirectPage, redirectParams) {
		sideBarContainer.updateProfilePicture();
		preferencesPopup.hide();
		appInfoPopup.hide();
		welcomePopup.hide();
		view.elements.popup.show();
		view.redirectPage = redirectPage;
		view.redirectParams = redirectParams;
		switch (popupName) {
			case "preferences":
				preferencesPopup.show();
				preferencesPopup.bindData();
				preferencesPopup.setFocus();
				break;
			case "appInfo":
				appInfoPopup.show();
				appInfoPopup.bindData();
				appInfoPopup.setFocus();
				break;
			case "welcome":
				welcomePopup.show();
				welcomePopup.bindData();
				welcomePopup.setFocus();
				break;
		}
	},

	closePopup: function(view) {
		preferencesPopup.hide();
		view.elements.popup.hide();

		MAF.application.loadView(view.redirectPage, view.redirectParams);
	},

	destroyView: function() {
		var view = this;
		delete view.elements.backgroundImageNormal;
		delete view.elements.popup;
		delete view.elements.fullscreenPopup;
		delete view.elements.fullscreenPopupBackground;
		preferencesPopup = appInfoPopup = welcomePopup = null;
		delete view.redirectPage;
		delete view.redirectParams;
	}
});