var SettingsGridControl = new MAF.Class({
	ClassName: 'SettingsGridControl',
	Extends: MAF.control.Grid,

	Protected: {
	},

	config: {
		rows: 3,
		columns: 3,
		type: 'check' // or radio
	},

	initialize: function() {
		this.config.rows = this.config.rows;
		this.config.columns = this.config.columns;
		this.config.type = this.config.type;
		this.config.cellCreator = this.cellCreator;
		this.config.cellUpdater = this.cellUpdater;
		this.parent();
	},

	cellCreator: function() {
		return new SettingsGridCellControl({
			styles: this.getCellDimensions()
		});
	},

	cellUpdater: function(cell, data) {
		cell.setData(data, this.config.type);
	},

	suicide: function() {
		this.parent();
	}

});