var ProfileHandler = (function() {
	var visibleItemsSetting = "VisibleMenuItems";
	var contentTimeWindowSetting = "ContentTimeWindow";
	var appFirstLoad = "AppFirstLoad";
	var appProfileSet = "AppProfileSet";

	return {
		initialize: function() {},

		isSelected: function() {
			return (profile.name !== '');
		},

		isAppFirstLoad: function() {
			var firstLoad = false;
			var isAppFirstLoad = currentAppConfig.get(appFirstLoad) || "true";
			if(isAppFirstLoad === "true")
			{
				firstLoad = true;
				currentAppConfig.set(appFirstLoad, "false");
			}
			return firstLoad;
		},

		isAppProfileSet: function() {
			return (currentAppConfig.get(appProfileSet) === "true");
		},

		isProfileSet: function() {
			var menuItemsVisible = currentAppData.get(visibleItemsSetting);
			var contentTimeWindow = currentAppData.get(contentTimeWindowSetting);
			return (menuItemsVisible !== undefined && contentTimeWindow !== undefined);
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
			currentAppConfig.set(appProfileSet, "true");
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
			currentAppConfig.set(appProfileSet, "true");
		},

		cleanUp: function() {}
	};
})();