var HorizontalMenuButtonControl = new MAF.Class({
	ClassName: 'HorizontalMenuButtonControl',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event, payload) {
			this.parent(event, payload);
			switch (event.type) {
				case 'focus':
					this.buttonText.setStyles({ opacity: 1.0 });
					this.rolloverContainer.setStyles({ 
							borderStyle: 'solid'							 
						});
					break;
				case 'blur':
					this.buttonText.setStyles({ opacity: 0.32 });
					this.rolloverContainer.setStyles({ 
							borderStyle: 'none'							 
						});
					break;
			}
		},
		createContent: function() {	
			this.buttonText  = new MAF.element.Text({
				text: this.config.buttonText,
				styles: {
					width: 261,
					height: 66,
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-Light',
					fontSize: 26,
					hOffset: 20,
					vOffset: 16,
					opacity: 0.32
				}
			}).appendTo(this);

			this.rolloverContainer  = new MAF.element.Container({
				styles:{ 
					width: 261,
					height: 66,
					borderWidth:3,
					borderColor:'#FFFFFF',
					marginTop:3
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