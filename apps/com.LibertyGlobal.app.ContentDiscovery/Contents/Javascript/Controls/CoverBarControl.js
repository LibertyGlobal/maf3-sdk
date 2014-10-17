var CoverBarControl = new MAF.Class({
	ClassName: 'CoverBarControl',

	Extends: MAF.element.Container,

	Protected: {		
		dispatchEvents: function(event){
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
			this.menu1Container = new CoverBarItemFocusControl({
				styles: {
					height: 380,
					width: 214,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.cells.push(this.menu1Container);
			this.menu2Container = new CoverBarItemControl({
				styles: {
					height: 380,
					width: 204,
					hOffset: 40,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.cells.push(this.menu2Container);
			this.menu3Container = new CoverBarItemControl({
				styles: {
					height: 380,
					width: 204,
					hOffset: 80,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.cells.push(this.menu3Container);
			this.menu4Container = new CoverBarItemControl({
				styles: {
					height: 380,
					width: 204,
					hOffset: 120,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.cells.push(this.menu4Container);
			this.menu5Container = new CoverBarItemControl({
				styles: {
					height: 380,
					width: 204,
					hOffset: 160,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.cells.push(this.menu5Container);
			this.menu6Container = new CoverBarItemControl({
				styles: {
					height: 380,
					width: 204,
					hOffset: 200,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.cells.push(this.menu6Container);
			this.menu7Container = new CoverBarItemControl({
				styles: {
					height: 380,
					width: 204,
					hOffset: 240,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this);
			this.cells.push(this.menu7Container);
		},		
		updateCells: function(){	
			for(i =0; i<this.cells.length; i++)
			{
				(i<this.mainCollection.length) ? this.cells[i].changeData(this.mainCollection[i]) : null;
			}
		}
	},

	config: {
		render: true,
		focus: false
	},

	initialize: function(){
		this.parent();
		this.cells = [];
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
		this.menu1Container.focus();
	},

	doNavigate: function(direction){
		if(direction){
			switch(direction){
				case 'left':
					this.mainCollection.unshift(this.mainCollection.pop());
					break;
				case 'right':
					this.mainCollection.push(this.mainCollection.shift());
					break;
				case 'up':
					this.fire("onNavigateUp");
					break;
			}
			this.updateCells();
		}
	},

	suicide: function () {
		delete this.mainCollection;
		delete this.cells;
		this.parent();	
	}
});