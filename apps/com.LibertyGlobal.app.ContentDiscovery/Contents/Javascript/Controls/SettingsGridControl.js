var SettingsGridControl = new MAF.Class({
	ClassName: 'SettingsGridControl',
	Extends: MAF.control.Grid,

	Protected: {
		dispatchEvents: function(event) {
			this.parent(event);
			switch (event.type) {
				case "navigate":
					var handled = false;
					var coordinates = this.cells[this.getFocusIndex()].getCellCoordinates();
					if (coordinates.row === (coordinates.rows - 1)) {
						if (event.detail.direction === "down") {
							this.fire("onNavigateDownRight");
							handled = true;
						}
						if (coordinates.column === (coordinates.columns - 1)) {
							if (event.detail.direction === "right") {
								this.fire("onNavigateDownRight");
								handled = true;
							}
						}
					}
					if (coordinates.row === 0) {
						if (event.detail.direction === "up") {
							this.fire("onNavigateUpLeft");
							handled = true;
						}
						if (coordinates.column === 0) {
							if (event.detail.direction === "left") {
								this.fire("onNavigateUpLeft");
								handled = true;
							}
						}
					}
					if (handled === true) {
						event.preventDefault();
						event.stopPropagation();
					}
					break;
			}

		}
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