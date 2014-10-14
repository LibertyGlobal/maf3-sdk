Config.common = {
	contentTimeWindow: 90,
	channelApiUrl: 'http://www.horizon.tv/oesp/api/NL/nld/web/channels',
	channelList: [],
	menuItems: [		
		{ 
			preferenceLabel: $_('MenuItem_Movies_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Movies_MainMenu_Text'), 
			categoryFilters: 'speelfilm', 
			data: [],
			dataLoading: false,
			isVisible: true,
			itemType: 'category'
		},
		{ 
			preferenceLabel: $_('MenuItem_Trending_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Trending_MainMenu_Text'), 
			categoryFilters: '',
			data: [],
			dataLoading: false,
			isVisible: true,
			itemType: 'trending'
		},
		{ 
			preferenceLabel: $_('MenuItem_Recommendations_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Recommendations_MainMenu_Text'), 
			categoryFilters: '',
			data: [],
			dataLoading: false,
			isVisible: true,
			itemType: 'recommendations'
		},
		{ 
			preferenceLabel: $_('MenuItem_Shuffle_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Shuffle_MainMenu_Text'), 
			categoryFilters: '',
			data: [],
			dataLoading: false,
			isVisible: true,
			itemType: 'shuffle'
		},
		// TODO Series{ 
		// 	preferenceLabel: $_('MenuItem_Series_Preference_Text'), 
		// 	mainMenuLabel: $_('MenuItem_Series_MainMenu_Text'), 
		// 	categoryFilters: '&qt;drama/drama&qt;,', 
		// 	data: [],
		// 	isVisible: true,
		// 	itemType: 'category'
		// },
		{ 
			preferenceLabel: $_('MenuItem_Sports_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Sports_MainMenu_Text'), 
			categoryFilters: 'sport', 
			data: [],
			dataLoading: false,
			isVisible: true,
			itemType: 'category'
		},
		{ 
			preferenceLabel: $_('MenuItem_Arts_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Arts_MainMenu_Text'), 
			categoryFilters: 'kunst', 
			data: [],
			dataLoading: false,
			isVisible: true,
			itemType: 'category'
		},
		{ 
			preferenceLabel: $_('MenuItem_News_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_News_MainMenu_Text'), 
			categoryFilters: 'nieuws', 
			data: [],
			dataLoading: false,
			isVisible: true,
			itemType: 'category'
		},
		{ 
			preferenceLabel: $_('MenuItem_Children_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Children_MainMenu_Text'), 
			categoryFilters: 'kids', 
			data: [],
			dataLoading: false,
			isVisible: true,
			itemType: 'category'
		},
		{ 
			preferenceLabel: $_('MenuItem_Social_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Social_MainMenu_Text'), 
			categoryFilters: 'maatschappelijk', 
			data: [],
			dataLoading: false,
			isVisible: true,
			itemType: 'category'
		},
		{ 
			preferenceLabel: $_('MenuItem_Show_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Show_MainMenu_Text'), 
			categoryFilters: 'show', 
			data: [],
			dataLoading: false,
			isVisible: true,
			itemType: 'category'
		},
		{ 
			preferenceLabel: $_('MenuItem_Music_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Music_MainMenu_Text'),
			categoryFilters: 'muziek', 
			data: [],
			dataLoading: false,
			isVisible: true
		},
		{ 
			preferenceLabel: $_('MenuItem_Education_Preference_Text'), 
			mainMenuLabel: $_('MenuItem_Education_MainMenu_Text'), 
			categoryFilters: 'educatie',
			data: [],
			dataLoading: false,
			isVisible: true,
			itemType: 'category'
		}
	]
};