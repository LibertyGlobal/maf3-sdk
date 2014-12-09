var ConfigurationStorageHandler = (function() {
	var visibleItemsSettingName = "VisibleMenuItems";
	var contentTimeWindowSettingName = "ContentTimeWindow";
	var appFirstLoadSettingName = "AppFirstLoad";
	var appProfileSetSettingName = "AppProfileSet";
	var remindersStorageSettingName = "AppReminderStorage";

	return {
		initialize: function() {},

		isSelected: function() {
			return (profile.name !== '');
		},

		getAppReminderStorage: function() {
			var reminders = [];
			var remindersFromStorage = currentAppConfig.get(remindersStorageSettingName);			
			if (remindersFromStorage !== undefined) {
				console.log("Get reminders: " + remindersFromStorage.length);
				contentTimeWindowVar = remindersFromStorage;
			}
			return reminders;
		},

		setAppReminderStorage: function(reminders) {
			console.log("Store reminders: " + reminders);
			currentAppData.set(remindersStorageSettingName, reminders);
		},

		isAppFirstLoad: function() {
			var firstLoad = false;
			var isAppFirstLoad = currentAppConfig.get(appFirstLoadSettingName) || "true";
			if(isAppFirstLoad === "true")
			{
				firstLoad = true;
				currentAppConfig.set(appFirstLoadSettingName, "false");
			}
			return firstLoad;
		},

		isAppProfileSet: function() {
			return (currentAppConfig.get(appProfileSetSettingName) === "true");
		},

		isProfileSet: function() {
			var menuItemsVisible = currentAppData.get(visibleItemsSettingName);
			var contentTimeWindow = currentAppData.get(contentTimeWindowSettingName);
			return (menuItemsVisible !== undefined && contentTimeWindow !== undefined);
		},

		getVisibleMenuItems: function() {
			var menuItemsVisibleVar = Config.common.menuItemsVisibilityDefault;
			var menuItemsVisible = currentAppData.get(visibleItemsSettingName);
			if (menuItemsVisible !== undefined) {
				menuItemsVisibleVar = menuItemsVisible;
			}
			return menuItemsVisibleVar;
		},

		updateVisibleMenuItems: function(visibleItems) {
			currentAppData.set(visibleItemsSettingName, visibleItems);
			currentAppConfig.set(appProfileSetSettingName, "true");
		},

		getContentTimeWindow: function() {
			var contentTimeWindowVar = Config.common.contentTimeWindow;
			var contentTimeWindow = currentAppData.get(contentTimeWindowSettingName);
			if (contentTimeWindow !== undefined) {
				contentTimeWindowVar = contentTimeWindow;
			}
			return contentTimeWindowVar;
		},

		updateContentTimeWindow: function(contentTimeWindow) {
			currentAppData.set(contentTimeWindowSettingName, contentTimeWindow);
			currentAppConfig.set(appProfileSetSettingName, "true");
		},

		cleanUp: function() {}
	};
})();