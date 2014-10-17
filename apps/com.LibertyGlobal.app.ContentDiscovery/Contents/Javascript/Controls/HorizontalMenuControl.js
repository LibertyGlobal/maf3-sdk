var HorizontalMenuControl = new MAF.Class({
	ClassName: 'HorizontalMenuControl',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event){
			this.parent(event);
			console.log(event.type);
			switch(event.type)
			{
				case "navigate":
					switch (event.detail.direction) {	
						case 'down':
							this.fire("onNavigateDown");
						break;							
					}
				break;
				case "select":
					console.log(this.focussedButton);
					this.fire('onSelect', { action: this.focussedButton });
				break;
			}
			
		},
		createContent: function() {	
			var horizontalMenuControl = this;						
			this.button1 = new HorizontalMenuButtonControl({
				buttonText: this.config.button1Text,
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
					width: 261,
					height: 72,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);

			this.button2 = new HorizontalMenuButtonControl({
				buttonText: this.config.button2Text,
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
					width: 261,
					height: 72,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);

			this.button3 = new HorizontalMenuButtonControl({
				buttonText: this.config.button3Text,
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
					width: 261,
					height: 72,
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
		button1Visible: true,
		button2Visible: true,
		button3Visible: true,
		button1Text: "",
		button2Text: "",
		button3Text: ""
	},

	initialize: function() {
		this.parent();
		this.setStyles({
			width: 900,
			height:72,
			margin: 0,
			padding: 0,			
		});
		if(this.config.showBackground === true)
		{
			this.setStyle("backgroundImage", "Images/horizontal_menu_background.png");
		}
		this.config.button1Text = this.config.button1Text;	
		this.config.button2Text = this.config.button2Text;	
		this.config.button3Text = this.config.button3Text;	
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

	suicide: function() {
		this.parent();
	}
});