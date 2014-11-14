var ProfileHandler = (function() {
	var visibleItemsSetting = "VisibleMenuItems";
	var contentTimeWindowSetting = "ContentTimeWindow";

	return {
		initialize: function() {},

		isSelected: function() {
			return (profile.name !== '');
		},

		getVisibleMenuItems: function() {
			console.log("getVisibleMenuItems: " + currentAppData.get(visibleItemsSetting));
			var menuItemsVisibleVar = Config.common.menuItemsVisibilityDefault;
			var menuItemsVisible = currentAppData.get(visibleItemsSetting);
			if (menuItemsVisible !== undefined) {
				menuItemsVisibleVar = menuItemsVisible;
			}
			return menuItemsVisibleVar;
		},

		updateVisibleMenuItems: function(visibleItems) {
			console.log("updateVisibleMenuItems: " + visibleItems);
			currentAppData.set(visibleItemsSetting, visibleItems);
		},

		getContentTimeWindow: function() {
			console.log("getContentTimeWindow: " + currentAppData.get(contentTimeWindowSetting));
			var contentTimeWindowVar = Config.common.contentTimeWindow;
			var contentTimeWindow = currentAppData.get(contentTimeWindowSetting);
			if (contentTimeWindow !== undefined) {
				contentTimeWindowVar = contentTimeWindow;
			}
			return contentTimeWindowVar;
		},

		updateContentTimeWindow: function(contentTimeWindow) {
			console.log("updateContentTimeWindow: " + contentTimeWindow);
			currentAppData.set(contentTimeWindowSetting, contentTimeWindow);
		},

		cleanUp: function() {}
	};
})();