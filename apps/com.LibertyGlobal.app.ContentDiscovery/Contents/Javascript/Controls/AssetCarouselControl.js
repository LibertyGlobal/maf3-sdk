var AssetCarouselControl = new MAF.Class({
	ClassName: 'AssetCarouselControl',

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
			this.futureFocusContainer = new AssetCarouselCellFutureFocusControl({
					styles: {
						backgroundImage: 'Images/asset_background_future_focus.png',
						backgroundColor: '#FFFFFF',
						height: 474,
						width: 843,
						padding: 5
					}
				}).appendTo(this);
			this.currentFocusContainer = new AssetCarouselCellCurrentFocusControl({
					styles: {
						height: 498,
						width: 843,
						borderStyle: 'solid',
						borderWidth:4,
						borderColor:'#FFFFFF',
						padding: 0
					}
				}).appendTo(this);
			this.asset1Container = new AssetCarouselCellControl({
					styles: {
						height: 'inherit',
						width: 215,
						vOffset: 45,
						hOffset: 890
					}
				}).appendTo(this);
			this.cells.push(this.asset1Container);
			this.asset2Container = new AssetCarouselCellControl({
					styles: {
						height: 'inherit',
						width: 215,
						vOffset: 45,
						hOffset: 1150
					}
				}).appendTo(this);
			this.cells.push(this.asset2Container);
			this.asset3Container = new AssetCarouselCellControl({
					styles: {
						height: 'inherit',
						width: 215,
						vOffset: 45,
						hOffset: 1410
					}
				}).appendTo(this);
			this.cells.push(this.asset3Container);
			this.asset4Container = new AssetCarouselCellControl({
					styles: {
						height: 'inherit',
						width: 215,
						vOffset: 45,
						hOffset: 1670
					}
				}).appendTo(this);
			this.cells.push(this.asset4Container);
		},	
		displayFocussed: function(focussedData){
			if(moment() > moment(focussedData.start))
			{
				this.futureFocusContainer.hide();
				this.currentFocusContainer.show();
				this.currentFocusContainer.changeData(focussedData);
				this.isLive = true;
				this.fire('onAssetChanged', { isLiveAsset: true });
			}
			else
			{
				this.futureFocusContainer.show();
				this.currentFocusContainer.hide();	
				this.futureFocusContainer.changeData(focussedData);
				this.isLive = false;
				this.fire('onAssetChanged', { isLiveAsset: false });	
			}
		},
		updateCells: function(){
			var pos = 0; // unfocussed cells			
			for(var i = this.focusIndex; i<this.mainCollection.length && pos<4; i++)
			{		
				if(i===this.focusIndex){
					this.displayFocussed(this.mainCollection[i]);
				}
				else
				{
					this.cells[pos].changeData(this.mainCollection[i]);
					pos++;
				}				
			}
			
			// if not all cells filled, start at beginning
			i = 0;
			while(pos<4)
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
		this.isLive = false;
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
		this.parent();	
	}
});