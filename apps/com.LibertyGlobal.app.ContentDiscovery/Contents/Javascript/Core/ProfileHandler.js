var ProfileHandler = (function() {
	var visibleItemsSetting = "VisibleMenuItems";
	var contentTimeWindowSetting = "ContentTimeWindow";

	return {
		initialize: function()
		{
		},

		getVisibleMenuItems:function()
		{
			var menuItemsVisibleVar = Config.common.menuItemsVisibilityDefault;
			var menuItemsVisible = currentAppData.get(visibleItemsSetting);
			if(menuItemsVisible!==undefined)
			{
				menuItemsVisibleVar = menuItemsVisible;
			}
			return menuItemsVisibleVar;
		},

		getContentTimeWindow:function()
		{
			var contentTimeWindowVar = Config.common.contentTimeWindow;
			var contentTimeWindow = currentAppData.get(contentTimeWindowSetting);
			if(contentTimeWindow!==undefined)
			{
				contentTimeWindowVar = contentTimeWindow;
			}
			return contentTimeWindowVar;
		},

		updateProfileSettings: function(visibleItems, contentTimeWindow)
		{
			currentAppConfig.set(visibleItemsSetting, visibleItems);
			currentAppConfig.set(contentTimeWindowSetting, contentTimeWindow);
		},

		cleanUp: function() {
		}
	};	
})();