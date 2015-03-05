var ConfigurationStorageHandler = {
	configAppSettings: null,
	configProfileSettings: null,
	contentDiscoverySettingsName: "contentDisc",
	contentDiscoveryProfileSettingsName: "contentDiscProfile",
	defaultProfileImage: "Images/sidebar_profile_image.png",

	initialize: function() {
		this.retrieveAppSettings();
		this.retrieveProfileSettings();
	},

	storeAppSettings: function() {
		currentAppConfig.set(this.contentDiscoverySettingsName, this.configAppSettings);
	},

	retrieveAppSettings: function() {
		this.configAppSettings = currentAppConfig.get(this.contentDiscoverySettingsName);
		if (this.configAppSettings === null || this.configAppSettings === undefined) {
			this.configAppSettings = {
				appFirstLoad: true,
				appProfileSet: false
			};
		}
	},

	storeProfileSettings: function() {
		currentAppData.set(this.contentDiscoveryProfileSettingsName, this.configProfileSettings);
	},

	retrieveProfileSettings: function() {
		this.configProfileSettings = currentAppData.get(this.contentDiscoveryProfileSettingsName);
		if (this.configProfileSettings === null || this.configProfileSettings === undefined) {
			if (this.configAppSettings.appProfileSet === false) {
				this.configAppSettings.appProfileSet = true;
				this.storeAppSettings();
			}
			this.configProfileSettings = {
				profileSet: false,
				menuItemsVisible: Config.get('menuItemsVisibilityDefault'),
				contentTimeWindow: Config.get('contentTimeWindow'),
				profileImage: this.defaultProfileImage
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
		this.configAppSettings = null;
		delete this.configAppSettings;
		this.configProfileSettings = null;
		delete this.configProfileSettings;
	}
};