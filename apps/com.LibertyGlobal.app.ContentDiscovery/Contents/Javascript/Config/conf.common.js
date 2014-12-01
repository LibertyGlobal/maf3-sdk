Config.common = {
	programDurationDisplayThreshold: 85, // 
	progressBarUpdateFreq: 10000, 
	contentTimeWindow: "30", // default content time window (minutes)
	extendedContentTimeWindow: "150", // extendend content time window in case no items found in the default window (minutes)
	facebookDefaultUrl: "www.upc.nl",
	broadcastApiUrl: 'http://api.uat.appdev.io/kraken/v2/schedule/',
	country: "NL",
	language: "nl",
	ageRatingSchemeFile: "apps/com.libertyglobal.app.ContentDiscovery/Contents/Javascript/Config/AgeRatingScheme.xml",
	channelApiUrl: 'http://www.horizon.tv/oesp/api/NL/nld/web/channels',
	InfoScreenMovieSerieCategory: 'speelfilm',
	menuItemsVisibilityDefault: [ 'movies', 'sports', 'news', 'children' ] // default menu items when no profile preferences set
};

// retrieve the list with menu items.
// parameters: unique name, type of menu, filter on categories ('' is all)
Config.common.createMenu = function() { 
	var items = [];
	items.push(new MenuItem('movies', 'category', 'speelfilm', $_("MenuItem_Movies_Preference_Text"), $_("MenuItem_Movies_MainMenu_Text")));
	items.push(new MenuItem('trending', 'trending', 'speelfilm,nieuws,show,sport,kids,muziek,kunst,maatschappelijk,educatie', $_("MenuItem_Trending_Preference_Text"), $_("MenuItem_Trending_MainMenu_Text")));
	items.push(new MenuItem('recommendations', 'recommendations', '', $_("MenuItem_Recommendations_Preference_Text"), $_("MenuItem_Recommendations_MainMenu_Text")));
	items.push(new MenuItem('shuffle', 'shuffle', 'speelfilm,nieuws,show,sport,kids,muziek,kunst,maatschappelijk,educatie', $_("MenuItem_Shuffle_Preference_Text"), $_("MenuItem_Shuffle_MainMenu_Text")));
	items.push(new MenuItem('sports', 'category', 'sport', $_("MenuItem_Sports_Preference_Text"), $_("MenuItem_Sports_MainMenu_Text")));
	items.push(new MenuItem('arts', 'category', 'kunst', $_("MenuItem_Arts_Preference_Text"), $_("MenuItem_Arts_MainMenu_Text")));
	items.push(new MenuItem('news', 'category', 'nieuws', $_("MenuItem_News_Preference_Text"), $_("MenuItem_News_MainMenu_Text")));
	items.push(new MenuItem('children', 'category', 'kids', $_("MenuItem_Children_Preference_Text"), $_("MenuItem_Children_MainMenu_Text")));
	items.push(new MenuItem('social', 'category', 'maatschappelijk', $_("MenuItem_Social_Preference_Text"), $_("MenuItem_Social_MainMenu_Text")));
	items.push(new MenuItem('show', 'category', 'show', $_("MenuItem_Show_Preference_Text"), $_("MenuItem_Show_MainMenu_Text")));
	items.push(new MenuItem('music', 'category', 'muziek', $_("MenuItem_Music_Preference_Text"), $_("MenuItem_Music_MainMenu_Text")));
	items.push(new MenuItem('education', 'category', 'educatie', $_("MenuItem_Education_Preference_Text"), $_("MenuItem_Education_MainMenu_Text")));
	return items;
};
