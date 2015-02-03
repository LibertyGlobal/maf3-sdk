var ConfigurationStorageHandler = (function() {
	var configAppSettings = null;
	var configProfileSettings = null;
	var contentDiscoverySettingsName = "contentDisc";
	var contentDiscoveryProfileSettingsName = " contentDiscProfile";

	return {
		initialize: function() {
			this.retrieveAppSettings();
			this.retrieveProfileSettings();
		},

		storeAppSettings: function() {
			currentAppConfig.set(contentDiscoverySettingsName, this.configAppSettings);
		},

		retrieveAppSettings: function() {
			this.configAppSettings = currentAppConfig.get(contentDiscoverySettingsName);
			if (this.configAppSettings === null || this.configAppSettings === undefined) {
				this.configAppSettings = {
					appFirstLoad: true,
					appProfileSet: false
				};
			}
		},

		storeProfileSettings: function() {
			currentAppData.set(contentDiscoveryProfileSettingsName, this.configProfileSettings);
		},

		retrieveProfileSettings: function() {
			this.configProfileSettings = currentAppData.get(contentDiscoveryProfileSettingsName);
			if (this.configProfileSettings === null || this.configProfileSettings === undefined) {
				if (this.configAppSettings.appProfileSet === false) {
					this.configAppSettings.appProfileSet = true;
					this.storeAppSettings();
				}
				this.configProfileSettings = {
					profileSet: false,
					menuItemsVisible: Config.common.menuItemsVisibilityDefault,
					contentTimeWindow: Config.common.contentTimeWindow,
					profileImage: 'Images/sidebar_profile_image.png'
				};
			}
		},

		checkAppFirstLoad: function() {
			var firstLoad = this.configAppSettings.appFirstLoad;
			if (this.configAppSettings.appFirstLoad === true) {
				this.configAppSettings.appFirstLoad = false;
				this.storeAppSettings();
			}
			return firstLoad;
		},

		isSelected: function() {
			return (profile.name !== '');
		},

		isAppProfileSet: function() {
			return this.configAppSettings.appProfileSet;
		},

		isProfileSet: function() {
			return this.configProfileSettings.profileSet;
		},

		getVisibleMenuItems: function() {
			return this.configProfileSettings.menuItemsVisible;
		},

		updateVisibleMenuItems: function(visibleItems) {
			this.configProfileSettings.profileSet = true;
			this.configProfileSettings.menuItemsVisible = visibleItems;
			this.storeProfileSettings();
		},

		getContentTimeWindow: function() {
			return this.configProfileSettings.contentTimeWindow;
		},

		updateContentTimeWindow: function(contentTimeWindow) {
			this.configProfileSettings.contentTimeWindow = contentTimeWindow;
			this.storeProfileSettings();
		},

		getProfileImage: function() {
			return this.configProfileSettings.profileImage;
		},

		updateProfileImage: function(url) {
			this.configProfileSettings.profileImage = url;
			this.storeProfileSettings();
		},

		cleanUp: function() {
			delete this.configAppSettings;
			delete this.configProfileSettings;
		}
	};
})();