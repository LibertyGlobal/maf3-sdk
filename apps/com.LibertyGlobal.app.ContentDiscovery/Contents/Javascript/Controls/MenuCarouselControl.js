var MenuCarouselControl = new MAF.Class({
	ClassName: 'MenuCarouselControl',

	Extends: MAF.element.Container,

	Protected: {		
		dispatchEvents: function(event){
			console.log("Asset carousel dispatchEvents navigate " + event.type);
			this.parent(event);
			switch(event.type){
				case 'navigate':
					if(event.detail)
					{
						this.doNavigate(event.detail.direction);
					}
					break;
			}
		},

		generateCells: function (){
			this.menu1Container = new MenuCarouselCellControl({
				styles: {
					height: 92,
					width: 'inherit',
					position: 'relative',
					display: 'inline-block',
					opacity: 0.1
				}
			}).appendTo(this);
			this.menu2Container = new MenuCarouselCellControl({
				styles: {
					height: 92,
					width: 'inherit',
					position: 'relative',
					display: 'inline-block',
					opacity: 0.25
				}
			}).appendTo(this);
			this.menu3Container = new MenuCarouselCellControl({
				styles: {
					height: 92,
					width: 'inherit',
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.menu4Container = new MenuCarouselCellControl({
				styles: {
					height: 92,
					width: 'inherit',
					vOffset: 495,
					position: 'relative',
					display: 'inline-block',
					opacity: 0.25					
				}
			}).appendTo(this);
			this.menu5Container = new MenuCarouselCellControl({
				styles: {
					height: 92,
					width: 'inherit',
					vOffset: 495,
					position: 'relative',
					display: 'inline-block',
					opacity: 0.25
				}
			}).appendTo(this);
			this.menu6Container = new MenuCarouselCellControl({
				styles: {
					height: 92,
					width: 'inherit',
					vOffset: 495,
					position: 'relative',
					display: 'inline-block',
					opacity: 0.05
				}
			}).appendTo(this);
		},		
		updateCells: function(){			
			this.menu3Container.changeData(this.mainCollection[0]);
			this.menu4Container.changeData(this.mainCollection[1]);
			this.menu5Container.changeData(this.mainCollection[2]);
			this.menu6Container.changeData(this.mainCollection[3]);
			this.menu1Container.changeData(this.mainCollection[4]);
			this.menu2Container.changeData(this.mainCollection[5]);
			this.fire('onMenuChanged', { selectedMenuItem: this.mainCollection[0] });
		}
	},

	config: {
		render: true,
		focus: false
	},

	initialize: function(){
		this.parent();
		this.generateCells();
		this.mainCollection = [];
		this.focusIndex = 0;
	},	

	changeDataset: function(data){
		this.focusIndex = 0;
		this.mainCollection = [].concat(data);		
		this.updateCells();
	},

	setFocus: function() {
		this.focus();
	},

	disable: function() {
		this.setStyles({
			opacity: 0.3
		});
		this.menu3Container.setStyles({ opacity: 0.3 });
	},

	enable: function() {
		this.setStyles({
			opacity: 1
		});
		this.menu3Container.setStyles({ opacity: 1 });
	},

	doNavigate: function(direction){		
		if(direction){
			switch(direction){
				case 'up':
					this.mainCollection.unshift(this.mainCollection.pop());
					break;
				case 'down':
					this.mainCollection.push(this.mainCollection.shift());
					break;
			}
			this.updateCells();
		}
	},

	suicide: function () {
		this.mainCollection = null;
		this.parent();	
	}
});
