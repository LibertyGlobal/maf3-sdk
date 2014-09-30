var AssetCarouselControl = new MAF.Class({
	ClassName: 'AssetCarouselControl',

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
			this.focusContainer = new AssetCarouselCellFocusControl({
					styles: {
						backgroundImage: 'Images/asset_background_focus.png',
						height: 474,
						width: 843,
						padding: 5,
						position: 'relative',
						display: 'inline-block'
					}
				}).appendTo(this);
			this.cells.push(this.focusContainer);
			this.asset1Container = new AssetCarouselCellControl({
					styles: {
						height: 425,
						width: 215,
						hOffset: 45,
						position: 'relative',
						display: 'inline-block'
					}
				}).appendTo(this);
			this.cells.push(this.asset1Container);
			this.asset2Container = new AssetCarouselCellControl({
					styles: {
						height: 425,
						width: 215,
						hOffset: 90,
						position: 'relative',
						display: 'inline-block'
					}
				}).appendTo(this);
			this.cells.push(this.asset2Container);
			this.asset3Container = new AssetCarouselCellControl({
					styles: {
						height: 425,
						width: 215,
						hOffset: 135,
						position: 'relative',
						display: 'inline-block'
					}
				}).appendTo(this);
			this.cells.push(this.asset3Container);
			this.asset4Container = new AssetCarouselCellControl({
					styles: {
						height: 425,
						width: 215,
						hOffset: 180,
						position: 'relative',
						display: 'inline-block'
					}
				}).appendTo(this);
			this.cells.push(this.asset4Container);
		},		
		updateCells: function(){
			//console.log("focusIndex: " + this.focusIndex);
			var pos = 0;
			for(var i = this.focusIndex; i<this.mainCollection.length && pos<5; i++)
			{		
				//console.log('pos ' + pos + ", i " + i);
				this.cells[pos].changeData(this.mainCollection[i]);
				pos++;
			}
			//console.log('pos:' +  pos);
			i = 0;
			while(pos<5)
			{
				this.cells[pos].changeData(this.mainCollection[i]);
				pos++;
				i++;
			}
		}
	},

	config: {
		render: true,
		focus: true
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
		this.focus();
	},

	disable: function() {
		this.setStyles({
			opacity: 0.3
		});
	},

	enable: function() {
		this.setStyles({
			opacity: 1
		});
	},

	doNavigate: function(direction){		
		var handled = true;
		if(direction){
			switch(direction){
				case 'left':
					this.fire('onNavigateLeft');
					break;
				case 'right':
					if(this.focusIndex +1 < this.mainCollection.length)
						this.focusIndex ++;
					else
						this.focusIndex = 0;

					this.updateCells();
					break;
				case 'up':
					this.fire('onNavigateUp');
					break;
				case 'down':
					this.fire('onNavigateDown');
					break;
				default:
					handled = false;
					break;
			}
		}
		return handled;
	},

	suicide: function () {
		this.mainCollection = null;
		this.cells = null;
		delete this.focusContainer;
		delete this.asset1Container;
		delete this.asset2Container;
		delete this.asset3Container;
		delete this.asset4Container;
		this.parent();	
	}
});