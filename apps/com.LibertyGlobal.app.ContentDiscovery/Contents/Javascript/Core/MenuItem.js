function MenuItem(itemName, itemType, categoryFilters, preferenceLabel, mainMenuLabel, autoNavigate) {
	this.itemName = itemName; // unique item name
	this.itemType = itemType; // item type (standard is 'category', special types for shuffle, trending and recommendations)
	this.categoryFilters = Config.get('menuItemsCategoryNames')[itemName]; // categories to include in the query for this menu item
	this.data = []; // data items for this menu
	this.dataTimeframe = ""; // data time window used for retrieving data (minutes)
	this.dataLoading = false; // currently loading data
	this.autoNavigate = autoNavigate;
	this.mainMenuLabel = mainMenuLabel; // text for preference menu
	this.preferenceLabel = preferenceLabel; // text for main menu
	this.cleanUp = function () {
		delete this.data;
		this.data = null;
	};
}