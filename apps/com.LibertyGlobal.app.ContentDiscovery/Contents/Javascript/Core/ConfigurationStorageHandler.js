var ConfigurationStorageHandler = (function() {
	var visibleItemsSettingName = "VisibleMenuItems";
	var contentTimeWindowSettingName = "ContentTimeWindow";
	var profileImageUrlSettingName = "ProfileImage";
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
				contentTimeWindowVar = remindersFromStorage;
			}
			return reminders;
		},

		setAppReminderStorage: function(reminders) {
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
			screen.log("menu items: " + menuItemsVisible);
			if (menuItemsVisible !== undefined) {
				menuItemsVisibleVar = menuItemsVisible;
			}
			return menuItemsVisibleVar;
		},

		updateVisibleMenuItems: function(visibleItems) {
			screen.log("storing content time: " + visibleItems);
			currentAppData.set(visibleItemsSettingName, visibleItems);
			currentAppConfig.set(appProfileSetSettingName, "true");
		},

		getContentTimeWindow: function() {
			var contentTimeWindowVar = Config.common.contentTimeWindow;
			var contentTimeWindow = currentAppData.get(contentTimeWindowSettingName);
			screen.log("content time: " + contentTimeWindow);
			if (contentTimeWindow !== undefined) {
				contentTimeWindowVar = contentTimeWindow;
			}
			return contentTimeWindowVar;
		},

		updateContentTimeWindow: function(contentTimeWindow) {
			screen.log("storing content time: " + contentTimeWindow);
			currentAppData.set(contentTimeWindowSettingName, contentTimeWindow);
			currentAppConfig.set(appProfileSetSettingName, "true");
		},

		getProfileImage: function() {
			var profileImageVar = 'Images/sidebar_profile_image.png';
			var profileImage = currentAppData.get(profileImageUrlSettingName);
			if (profileImage !== undefined) {
				profileImageVar = profileImage;
			}
			return profileImageVar;
		},

		updateProfileImage: function(url) {
			currentAppData.set(profileImageUrlSettingName, url);
		},

		cleanUp: function() {}
	};
})();