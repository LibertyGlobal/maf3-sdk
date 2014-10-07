// Theme
include('Javascript/Theme.js');
include('Javascript/testdata.js');

include('Javascript/Config/Config.js');
include('Javascript/Config/conf.common.js');

include('Javascript/Controls/SidebarButtonControl.js');
include('Javascript/Controls/SidebarControl.js');
include('Javascript/Controls/MenuCarouselCellControl.js');
include('Javascript/Controls/MenuCarouselControl.js');
include('Javascript/Controls/AssetCarouselCellControl.js');
include('Javascript/Controls/AssetCarouselCellCurrentFocusControl.js');
include('Javascript/Controls/AssetCarouselCellFutureFocusControl.js');
include('Javascript/Controls/AssetCarouselControl.js');

include('Javascript/Services/ContentData.js');
include('Javascript/Services/ContentDataRetriever.js');
include('Javascript/Views/MainScreen.js');

Config.load();

// Init application with view config
MAF.application.init({
	views: [
		{ id: 'view-MainScreen', viewClass: MainScreen },
		{ id: 'view-About', viewClass: MAF.views.AboutBox } // Use standard About view
	],
	defaultViewId: 'view-MainScreen', // Declare what view to be loaded when opening the app
	settingsViewId: 'view-About' // Declare what view is opened when a used loads the settings
});
