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

	initialize: function() {
		this.parent();
		this.createContent();
	},

	bindData: function() {		
	},

	setFocus: function() {
		this.closeButton.focus();
	},

	suicide: function() {
		this.parent();
		delete this.Title;
		delete this.MenuItemsTitle;
		delete this.closeButton;
	}
});