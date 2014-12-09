var MenuHandler = (function() {
	var menuItems = [];

	return {
		initialize: function() {
			this.menuItems = Config.common.createMenu();
		},

		setItemVisibility: function(visibleItems) {
			ConfigurationStorageHandler.updateVisibleMenuItems(visibleItems);
		},

		getVisualMenuItems: function() {
			var visibleMenuItems = [];
			for (var i = 0; i < this.menuItems.length; i++) {
				if (this.menuItems[i].itemType === "category") {
					if (ConfigurationStorageHandler.getVisibleMenuItems().indexOf(this.menuItems[i].itemName) > -1) {
						visibleMenuItems.push(this.menuItems[i]);
					}
				} else {
					visibleMenuItems.push(this.menuItems[i]);
				}
			}
			return visibleMenuItems;
		},

		getCurrentMenuItemConfig: function() {
			var menuItemConfig = [];
			for (var i = 0; i < this.menuItems.length; i++) {
				if (this.menuItems[i].itemType === "category") {
					var selected = false;
					if (ConfigurationStorageHandler.getVisibleMenuItems().indexOf(this.menuItems[i].itemName) > -1) {
						selected = true;
					}
					menuItemConfig.push({
						name: this.menuItems[i].itemName,
						displayName: this.menuItems[i].preferenceLabel,
						selected: selected
					});
				}
			}
			return menuItemConfig;
		},

		cleanUp: function() {
			for (var i = 0; i < this.menuItems.length; i++) {
				this.menuItems[i].cleanUp();
			}
			delete this.menuItems;
		}
	};
})();