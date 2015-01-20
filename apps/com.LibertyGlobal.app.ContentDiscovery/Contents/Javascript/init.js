// Theme
include('Javascript/Theme.js');

include('Javascript/Config/Config.js');
include('Javascript/Config/conf.common.js');
include('Javascript/Config/conf.live.js');
include('Javascript/Config/conf.dev.js');
include('Javascript/Config/AgeRatingScheme.js');

include('Javascript/Core/AgeRatingConfig.js');
include('Javascript/Core/InitializationHandler.js');
include('Javascript/Core/MenuItem.js');
include('Javascript/Core/MenuHandler.js');
include('Javascript/Core/ConfigurationStorageHandler.js');
include('Javascript/Core/Reminder.js');
include('Javascript/Core/ReminderHandler.js');

include('Javascript/Controls/SidebarButtonControl.js');
include('Javascript/Controls/SidebarControl.js');
include('Javascript/Controls/SettingsGridControl.js');
include('Javascript/Controls/SettingsGridCellControl.js');
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
include('Javascript/Services/FacebookService.js');
include('Javascript/Services/TwitterService.js');

include('Javascript/Views/AppInfoPopup.js');
include('Javascript/Views/CastScreen.js');
include('Javascript/Views/MainScreen.js');
include('Javascript/Views/InfoScreen.js');
include('Javascript/Views/FullBiography.js');
include('Javascript/Views/FullSynopsis.js');
include('Javascript/Views/PopupScreen.js');
include('Javascript/Views/PreferencesPopup.js');
include('Javascript/Views/ShareScreen.js');
include('Javascript/Views/WelcomePopup.js');

Config.load();
LGI.Guide.config.APIURL = Config.common.broadcastApiUrl;
LGI.Guide.config.region = Config.common.country;

// Init application with view config
MAF.application.init({
	views: [
		{ id: 'view-MainScreen', viewClass: MainScreen },
		{ id: 'view-CastScreen', viewClass: CastScreen },
		{ id: 'view-InfoScreen', viewClass: InfoScreen },
		{ id: 'view-FullBiography', viewClass: FullBiography },
		{ id: 'view-FullSynopsis', viewClass: FullSynopsis },
		{ id: 'view-PopupScreen', viewClass: PopupScreen },
		{ id: 'view-ShareScreen', viewClass: ShareScreen },
		{ id: 'view-About', viewClass: MAF.views.AboutBox } // Use standard About view
	],
	defaultViewId: 'view-MainScreen',
	settingsViewId: 'view-AppInfoScreen'
});

//(function() {
//ReminderHandler.initialize();
//}).subscribeTo(MAF.application, 'onApplicationStartup');

//(function() {
//ReminderHandler.cleanUp();
//}).subscribeTo(MAF.application, 'onApplicationShutdown');

