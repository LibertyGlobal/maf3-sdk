var ButtonControl = new MAF.Class({
	ClassName: 'ButtonControl',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event, payload) {
			this.parent(event, payload);
			switch (event.type) {
				case 'focus':
					this.buttonImage.setSource("Images/button_focus.png");
					this.buttonText.setStyles({
						color: '#706abf'
					});			
					break;
				case 'blur':
					this.buttonImage.setSource("Images/button.png");	
					this.buttonText.setStyles({
						color: '#c0bcc5'
					});	
					break;
			}
		},
		createContent: function() {	
			this.buttonImage = new MAF.element.Image({
				source: 'Images/button.png',
				styles: {
					width: 379,
					heigth: 66
				}
			}).appendTo(this);
			
			this.buttonText  = new MAF.element.Text({
				text: this.config.buttonText,
				theme: false,
				anchorStyle: 'center',
				styles: {	
					color: '#c0bcc5',
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

	setButtonText: function(text)
	{
		this.buttonText.setText(text);
		this.config.buttonText = text;
	},

	suicide: function() {
		delete this.buttonText;
		delete this.buttonImage;
		this.parent();
	}
});