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

		updateVisibleMenuItems: function(visibleItems)
		{
			currentAppConfig.set(visibleItemsSetting, visibleItems);
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

		updateContentTimeWindow: function(contentTimeWindow)
		{
			currentAppConfig.set(contentTimeWindowSetting, contentTimeWindow);
		},

		cleanUp: function() {
		}
	};	
})();