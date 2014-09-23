var CarouselControl = new MAF.Class({
	ClassName: 'CarouselControl',

	Extends: MAF.element.Container,

	Protected: {
		generateCells: function (data){
			if(this.currentDataset.length > 0){
				var cell,
					o = this.config.orientation,
					cd = this.getCellDimensions(),
					dims;
				this.offsets = [];
				this.opacityOffsets = [];
				if(this.currentDataset.length === 1){
					dims = {
						width: (o === 'horizontal') ? this.config.itemSize + '%' : '100%',
						height: (o === 'vertical') ? this.config.itemSize + '%' : '100%',
						hOffset: (o === 'horizontal') ? (cd.width * -1) + (cd.width) : 0,
						vOffset: (o === 'vertical') ? (cd.height * -1) + (cd.height) : 0
					};
					cell = this.config.cellCreator.call(this).setStyles(dims);
					cell.setStyle('transform', 'translateZ(0)');
					cell.grid = this;
					cell.appendTo(this);
					cell.setStyle('opacity', 1);
					cell.element.allowNavigation = (this.config.blockFocus) ? false : true;
					this.cells.push(cell);
				}
				else{
					for(var i = 0; i < this.currentDataset.length; i++){
						var itemSize = (i === this.config.focusIndex) ? this.config.focusItemSize : this.config.itemSize;
						//console.log(i + "," + itemSize);
						//console.log((i *((this.config.itemSize/100)*this.height) * -1));
					    //console.log((((this.config.itemSize/100)*this.height) * -1 + ((this.config.focusItemSize/100)*this.height)));
						dims = {							
							width: (o === 'horizontal') ? itemSize + '%' : '100%',
							height: (o === 'vertical') ? itemSize + '%' : '100%',
							hOffset: (o === 'horizontal') ? (((itemSize/100)*this.width) * -1) + ((i<this.config.focusIndex) ? ((i * itemSize)/100)*this.width : ((((i-1) * itemSize) + this.config.focusItemSize)/100)*this.width) : 0,
							vOffset: (o === 'vertical') ? (i *((this.config.itemSize/100)*this.height) + ((i<this.config.focusIndex) ? 0 : (((this.config.itemSize/100)*this.height) * -1 + ((this.config.focusItemSize/100)*this.height)))) : 0
						};

						//console.log("index " + i + " " + dims.width + ", " + dims.height + ", " + dims.vOffset);
						cell = this.config.cellCreator.call(this).setStyles(dims);
						//cell.setStyle('transform', 'translateZ(0)');
						cell.grid = this;
						cell.appendTo(this);
						cell.setStyle('opacity', (i === this.currentDataset.length-1) ? 0 : 1);
						if(Math.abs(this.config.focusIndex - (i+1)) > 0 && this.config.opacityOffset > 0){
							this.opacityOffsets.push(1 - Math.abs(this.config.focusIndex - (i+1)) * this.config.opacityOffset);
							cell.setStyle('opacity', this.opacityOffsets[this.opacityOffsets.length-1]);
							//console.log("opacity: " + this.opacityOffsets[this.opacityOffsets.length-1]);
						}
						else
						{
							this.opacityOffsets.push(1);
						}
						cell.element.allowNavigation = (this.config.blockFocus) ? false : ((i+1) === this.config.focusIndex) ? true : false;
						this.cells.push(cell);
						this.offsets.push((o === 'horizontal') ? dims.hOffset : dims.vOffset);
						//console.log("end index " + i);
					}
				}
			}
			return this.cells.length;
		},
		reOrder: function(data){
			if(this.config.focusIndex > 1){
				for(var i = 0; i < this.config.focusIndex - 1; i++){
					data.unshift(data.pop());
				}
			}
		},
		updateCells: function(data){
			var cellUpdater = this.config.cellUpdater;
			this.animating = false;
			this.buffDataset = [];
			this.currentDataset = [];
			var i = 0;
			if(data.length === undefined){
				data = [data];
			}
			if(data.length > 0){
				for(i = 0; i < data.length; i++){
						this.currentDataset.push(data[i]);
					}
					
				// var tmp = [].concat(data);
				// if(data.length === 1){
				// 	this.currentDataset = [data[0]];
				// }
				// else if(data.length === this.config.visibleCells){
				// 	this.reOrder(tmp);
				// 	var main = [].concat(tmp);
				// 	this.currentDataset.push(tmp.pop());
				// 	for(i = 0; i < this.config.visibleCells; i++){
				// 		this.currentDataset.push(main.shift());
				// 	}
				// 	this.currentDataset.push(tmp.shift());
				// }
				// else if(data.length <= this.config.visibleCells){
				// 	//this.currentDataset.push(tmp.pop());
				// 	for(i = 0; i < data.length; i++){
				// 		this.currentDataset.push(data[i]);
				// 	}
				// 	//this.currentDataset.push(tmp.shift());
				// }
				// // else if(data.length - this.config.visibleCells === 1){
				// // 	this.reOrder(tmp);
				// // 	this.currentDataset.push(tmp[tmp.length-1]);
				// // 	for(i = 0; i < this.config.visibleCells + 1; i++){
				// // 		this.currentDataset.push(tmp[i]);
				// // 	}
				// // 	tmp.pop();
				// // 	this.buffDataset = [].concat(tmp);
				// // }
				// else{
				// 	this.reOrder(tmp);
				// 	this.currentDataset.push(tmp.pop());
				// 	for(i = 0; i < this.config.visibleCells + 1; i++){
				// 		this.currentDataset.push(tmp.shift());
				// 	}
				// 	this.buffDataset = [].concat(tmp);
				// }
			}
			if(this.cells.length && this.cells.length === this.currentDataset.length){
				this.cells.forEach(function(cell, u){
					cellUpdater.call(this, cell, this.currentDataset[u]);
				}, this);
			}
			else{
				while(this.cells.length){
					this.cells.pop().suicide();
				}
				if(this.generateCells() > 0){
					this.cells.forEach(function(cell, u){
						cellUpdater.call(this, cell, this.currentDataset[u]);
					}, this);
				}
			}
			this.fire('onStateUpdated');
		}
	},

	config: {
		visibleCells: 1,
		focusIndex: 1,
		focusItemSize: 0,
		itemSize: 20,
		opacityOffset: 0,
		orientation: 'horizontal',
		blockFocus: false,
		render: true,
		focus: false
	},

	initialize: function(){
		this.config.visibleCells = this.config.visibleCells || 1;
		this.config.focusIndex = this.config.focusIndex || 1;		
		this.config.itemSize = this.config.itemSize || (1 / this.config.visibleCells) * 100;
		this.config.focusItemSize = this.config.focusItemSize || (1 / this.config.visibleCells) * 100;
		this.config.orientation = this.config.orientation || 'horizontal';
		this.config.opacityOffset = this.config.opacityOffset || 0;
		this.config.blockFocus = this.config.blockFocus || false;
		this.config.slideDuration = this.config.slideDuration || 0.1;
		this.mainCollection = [];
		this.parent();
		this.cells = [];
		this.buffDataset = null;
		this.currentDataset = null;
		this.offsets = [];
		this.animating = false;
		this.setStyle('transform', 'translateZ(0)');
	},

	setVisibleCells: function(visibleCells){
		this.config.visibleCells = visibleCells;
	},

	getVisibleCells: function(){
		return this.config.visibleCells;
	},

	setFocusIndex: function(index){
		this.config.focusIndex = index;
	},

	getFocusIndex: function(){
		return (this.cells.length > 1) ? this.config.focusIndex : 0;
	},

	changeDataset: function(data){
		this.mainCollection = [].concat(data);
		this.updateCells(data);
		this.fire("onDatasetChanged");
	},

	getCellDataItem: function(c){
		for(var i = 0; i < this.cells.length; i++){
			if(c === this.cells[i]){
				return this.currentDataset[i];
			}
		}
	},

	/**
	 * @method LGI.element.CarouselControl#getCurrentPage
	 * @return The zero-based index of the current page of data.
	 */
	getCurrentPage: function(){
		for(var i = 0; i < this.mainCollection.length; i++){
			if(this.getCurrentCell().getCellDataItem() === this.mainCollection[i]){
				return i;
			}
		}
	},

	/**
	 * @method LGI.element.CarouselControl#getPageCount
	 * @return this.mainCollection.length. The number of items in the dataset.
	 */
	getPageCount: function(){
		return this.mainCollection.length;
	},

	/**
	 * Method for focussing a specific cell or dataitem in your grid.
	 * @method LGI.element.CarouselControl#focucCell
	 * @param {integer} or {Object} which as to be focused and aligned with the proper focusIndex cell.
	 */
	focusCell: function(target){
		var data = [].concat(this.mainCollection),
			index = 0;
		if(isNaN(target)){
			for(var i = 0; i < data.length; i++){
				if(target === data[i]){
					index = i;
					break;
				}
			}
		}
		var tmp = data.splice(0, index);
		data = data.concat(tmp);
		this.updateCells(data);
	},

	/**
	 * Attach a accessory component to this component so it can update on grid events.
	 * @method LGI.element.CarouselControl#attachAccessory
	 * @param {Class} accessory The accessory component.
	 * @return This component.
	 */
	attachAccessory: function (accessory) {
		if (accessory && accessory.attachToSource) {
			accessory.attachToSource(this);
		}
		return this;
	},

	/**
	 * Attach multiple accessory components to this component.
	 * @method LGI.element.CarouselControl#attachAccessories
	 * @param {Array} arguments Contains muliple accessory components.
	 * @return This component.
	 */
	attachAccessories: function () {
		Array.slice(arguments).forEach(this.attachAccessory, this);
		return this;
	},

	/**
	 * Method for animating your CarouselControl with a different component.
	 * @method LGI.element.CarouselControl#shift
	 * @param {String} the direction the carousel has to slide.
	 */
	shift: function(direction){
		console.log("shift " + direction + this.animating);
		if(this.config.orientation === 'vertical' && (direction === 'right' || direction === 'left')){
			return;
		}
		if(this.config.orientation === 'horizontal' && (direction === 'up' || direction === 'down')){
			return;
		}
		if(direction && !this.animating){
			this.animating = true;
			if(this.cells.length === 1){
				return;
			}
			switch(direction){
				case 'up':
				//case 'left':
					if(this.cells.length > 1){
						this.cells.unshift(this.cells.pop());
						this.buffDataset.unshift(this.currentDataset.pop());
						this.currentDataset.unshift(this.buffDataset.pop());
						this.config.cellUpdater.call(this, this.cells[0], this.currentDataset[0]);
					}
					break;
				case 'down':
				//case 'right':
					if(this.cells.length > 1){
						this.cells.push(this.cells.shift());
						this.buffDataset.push(this.currentDataset.shift());
						this.currentDataset.push(this.buffDataset.shift());
						this.config.cellUpdater.call(this, this.cells[this.cells.length-1], this.currentDataset[this.currentDataset.length-1]);
					}
					break;
			}
			this.animateCells(this.cells, direction, this);
			this.fire('onStateUpdated');
		}
	},

	/**
	 * @method LGI.element.CarouselControl#getCellDimensions
	 * @return {Object} With the width and height of the cells for the grid.
	 */
	getCellDimensions: function () {
		return {
			width: (this.config.orientation === 'horizontal') ? ((this.config.itemSize/100) * this.width) : this.width,
			height: (this.config.orientation === 'vertical') ? ((this.config.itemSize/100) * this.height) : this.height
		};
	},

	/**
	 * @method LGI.element.CarouselControl#getCellDataIndex
	 * @return {Object} returns the dataIndex
	 */
	getCellDataIndex: function(cell){
		if(cell === this.getCurrentCell()){
			return this.getCurrentPage();
		}
		else{
			for(var i = 0; i < this.mainCollection.length; i++){
				if(cell.getCellDataItem() === this.mainCollection[i]){
					return i;
				}
			}
		}
	},

	getCurrentCell : function(){
		//console.log("getCurrentCell");
		return this.cells[(this.cells.length === 1 ) ? 0 : this.config.focusIndex];
	},

	doNavigate : function(direction){
		this.shift(direction);
	},

	animateCells : function(cells, dir, parent)
	{
		if(cells){
			cells.forEach(function(cell, i){
				var small = (parent.currentDataset.length - 2) < parent.config.visibleCells,
				smallAmount = i === cells.length-1;
				if(cell){
					//console.log("opacity:" + i + ", " + small + ", " + smallAmount + ", " + parent.opacityOffsets[i] + ", " + parent.currentDataset[i].title);
					//console.log(((dir === 'right' || dir === 'down') && smallAmount) ? 0 : ((dir === 'left' || dir === 'up') && small && smallAmount) ? 0 :  parent.opacityOffsets[i]);
					cell.animate({
						opacity: ((dir === 'right' || dir === 'down') && smallAmount) ? 0 : ((dir === 'left' || dir === 'up') && small && smallAmount) ? 0 :  parent.opacityOffsets[i],
						duration: 0.1,
						events:{
							onAnimationEnded: function(){
								if(cell){
									cell.animate({
										hOffset: (parent.config.orientation === 'horizontal') ? parent.offsets[i] : 0,
										vOffset: (parent.config.orientation === 'vertical') ? parent.offsets[i] : 0,
										duration: parent.config.slideDuration,
										events:{
											onAnimationEnded: function(){
												parent.animating = false;
												cell.element.allowNavigation = false;
												cell.opacity = (small && smallAmount) ? 0 : parent.opacityOffsets[i];
												if((i+1) === parent.config.focusIndex){
													cell.element.allowNavigation = (parent.config.blockFocus) ? false : true;
													if(!parent.config.blockFocus){
														cell.focus();
													}
												}
											}
										}
									});
								}
							}
						}
					});
				}
			}, this);
		}
	},

	suicide: function () {
		this.currentDataset = null;
		this.buffDataset = null;
		this.offsets = null;
		this.opacityOffsets = null;
		this.mainCollection = null;
		delete this.currentDataset;
		delete this.buffDataset;
		delete this.offsets;
		delete this.opacityOffsets;
		delete this.mainCollection;
		if (this.cells) {
			while(this.cells.length) {
				this.cells.pop().suicide();
			}
			delete this.cells;
		}
		if (this.body) {
			this.body.suicide();
			delete this.body;
		}
		this.parent();	
	}
});