// Theme
include('Javascript/Theme.js');
//include('Javascript/testdata.js');

include('Javascript/Config/Config.js');
include('Javascript/Config/conf.common.js');

include('Javascript/Controls/SidebarButtonControl.js');
include('Javascript/Controls/SidebarControl.js');
include('Javascript/Controls/MenuCarouselCellControl.js');
include('Javascript/Controls/MenuCarouselControl.js');
include('Javascript/Controls/AssetCarouselCellControl.js');
include('Javascript/Controls/AssetCarouselCellEmptyFocusControl.js');
include('Javascript/Controls/AssetCarouselCellCurrentFocusControl.js');
include('Javascript/Controls/AssetCarouselCellFutureFocusControl.js');
include('Javascript/Controls/AssetCarouselControl.js');
include('Javascript/Controls/AssetDetailControl.js');

include('Javascript/Services/ContentDataRetriever.js');

include('Javascript/Views/AppInfoScreen.js');
include('Javascript/Views/MainScreen.js');
include('Javascript/Views/InfoScreen.js');

Config.load();

// Init application with view config
MAF.application.init({
	views: [
		{ id: 'view-MainScreen', viewClass: MainScreen },
		{ id: 'view-InfoScreen', viewClass: InfoScreen },
		{ id: 'view-AppInfoScreen', viewClass: AppInfoScreen },
		{ id: 'view-About', viewClass: MAF.views.AboutBox } // Use standard About view
	],
	defaultViewId: 'view-MainScreen',
	settingsViewId: 'view-AppInfoScreen'
});
