var AppInfoPopup = new MAF.Class({
	ClassName: 'AppInfoPopup',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event) {},
		createContent: function() {
			var view = this;
			view.Title = new MAF.element.Text({
				text: $_('AppInfoScreen_Title'),
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
				text: $_('AppInfoScreen_Text'),
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

			view.backButton = new ButtonControl({
				buttonText: $_('AppInfoScreen_Back_Button'),
				styles: {
					vOffset: 756,
					hOffset: 1239,
					width: 379,
					height: 66
				},
				events: {
					onSelect: function() {
						view.fire('onAppInfoClosed', {});
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

	bindData: function() {		
	},

	setFocus: function() {
		this.backButton.focus();
	},

	suicide: function() {		
		delete this.Title;
		delete this.MenuItemsTitle;
		delete this.backButton;
		this.parent();
	}
});