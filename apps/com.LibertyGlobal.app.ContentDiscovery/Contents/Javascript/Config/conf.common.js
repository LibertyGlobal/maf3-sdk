Config.common = {
	programDurationDisplayThreshold: 0.85, // 
	progressBarUpdateFreq: 10000, 
	contentTimeWindow: "30", // default content time window (minutes)
	extendedContentTimeWindow: "150", // extendend content time window in case no items found in the default window (minutes)
	trendingItemsLimit: 16,
	facebookDefaultUrl: "www.upc.nl",
	broadcastApiUrl: 'http://api.uat.appdev.io/kraken/v2/schedule/',
	country: "NL",
	language: "nl",
	ageRatingSchemeFile: "apps/com.libertyglobal.app.ContentDiscovery/Contents/Javascript/Config/AgeRatingScheme.xml",
	channelApiUrl: 'http://www.horizon.tv/oesp/api/NL/nld/web/channels',
	InfoScreenMovieSerieCategory: 'speelfilm',
	menuItemsVisibilityDefault: [ 'speelfilm', 'sport', 'nieuws', 'kids' ] // default menu items when no profile preferences set
};

// retrieve the list with menu items.
// parameters: unique name, type of menu, filter on categories ('' is all)
Config.common.createMenu = function() { 
	var items = [];
	items.push(new MenuItem('recommendations', 'recommendations', '', $_("MenuItem_Recommendations_Preference_Text"), $_("MenuItem_Recommendations_MainMenu_Text")));
	items.push(new MenuItem('speelfilm', 'category', 'speelfilm', $_("MenuItem_Movies_Preference_Text"), $_("MenuItem_Movies_MainMenu_Text")));
	items.push(new MenuItem('trending', 'trending', 'speelfilm,nieuws,show,sport,kids,muziek,kunst,maatschappelijk,educatie', $_("MenuItem_Trending_Preference_Text"), $_("MenuItem_Trending_MainMenu_Text")));
	items.push(new MenuItem('shuffle', 'shuffle', '', $_("MenuItem_Shuffle_Preference_Text"), $_("MenuItem_Shuffle_MainMenu_Text")));
	items.push(new MenuItem('sport', 'category', 'sport', $_("MenuItem_Sports_Preference_Text"), $_("MenuItem_Sports_MainMenu_Text")));
	items.push(new MenuItem('kunst', 'category', 'kunst', $_("MenuItem_Arts_Preference_Text"), $_("MenuItem_Arts_MainMenu_Text")));
	items.push(new MenuItem('nieuws', 'category', 'nieuws', $_("MenuItem_News_Preference_Text"), $_("MenuItem_News_MainMenu_Text")));
	items.push(new MenuItem('kids', 'category', 'kids', $_("MenuItem_Children_Preference_Text"), $_("MenuItem_Children_MainMenu_Text")));
	items.push(new MenuItem('maatschappelijk', 'category', 'maatschappelijk', $_("MenuItem_Social_Preference_Text"), $_("MenuItem_Social_MainMenu_Text")));
	items.push(new MenuItem('show', 'category', 'show', $_("MenuItem_Show_Preference_Text"), $_("MenuItem_Show_MainMenu_Text")));
	items.push(new MenuItem('muziek', 'category', 'muziek', $_("MenuItem_Music_Preference_Text"), $_("MenuItem_Music_MainMenu_Text")));
	items.push(new MenuItem('educatie', 'category', 'educatie', $_("MenuItem_Education_Preference_Text"), $_("MenuItem_Education_MainMenu_Text")));
	return items;
};
