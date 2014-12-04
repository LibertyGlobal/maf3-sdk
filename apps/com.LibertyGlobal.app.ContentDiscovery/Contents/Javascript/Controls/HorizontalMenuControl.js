var HorizontalMenuControl = new MAF.Class({
	ClassName: 'HorizontalMenuControl',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event){
			this.parent(event);
			switch(event.type)
			{
				case "select":
					this.fire('onButtonSelect', { action: this.focussedButton });
				break;
			}
			
		},
		createContent: function() {	
			var horizontalMenuControl = this;						
			this.button1 = new HorizontalMenuButtonControl({
				buttonText: this.config.button1Text,
				buttonType: this.config.button1Type,
				events: {
					onNavigate: function(event){
						switch (event.payload.direction) {
							case 'right':								
								horizontalMenuControl.focussedButton = 2;
								horizontalMenuControl.button2.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
						}						
					}
				},
				styles: {
					margin: 0,
					paddingTop: 3,
					width: this.width / 3,
					height: this.height,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);

			this.button2 = new HorizontalMenuButtonControl({
				buttonText: this.config.button2Text,
				buttonType: this.config.button2Type,
				events: {
					onNavigate: function(event){
						switch (event.payload.direction) {
							case 'left':
								horizontalMenuControl.focussedButton = 1;
								horizontalMenuControl.button1.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
							case 'right':
								horizontalMenuControl.focussedButton = 3;
								horizontalMenuControl.button3.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
						}						
					}
				},
				styles: {	
					margin: 0,
					paddingTop: 3,
					width: this.width / 3,
					height: this.height,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);

			this.button3 = new HorizontalMenuButtonControl({
				buttonText: this.config.button3Text,
				buttonType: this.config.button3Type,
				events: {
					onNavigate: function(event){
						switch (event.payload.direction) {
							case 'left':
								horizontalMenuControl.focussedButton = 2;
								horizontalMenuControl.button2.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
						}						
					}
				},
				styles: {
					margin: 0,
					paddingTop: 3,
					width: this.width / 3,
					height: this.height,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);			
		}
	},

	config: {
		render: true,
		focus: false,
		showBackground: true,
		width: 1000,
		button1Visible: true,
		button2Visible: true,
		button3Visible: true,
		button1Text: "",
		button2Text: "",
		button3Text: "",
		button1Type: "text",
		button2Type: "text",
		button3Type: "text"
	},

	initialize: function() {
		this.parent();
		this.setStyles({
			width: this.config.width,
			height: 72,
			margin: 0,
			padding: 0		
		});
		if(this.config.showBackground === true)
		{
			this.setStyle("backgroundImage", "Images/horizontal_menu_background.png");
		}
		this.config.button1Text = this.config.button1Text;	
		this.config.button2Text = this.config.button2Text;	
		this.config.button3Text = this.config.button3Text;	
		this.config.button1Type = this.config.button1Type;	
		this.config.button2Type = this.config.button2Type;
		this.config.button3Type = this.config.button3Type;
		this.createContent();
		this.config.button1Visible ? this.button1.show() : this.button1.hide();
		this.config.button2Visible ? this.button2.show() : this.button2.hide();
		this.config.button3Visible ? this.button3.show() : this.button3.hide();		
		this.focussedButton = 1;
	},	

	setFocus: function() { 
		this.focussedButton = 1;
		this.button1.setFocus();
	},

	updateButtonText: function() {
		this.button1.config.buttonText = this.config.button1Text;	
		this.button2.config.buttonText = this.config.button2Text;	
		this.button3.config.buttonText = this.config.button3Text;
		this.button1.updateText();
		this.button2.updateText();
		this.button3.updateText();
	},

	getButton: function(buttonNr){
		switch(buttonNr)
		{
			case 1:
				return this.button1;
			case 2:
				return this.button2;
			case 3:
				return this.button3;
		}
		return null;
	},

	suicide: function() {		
		delete this.button1;
		delete this.button2;
		delete this.button3;
		this.parent();
	}
});