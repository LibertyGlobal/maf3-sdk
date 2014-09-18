// Include your views
include('Javascript/Theme.js');
include('Javascript/testdata.js');
//include('Javascript/Services/TestService.js');
include('Javascript/Controls/SidebarControl.js');
include('Javascript/Controls/CarouselCellControl.js');
include('Javascript/Controls/CarouselControl.js');
include('Javascript/Controls/AssetCarouselCellControl.js');
include('Javascript/Controls/AssetCarouselCellFocusControl.js');
include('Javascript/Controls/AssetCarouselControl.js');
include('Javascript/Views/HomeScreen.js');

// Init application with view config
MAF.application.init({
	views: [
		{ id: 'view-HomeScreen', viewClass: HomeScreen },
		{ id: 'view-About', viewClass: MAF.views.AboutBox } // Use standard About view
	],
	defaultViewId: 'view-HomeScreen', // Declare what view to be loaded when opening the app
	settingsViewId: 'view-About' // Declare what view is opened when a used loads the settings
});
