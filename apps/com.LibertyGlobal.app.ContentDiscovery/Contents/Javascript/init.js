include('Javascript/Theme.js');

include('Javascript/Config/AgeRatingScheme.js');
include('Javascript/Config/Config.js');
include('Javascript/Config/conf.common.js');
include('Javascript/Config/conf.live.js');
include('Javascript/Config/conf.dev.js');
include('Javascript/Config/conf.NL.js');
include('Javascript/Config/conf.IE.js');

include('Javascript/Services/ContentDataRetriever.js');
include('Javascript/Services/FacebookService.js');
include('Javascript/Services/TwitterService.js');
include('Javascript/Services/DataStorageService.js');

include('Javascript/Core/AgeRatingConfig.js');
include('Javascript/Core/InitializationHandler.js');
include('Javascript/Core/MenuItem.js');
include('Javascript/Core/MenuHandler.js');
include('Javascript/Core/ConfigurationStorageHandler.js');
include('Javascript/Core/Reminder.js');
include('Javascript/Core/ReminderHandler.js');
include('Javascript/Core/ReportingHandler.js');

include('Javascript/Controls/SidebarControl.js');
include('Javascript/Controls/SettingsGridControl.js');
include('Javascript/Controls/SettingsGridCellControl.js');
include('Javascript/Controls/PageableTextGridControl.js');
include('Javascript/Controls/MenuCarouselCellControl.js');
include('Javascript/Controls/MenuCarouselControl.js');
include('Javascript/Controls/HorizontalMenuButtonControl.js');
include('Javascript/Controls/HorizontalMenuControl.js');
include('Javascript/Controls/ButtonControl.js');
include('Javascript/Controls/AssetDetailControl.js');
include('Javascript/Controls/AssetCarouselCellControl.js');
include('Javascript/Controls/AssetCarouselCellEmptyFocusControl.js');
include('Javascript/Controls/AssetCarouselCellCurrentFocusControl.js');
include('Javascript/Controls/AssetCarouselCellFutureFocusControl.js');
include('Javascript/Controls/AssetCarouselControl.js');

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
Config.loadCountryConfig(profile.countryCode.toUpperCase());
LGI.Guide.config.APIURL = Config.get('broadcastApiUrl');
LGI.Guide.config.region = profile.countryCode.toUpperCase();

// TODO used to test C2A, remove
// (function channelEvents() {
// var icon = widget.getUrl("Images/Icon_notification.png"),
// msg = ['APP Title', 'Line 2', 'Line 1'];
// widget.notify(icon, msg, MAF.Notification.CALL2ACTION);
// }).subscribeTo(MAF.mediaplayer, 'onChannelChange');

MAF.application.init({
	views: [{
			id: 'view-MainScreen',
			viewClass: MainScreen
		}, {
			id: 'view-CastScreen',
			viewClass: CastScreen
		}, {
			id: 'view-InfoScreen',
			viewClass: InfoScreen
		}, {
			id: 'view-FullBiography',
			viewClass: FullBiography
		}, {
			id: 'view-FullSynopsis',
			viewClass: FullSynopsis
		}, {
			id: 'view-PopupScreen',
			viewClass: PopupScreen
		}, {
			id: 'view-ShareScreen',
			viewClass: ShareScreen
		}, {
			id: 'view-About',
			viewClass: MAF.views.AboutBox
		} // Use standard About view
	],
	defaultViewId: 'view-MainScreen',
	settingsViewId: 'view-AppInfoScreen'
});
