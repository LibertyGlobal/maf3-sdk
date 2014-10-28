var ButtonControl = new MAF.Class({
	ClassName: 'ButtonControl',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event, payload) {
			this.parent(event, payload);
			switch (event.type) {
				case 'focus':
					this.buttonImage.setSource("Images/button_focus.png");
					break;
				case 'blur':
					this.buttonImage.setSource("Images/button.png");
					break;
				case 'navigate':
					this.fire('onButtonNavigate', { direction: event.detail.direction });
					event.preventDefault();
					event.stopPropagation();
					break;
				case "select":
					this.fire('onButtonSelect');
					event.preventDefault();
					event.stopPropagation();
				break;
			}
		},
		createContent: function() {	
			this.buttonImage = new MAF.element.Image({
				source: 'Images/button.png',
				styles: {
					width: 379,
					height: 78
				}
			}).appendTo(this);
			
			this.buttonText  = new MAF.element.Text({
				text: this.config.buttonText,
				theme: false,
				styles: {
					color: '#706abf',
					fontFamily: 'InterstatePro-Light',
					fontSize: 30,
					hAlign: 'center',
					vAlign: 'center'
				}
			}).appendTo(this);
		}
	},

	config: {
		render: true,
		focus: true,
		buttonText: ""
	},

	initialize: function() {
		this.parent();
		this.config.buttonText = this.config.buttonText;		
		this.createContent();
	},

	setFocus: function() { 
		this.focus();
	},

	suicide: function() {
		this.parent();
	}
});