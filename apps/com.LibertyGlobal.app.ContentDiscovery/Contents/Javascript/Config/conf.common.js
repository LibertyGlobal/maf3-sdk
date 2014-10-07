Config.common = {
	channelApiUrl: 'http://www.horizon.tv/oesp/api/NL/nld/web/channels',
	channelList: [],
	menuItems: [
		{ 
			preferenceLabel: $_('MenuItem_Movies_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Movies_MainMenu_Text'), 
			categoryFilters: 'speelfilm,drama', 
			data: [],
			isVisible: true,
			itemType: 'category'
		},
		{ 
			preferenceLabel: $_('MenuItem_Sports_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Sports_MainMenu_Text'), 
			categoryFilters: 'sport', 
			data: [],
			isVisible: true,
			itemType: 'category'
		},
		{ 
			preferenceLabel: $_('MenuItem_Arts_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Arts_MainMenu_Text'), 
			categoryFilters: 'kunst', 
			data: [],
			isVisible: true,
			itemType: 'category'
		},
		{ 
			preferenceLabel: $_('MenuItem_News_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_News_MainMenu_Text'), 
			categoryFilters: 'nieuws', 
			data: [],
			isVisible: true,
			itemType: 'category'
		},
		{ 
			preferenceLabel: $_('MenuItem_Children_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Children_MainMenu_Text'), 
			categoryFilters: 'kids', 
			data: [],
			isVisible: true,
			itemType: 'category'
		},
		{ 
			preferenceLabel: $_('MenuItem_Social_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Social_MainMenu_Text'), 
			categoryFilters: 'maatschappelijk', 
			data: [],
			isVisible: true,
			itemType: 'category'
		},
		{ 
			preferenceLabel: $_('MenuItem_Show_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Show_MainMenu_Text'), 
			categoryFilters: 'show', 
			data: [],
			isVisible: true,
			itemType: 'category'
		},
		{ 
			preferenceLabel: $_('MenuItem_Music_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Music_MainMenu_Text'),
			categoryFilters: 'muziek', 
			data: [],
			isVisible: true
		},
		{ 
			preferenceLabel: $_('MenuItem_Education_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Education_MainMenu_Text'), 
			categoryFilters: 'educatie',
			data: [], 
			isVisible: true,
			itemType: 'category'
		}
	]
};