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
						case 'left':
							this.fire("onNavigateRight");
						break;
						case 'right':
							this.fire("onNavigateRight");
						break;	
						case 'down':
							this.fire("onNavigateRight");
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
				buttonText: $_('InfoScreen_Menu_SetReminder'),
				events: {
					onNavigate: function(event){
						switch (event.payload.direction) {
							case 'right':								
								horizontalMenuControl.focussedButton = "edit";
								horizontalMenuControl.button2.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
						}						
					}
				},
				styles: {
					marginBottom: 10,	
					vOffset: 85,				
					hOffset: 100,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this.expandedContainer);

			this.button2 = new HorizontalMenuButtonControl({
				buttonText: $_('InfoScreen_Menu_Share'),
				events: {
					onNavigate: function(event){
						switch (event.payload.direction) {
							case 'left':
								horizontalMenuControl.focussedButton = "switch";
								horizontalMenuControl.button1.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
							case 'right':
								horizontalMenuControl.focussedButton = "fullSynopsis";
								horizontalMenuControl.button3.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
						}						
					}
				},
				styles: {	
					marginBottom: 10,
					vOffset: 85,			
					hOffset: 100,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this.expandedContainer);

			this.button3 = new HorizontalMenuButtonControl({
				buttonText: this.config.button3Text,
				events: {
					onNavigate: function(event){
						switch (event.payload.direction) {
							case 'left':
								horizontalMenuControl.focussedButton = "share";
								horizontalMenuControl.button2.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
							case 'right':
								event.preventDefault();
								event.stopPropagation();
								break;
						}						
					}
				},
				styles: {
					marginBottom: 10,
					vOffset: 85,				
					hOffset: 100,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this.expandedContainer);			
		}
	},

	config: {
		render: true,
		focus: false,
		showBackground: true.
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
		this.config.button1Visible ? this.button1.show() : this.button1.hide();
		this.config.button2Visible ? this.button2.show() : this.button2.hide();
		this.config.button3Visible ? this.button3.show() : this.button3.hide();
		this.createContent();
		this.button1.clearFocus();
		this.button2.clearFocus();
		this.button3.clearFocus();
		this.focussedButton = "switch";
	},	

	setFocus: function() { 
		this.focussedButton = "switch";
		this.button1.setFocus();
	},

	suicide: function() {
		this.parent();
	}
});