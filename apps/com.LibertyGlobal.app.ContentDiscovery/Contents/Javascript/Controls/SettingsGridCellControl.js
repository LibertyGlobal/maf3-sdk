var SettingsGridCellControl = new MAF.Class({
	ClassName: 'SettingsGridCellControl',

	Extends: MAF.control.GridCell,

	Protected: {
		dispatchEvents: function(event, payload) {
			this.parent(event, payload);
			switch (event.type) {
				case 'select':
						var selected = !(this.getCellDataItem().selected);
						if(this.config.type === "radio")
						{
							for(var i=0; i<this.grid.cells.length; i++)
							{
								this.grid.cells[i].getCellDataItem().selected = false;
								this.grid.cells[i].disable();
							}	
							selected = true;		
						}
						this.getCellDataItem().selected = selected;
						this.setImage(selected);					
					break;
				case 'focus':
					this.highlight.show();
					this.highlight.setStyles({
						vOffset: 3
					});
					break;
				case 'blur':
					this.highlight.hide();
					break;
				default:
					break;
			}
		},

		createContent: function() {
			this.container = new MAF.element.Container({
				styles: {
					width: '100%',
					height: 70
				}
			}).appendTo(this);

			this.image = new MAF.element.Image({
				source: "Images/checkbox.png",
				hideWhileLoading: true,
				styles: {
					width: 45,
					height: 45,
					hOffset: 15,
					vOffset: 15
				}
			}).appendTo(this.container);

			this.label = new MAF.element.Text({
				styles: {
					width: this.width - 60,
					height: this.height,
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-ExtraLight',
					fontSize: 36,
					hOffset: 75,
					vOffset: 15
				}
			}).appendTo(this.container);

			this.highlight = new MAF.element.Container({
				styles: {
					width: this.width - 6,
					height: this.height - 2,
					vOffset: -1000,
					hOffset: 3,
					borderWidth:3,
					borderColor:'#FFFFFF',
					borderStyle: 'solid', 
					margin: 0
				}
			}).appendTo(this.container);

			this.setImage = function(selected) {
				this.image.source = selected ? 'Images/checkbox_selected.png' : 'Images/checkbox.png';
			};		
		} 
	},

	config: {
		type: "check" // or radio
	},

	setData: function(data, type) {	
		this.config.type = type;
		this.label.setText(data.displayName);
		this.setImage(data.selected);
	},

	disable: function()
	{
		this.setImage(false);
	},

	initialize: function() {
		this.parent();
		this.createContent();
	},

	suicide: function() {
		delete this.container;
		delete this.label;
		delete this.image;
		delete this.highlight;
		this.parent();
	}
});