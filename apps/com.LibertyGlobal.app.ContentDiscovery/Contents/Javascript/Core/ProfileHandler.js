var ProfileHandler = (function() {
	var visibleItemsSetting = "VisibleMenuItems";
	var contentTimeWindowSetting = "ContentTimeWindow";

	return {
		initialize: function() {},

		isSelected: function() {
			return (profile.name !== '');
		},

		getVisibleMenuItems: function() {
			var menuItemsVisibleVar = Config.common.menuItemsVisibilityDefault;
			var menuItemsVisible = currentAppData.get(visibleItemsSetting);
			if (menuItemsVisible !== undefined) {
				menuItemsVisibleVar = menuItemsVisible;
			}
			return menuItemsVisibleVar;
		},

		updateVisibleMenuItems: function(visibleItems) {
			currentAppData.set(visibleItemsSetting, visibleItems);
		},

		getContentTimeWindow: function() {
			var contentTimeWindowVar = Config.common.contentTimeWindow;
			var contentTimeWindow = currentAppData.get(contentTimeWindowSetting);
			if (contentTimeWindow !== undefined) {
				contentTimeWindowVar = contentTimeWindow;
			}
			return contentTimeWindowVar;
		},

		updateContentTimeWindow: function(contentTimeWindow) {
			currentAppData.set(contentTimeWindowSetting, contentTimeWindow);
		},

		cleanUp: function() {}
	};
})();