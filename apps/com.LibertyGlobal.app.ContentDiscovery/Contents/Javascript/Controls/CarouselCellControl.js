
var CarouselCellControl = new MAF.Class({
	ClassName: 'CarouselCellControl',

	Extends: MAF.element.Container,

	config: {
		focus: true,
		animation: true
	},

	getWidth: function() {
		return this.getCellDimensions().width || this.element.width;
	},

	getHeight: function() {
		return this.getCellDimensions().height || this.element.height;
	},

	getOuterWidth: function() {
		return this.width + (this.element.hOffset || 0);
	},

	getOuterHeight: function() {
		return this.height + (this.element.vOffset || 0);
	},

	getId: function() {
		return this.element.getAttribute('id');
	},

	setId: function(id) {
		return this.element.setAttribute('id', id);
	},

    getDisabled: function() {
		return this.element && this.element.disabled;
	},

	setDisabled: function(disabled) {
		disabled = disabled || false;
		if (this.disabled !== disabled && this.element) {
			this.fire(disabled ? 'onDisable' : 'onEnable');
			this.element.disabled = disabled;
			this.fire('onChangeDisabled', {
				disabled: disabled
			});
		}
	},

	/**
	 * @method LGI.element.CarouselCellControl#getCellDimensions
	 * @return {Object} With the width and height of the cells for the grid.
	 */
	getCellDimensions: function () {
		return this.grid && this.grid.getCellDimensions() || {};
	},

	/**
	 * @method LGI.element.CarouselCellControl#getCellDataItem
	 * @return {Mixed} Returns a dataset item.
	 */
	getCellDataItem: function () {
		return this.grid && this.grid.getCellDataItem(this);
	},

	getCellDataIndex: function(){
		return this.grid && this.grid.getCellDataIndex(this);
	},

	suicide: function () {
		delete this.grid;
		Object.forEach(this, function (key, obj) {
			if (key !== 'owner' && typeOf(obj) === 'instance' && obj.suicide && obj !== this) {
				delete this[key];
				obj.suicide();
			}
		}, this);
		this.parent();
	}
});