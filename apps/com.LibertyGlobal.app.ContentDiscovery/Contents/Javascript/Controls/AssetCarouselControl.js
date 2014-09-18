AssetCarouselControl = new MAF.Class({
	ClassName: 'AssetCarouselControl',

	Extends: MAF.element.Container,

	Protected: {	
		dispatchEvents: function(event){
			console.log("Asset carousel dispatchEvents navigate " + event.type);
			this.parent(event);
			switch(event.type){
				case 'navigate':
					this.fire('onNavigate', event.detail, event);
					break;
			}
		},

		generateCells: function (){
			this.focusContainer = new AssetCarouselCellFocusControl({
					styles: {
						backgroundColor: 'white',
						height: 474,
						width: 843,
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
			console.log("focusIndex: " + this.focusIndex);
			var pos = 0;
			for(var i = this.focusIndex; i<this.mainCollection.length && pos<5; i++)
			{		
				console.log('pos ' + pos + ", i " + i);
				this.cells[pos].changeData(this.mainCollection[i]);
				pos++;
			}
			console.log('pos:' +  pos);
			while(pos<5)
			{
				this.cells[pos].changeData();
				pos++;
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
		console.log('initialize');
		this.onNavigate.subscribeTo(this, 'onNavigate', this);
	},	

	changeDataset: function(data){
		this.focusIndex = 0;
		this.mainCollection = [].concat(data);		
		this.updateCells();
		this.fire("onDatasetChanged");
	},

	shift: function(direction){		
		console.log('direction: ' + direction + ", index: " + this.focusIndex);
		if(direction){
			switch(direction){
				case 'left':
					if(this.focusIndex> 0){
						this.focusIndex--;
						this.updateCells();
					}
					break;
				case 'right':
					if(this.focusIndex +1 < this.mainCollection.length){
						this.focusIndex ++;
						this.updateCells();
					}
					break;
			}
		}
	},

	onNavigate : function(event){
		console.log("navigate: " + event);
		var direction = event.payload.direction;
		// TODO prevent 'left' for sidebar
		if(direction === 'left' || direction === 'right')
			event.preventDefault();

		this.shift(direction);
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