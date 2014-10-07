var MenuCarouselCellControl = new MAF.Class({
	ClassName: 'MenuCarouselCellControl',

	Extends: MAF.element.Container,

	Protected: {	
		generateContents: function (){
			this.MenuText = new MAF.element.Text({
				styles: {
						width: 'inherit',
						color: '#ffffff',
						fontFamily: 'InterstatePro-ExtraLight',
						fontSize: 60,						
						paddingTop: 20
					}
			}).appendTo(this);			
		}		
	},

	config: {
		render: true,
		focus: false
	},

	initialize: function(){
		this.parent();
		this.generateContents();
	},

	changeData: function(data){		
		if(data !== undefined)
		{			
			this.MenuText.setText(data.mainMenuLabel);
		}
		else
		{
			this.MenuText.setText('');	
		}
	},

	suicide: function () {
		this.parent();
	}
});
