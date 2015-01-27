var ConfigurationStorageHandler = (function() {
	var configSettings = null;
	var contentDiscoverySettingsName = "contentDisc";

	return {
		initialize: function() {
			this.retrieveSettings();
		},

		storeSettings: function() {
			currentAppConfig.set(contentDiscoverySettingsName, this.configSettings);
		},

		retrieveSettings: function() {
			this.configSettings = currentAppConfig.get(contentDiscoverySettingsName);
			if (this.configSettings === null || this.configSettings === undefined) {
				this.configSettings = {
					isAppFirstLoad: true,
					menuItemsVisible: Config.common.menuItemsVisibilityDefault,
					contentTimeWindow: Config.common.contentTimeWindow,
					profileImage: 'Images/sidebar_profile_image.png',
					profiles: []
				};
			}
		},

		getProfile: function(name) {
			var profileObj = null;
			for (var i = 0; i < this.configSettings.profiles.length; i++) {
				if (this.configSettings.profiles[i].name === name) {
					profileObj = this.configSettings.profiles[i];
					break;
				}
			}
			return profileObj;
		},

		isAppFirstLoad: function() {
			if (this.configSettings.isAppFirstLoad === true) {
				this.configSettings.isAppFirstLoad = false;
				this.storeSettings();
			}
			return this.configSettings.isAppFirstLoad;
		},

		isSelected: function() {
			return (profile.name !== '');
		},

		isAppProfileSet: function() {
			return this.configSettings.profiles.length > 0;
		},

		createProfile: function(profileName) {
			var profileObj = {
				name: profileName,
				menuItemsVisible: Config.common.menuItemsVisibilityDefault,
				contentTimeWindow: Config.common.contentTimeWindow,
				profileImage: 'Images/sidebar_profile_image.png'
			};
			this.configSettings.profiles.push(profileObj);
			this.storeSettings();
		},

		isProfileSet: function(profileName) {
			return this.getProfile(profileName) !== null;
		},

		getVisibleMenuItems: function() {
			if (profile !== null && profile.name !== '' && profile.name !== undefined) {
				var profileObj = this.getProfile(profile.name);
				return profileObj.menuItemsVisible;
			} else {
				return this.configSettings.menuItemsVisible;
			}
		},

		updateVisibleMenuItems: function(visibleItems) {
			if (profile !== null && profile.name !== '' && profile.name !== undefined) {
				var profileObj = this.getProfile(profile.name);
				profileObj.menuItemsVisible = visibleItems;
			} else {
				this.configSettings.menuItemsVisible = visibleItems;
			}
			this.storeSettings();
		},

		getContentTimeWindow: function() {
			if (profile !== null && profile.name !== '' && profile.name !== undefined) {
				var profileObj = this.getProfile(profile.name);
				return profileObj.contentTimeWindow;
			} else {
				return this.configSettings.contentTimeWindow;
			}
		},

		updateContentTimeWindow: function(contentTimeWindow) {
			if (profile !== null && profile.name !== '' && profile.name !== undefined) {
				var profileObj = this.getProfile(profile.name);
				profileObj.contentTimeWindow = contentTimeWindow;
			} else {
				this.configSettings.contentTimeWindow = contentTimeWindow;
			}
			this.storeSettings();
		},

		getProfileImage: function() {
			if (profile !== null && profile.name !== '' && profile.name !== undefined) {
				var profileObj = this.getProfile(profile.name);
				return profileObj.profileImage;
			} else {
				return this.configSettings.profileImage;
			}
		},

		updateProfileImage: function(url) {
			if (profile !== null && profile.name !== '' && profile.name !== undefined) {
				var profileObj = this.getProfile(profile.name);
				profileObj.profileImage = url;
			} else {
				this.configSettings.profileImage = url;
			}
			this.storeSettings();
		},

		// getAppReminderStorage: function() {
		// 	var reminders = [];
		// 	var remindersFromStorage = currentAppConfig.get(remindersStorageSettingName);			
		// 	if (remindersFromStorage !== undefined) {
		// 		contentTimeWindowVar = remindersFromStorage;
		// 	}
		// 	return reminders;
		// },

		// setAppReminderStorage: function(reminders) {
		// 	currentAppData.set(remindersStorageSettingName, reminders);
		// },

		cleanUp: function() {
			delete this.configSettings;
		}
	};
})();