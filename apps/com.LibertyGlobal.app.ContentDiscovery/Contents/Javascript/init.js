// Theme
include('Javascript/Theme.js');

include('Javascript/Config/Config.js');
include('Javascript/Config/conf.common.js');

include('Javascript/Core/ChannelHandler.js');
include('Javascript/Core/MenuHandler.js');
include('Javascript/Core/Notifications.js');

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

include('Javascript/Views/AppInfoScreen.js');
include('Javascript/Views/MainScreen.js');
include('Javascript/Views/InfoScreen.js');
include('Javascript/Views/FullSynopsis.js');
include('Javascript/Views/EmptyScreen.js');
include('Javascript/Views/PreferencesScreen.js');

Config.load();
//LGI.Guide.config.APIURL = Config.common.broadcastApiUrl;

// Init application with view config
MAF.application.init({
	views: [
		{ id: 'view-MainScreen', viewClass: MainScreen },
		{ id: 'view-InfoScreen', viewClass: InfoScreen },
		{ id: 'view-FullSynopsis', viewClass: FullSynopsis },
		{ id: 'view-AppInfoScreen', viewClass: AppInfoScreen },
		{ id: 'view-EmptyScreen', viewClass: EmptyScreen },
		{ id: 'view-About', viewClass: MAF.views.AboutBox } // Use standard About view
	],
	defaultViewId: 'view-MainScreen',
	settingsViewId: 'view-AppInfoScreen'
});
