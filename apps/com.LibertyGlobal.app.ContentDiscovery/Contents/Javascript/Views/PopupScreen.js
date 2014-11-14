var PopupScreen = new MAF.Class({
	ClassName: 'PopupScreen',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initialize: function() {
		var view = this;
		view.parent();
	},

	// Create your view template
	createView: function() {
		var view = this;
		view.elements.backgroundImageNormal = new MAF.element.Image({
			source: 'Images/background_main.jpg'
		}).appendTo(view);

		view.controls.sideBarContainer = new SidebarControl({}).appendTo(view);

		view.elements.popup = new MAF.element.Container({
			styles: {
				height: 'inherit',
				width: 'inherit'
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

		view.elements.preferencesPopup = new PreferencesPopup({
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
		view.elements.preferencesPopup.hide();
	},

	updateView: function() {
		var view = this;
		view.showPopup(view, this.persist.popupName, this.persist.redirectPage, this.persist.redirectParams);
	},

	showPopup: function(view, popupName, redirectPage, redirectParams) {
		view.elements.popup.show();
		view.redirectPage = redirectPage;
		view.redirectParams = redirectParams;
		switch (popupName) {
			case "welcome":
				break;
			case "preferences":
				view.elements.preferencesPopup.show();
				view.elements.preferencesPopup.bindData();
				view.elements.preferencesPopup.setFocus();
				break;
			case "facebook":

				break;
			case "twitter":

				break;
		}
	},

	closePopup: function(view) {
		view.elements.preferencesPopup.hide();
		view.elements.popup.hide();

		MAF.application.loadView(view.redirectPage, view.redirectParams);
	},

	destroyView: function() {
		delete this.redirectPage;
		delete this.redirectParams;
	}
});