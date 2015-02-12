var MenuHandler = (function() {
	var menuItems = [];

	return {
		initialize: function() {
			this.menuItems = this.createMenu();
		},

		createMenu: function() { 
			var items = [];
			// parameters: unique name, type of menu, filter on categories ('' is all)
			items.push(new MenuItem('recommendations', 'recommendations', $_("MenuItem_Recommendations_Preference_Text"), $_("MenuItem_Recommendations_MainMenu_Text"), false));
			items.push(new MenuItem('movies', 'category', 'speelfilm', $_("MenuItem_Movies_Preference_Text"), $_("MenuItem_Movies_MainMenu_Text"), false));
			items.push(new MenuItem('series', 'category', 'drama', $_("MenuItem_Series_Preference_Text"), $_("MenuItem_Series_MainMenu_Text"), false));
			items.push(new MenuItem('trending', 'trending', '', $_("MenuItem_Trending_Preference_Text"), $_("MenuItem_Trending_MainMenu_Text"), false));
			items.push(new MenuItem('shuffle', 'shuffle', '', $_("MenuItem_Shuffle_Preference_Text"), $_("MenuItem_Shuffle_MainMenu_Text"), true));
			items.push(new MenuItem('sports', 'category', 'sport', $_("MenuItem_Sports_Preference_Text"), $_("MenuItem_Sports_MainMenu_Text"), false));
			items.push(new MenuItem('news', 'category', 'nieuws', $_("MenuItem_News_Preference_Text"), $_("MenuItem_News_MainMenu_Text"), false));
			items.push(new MenuItem('kids', 'category', 'kids', $_("MenuItem_Children_Preference_Text"), $_("MenuItem_Children_MainMenu_Text"), false));
			items.push(new MenuItem('arts', 'category', 'kunst', $_("MenuItem_Arts_Preference_Text"), $_("MenuItem_Arts_MainMenu_Text"), false));
			items.push(new MenuItem('social', 'category', 'maatschappelijk', $_("MenuItem_Social_Preference_Text"), $_("MenuItem_Social_MainMenu_Text"), false));
			items.push(new MenuItem('show', 'category', 'show', $_("MenuItem_Show_Preference_Text"), $_("MenuItem_Show_MainMenu_Text"), false));
			items.push(new MenuItem('music', 'category', 'muziek', $_("MenuItem_Music_Preference_Text"), $_("MenuItem_Music_MainMenu_Text"), false));
			items.push(new MenuItem('education', 'category', 'educatie', $_("MenuItem_Education_Preference_Text"), $_("MenuItem_Education_MainMenu_Text"), false));
			return items;
		},

		setItemVisibility: function(visibleItems) {
			ConfigurationStorageHandler.updateVisibleMenuItems(visibleItems);
		},

		updateTextForItem: function(itemName, preferenceMenuText, mainMenuText) {
			for (var i = 0; i < this.menuItems.length; i++) {
				if (this.menuItems[i].itemName === itemName) {
					this.menuItems[i].mainMenuLabel = mainMenuText;
					this.menuItems[i].preferenceLabel = preferenceMenuText; 
				}
			}
		},

		getVisualMenuItems: function() {
			var visibleMenuItems = [];
			for (var i = 0; i < this.menuItems.length; i++) {
				if (this.menuItems[i].itemType === "category") {
					if (ConfigurationStorageHandler.getVisibleMenuItems().indexOf(this.menuItems[i].itemName) > -1) {
						visibleMenuItems.push(this.menuItems[i]);
					}
				} else {
					visibleMenuItems.push(this.menuItems[i]);
				}
			}
			return visibleMenuItems;
		},

		getCurrentMenuItemConfig: function() {
			var menuItemConfig = [];
			for (var i = 0; i < this.menuItems.length; i++) {
				if (this.menuItems[i].itemType === "category") {
					var selected = false;
					if (ConfigurationStorageHandler.getVisibleMenuItems().indexOf(this.menuItems[i].itemName) > -1) {
						selected = true;
					}
					menuItemConfig.push({
						name: this.menuItems[i].itemName,
						displayName: this.menuItems[i].preferenceLabel,
						selected: selected
					});
				}
			}
			return menuItemConfig;
		},

		cleanUp: function() {
			for (var i = 0; i < this.menuItems.length; i++) {
				this.menuItems[i].cleanUp();
			}
			delete this.menuItems;
		}
	};
})();