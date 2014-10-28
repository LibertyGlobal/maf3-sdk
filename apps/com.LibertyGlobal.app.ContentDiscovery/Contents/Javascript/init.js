// Theme
include('Javascript/Theme.js');
//include('Javascript/testdata.js');

include('Javascript/Config/Config.js');
include('Javascript/Config/conf.common.js');

include('Javascript/Controls/SidebarButtonControl.js');
include('Javascript/Controls/SidebarControl.js');
include('Javascript/Controls/PageableTextGridControl.js');
include('Javascript/Controls/MenuCarouselCellControl.js');
include('Javascript/Controls/MenuCarouselControl.js');
include('Javascript/Controls/HorizontalMenuButtonControl.js');
include('Javascript/Controls/HorizontalMenuControl.js');
include('Javascript/Controls/ButtonControl.js');
include('Javascript/Controls/CoverBarControl.js');
include('Javascript/Controls/CoverBarItemControl.js');
include('Javascript/Controls/CoverBarItemFocusControl.js');
include('Javascript/Controls/AssetDetailControl.js');
include('Javascript/Controls/AssetCarouselCellControl.js');
include('Javascript/Controls/AssetCarouselCellEmptyFocusControl.js');
include('Javascript/Controls/AssetCarouselCellCurrentFocusControl.js');
include('Javascript/Controls/AssetCarouselCellFutureFocusControl.js');
include('Javascript/Controls/AssetCarouselControl.js');

include('Javascript/Services/ContentDataRetriever.js');

include('Javascript/Views/Helpers/ChannelHelper.js');
include('Javascript/Views/AppInfoScreen.js');
include('Javascript/Views/MainScreen.js');
include('Javascript/Views/InfoScreen.js');
include('Javascript/Views/FullSynopsis.js');

Config.load();

// Init application with view config
MAF.application.init({
	views: [
		{ id: 'view-MainScreen', viewClass: MainScreen },
		{ id: 'view-InfoScreen', viewClass: InfoScreen },
		{ id: 'view-FullSynopsis', viewClass: FullSynopsis },
		{ id: 'view-AppInfoScreen', viewClass: AppInfoScreen },
		{ id: 'view-About', viewClass: MAF.views.AboutBox } // Use standard About view
	],
	defaultViewId: 'view-MainScreen',
	settingsViewId: 'view-AppInfoScreen'
});
