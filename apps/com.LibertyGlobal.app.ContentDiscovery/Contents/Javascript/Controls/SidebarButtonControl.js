var SidebarButtonControl = new MAF.Class({
	ClassName: 'SidebarButtonControl',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event, payload) {
			this.parent(event, payload);
			switch (event.type) {
				case 'focus':
					this.buttonText.setStyles({ opacity: 1.0 });
					this.buttonRollover.show();
					break;
				case 'blur':
					this.buttonText.setStyles({ opacity: 0.32 });
					this.buttonRollover.hide();
					break;
			}
		},
		createContent: function() {	
			this.buttonRollover  = new MAF.element.Image({
				source: 'Images/sidebar_button_high_expanded.png',
				styles:{ 
					position:'relative',
					visibility: 'hidden'
				}
			}).appendTo(this);	

			this.buttonText  = new MAF.element.Text({
				text: this.config.buttonText,
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-Light',
					fontSize: 32,
					hOffset: 22,
					vOffset: 19,
					opacity: 0.32
				}
			}).appendTo(this);				
		}
	},

	config: {
		render: true,
		focus: true,
		buttonText: 'Button text'
	},

	initialize: function() {
		this.parent();
		this.config.buttonText = this.config.buttonText || 'Button text';		
		this.createContent();
		this.buttonRollover.hide();
	},

	clearFocus: function() {
		this.buttonRollover.hide();
	},

	setFocus: function() { 
		this.focus();
	},

	suicide: function() {		
		delete this.buttonRollover;
		delete this.buttonText;
		this.parent();
	}
});