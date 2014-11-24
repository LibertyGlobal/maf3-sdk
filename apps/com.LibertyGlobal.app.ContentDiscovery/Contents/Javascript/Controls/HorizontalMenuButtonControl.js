var HorizontalMenuButtonControl = new MAF.Class({
	ClassName: 'HorizontalMenuButtonControl',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event, payload) {
			this.parent(event, payload);
			switch (event.type) {
				case 'select':
					if(this.disabled !== true)
					{
						if(this.config.buttonType === "check")
						{
							this.selected = !this.selected;
							this.setImage(this.selected);	
						}	
					}					
					break;
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
					width: this.width,
					height: 66,
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-Light',
					fontSize: 26,
					hOffset: 20,
					vOffset: 18,
					opacity: 0.32
				}
			}).appendTo(this);

			if(this.config.buttonType === "check")
			{
				this.buttonImage = new MAF.element.Image({
					source: "Images/checkbox.png",
					hideWhileLoading: true,
					styles: {
						width: 49,
						height: 49,
						hOffset: 15,
						vOffset: 11
					}
				}).appendTo(this);
				this.buttonText.setStyle("hOffset", 69);
			}

			this.rolloverContainer  = new MAF.element.Container({
				styles:{ 
					width: this.width,
					height: 66,
					borderWidth:3,
					borderColor:'#FFFFFF',
					marginTop:3
				}
			}).appendTo(this);	

			this.setImage = function(selected) {
				this.buttonImage.source = selected ? 'Images/checkbox_selected.png' : 'Images/checkbox.png';
			};
		}
	},

	config: {
		render: true,
		focus: true,
		buttonText: "",
		buttonType: "text"
	},

	initialize: function() {
		this.selected = false;
		this.disabled = false;
		this.parent();
		this.config.buttonText = this.config.buttonText;		
		this.createContent();
	},

	setFocus: function() { 
		this.focus();
	},

	setSelected: function(selected) {
		if(this.disabled !== true)
		{
			this.selected = selected;
			this.setImage(selected);
		}
	},

	isSelected: function() {
		return this.selected;
	},

	setDisabled: function(disabled) {
		this.disabled = disabled;
	},

	updateText: function() {
		this.buttonText.data = this.config.buttonText;
	},

	suicide: function() {
		this.parent();
		delete this.buttonImage;
		delete this.buttonText;
		delete this.rolloverContainer;
	}
});