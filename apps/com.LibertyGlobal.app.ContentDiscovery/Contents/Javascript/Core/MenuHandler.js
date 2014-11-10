var MenuHandler = (function() {
	this.menuItemsVisibility = [];
	this.menuItems = [];

	var createMenu = function() {
		var items = [		
			{ 
				preferenceLabel: $_('MenuItem_Movies_Preference_Text'), 
				mainMenuLabel: $_('MenuItem_Movies_MainMenu_Text'), 
				categoryFilters: 'speelfilm', 
				data: [],
				dataLoading: false,
				itemType: 'category',
				itemName: 'movies'
			},
			{
				preferenceLabel: $_('MenuItem_Trending_Preference_Text'), 
				mainMenuLabel: $_('MenuItem_Trending_MainMenu_Text'), 
				categoryFilters: 'speelfilm,nieuws,show,sport,kids,muziek,kunst,maatschappelijk,educatie',
				data: [],
				dataLoading: false,
				itemType: 'trending',
				itemName: 'trending'
			},
			{ 
				preferenceLabel: $_('MenuItem_Recommendations_Preference_Text'), 
				mainMenuLabel: $_('MenuItem_Recommendations_MainMenu_Text'), 
				categoryFilters: '',
				data: [],
				dataLoading: false,
				itemType: 'recommendations',
				itemName: 'recommendations'
			},
			{ 
				preferenceLabel: $_('MenuItem_Shuffle_Preference_Text'), 
				mainMenuLabel: $_('MenuItem_Shuffle_MainMenu_Text'), 
				categoryFilters: '',
				data: [],
				dataLoading: false,
				isVisible: true,
				itemType: 'shuffle',
				itemName: 'shuffle'
			},
			{ 
				preferenceLabel: $_('MenuItem_Sports_Preference_Text'), 
				mainMenuLabel: $_('MenuItem_Sports_MainMenu_Text'), 
				categoryFilters: 'sport', 
				data: [],
				dataLoading: false,
				itemType: 'category',
				itemName: 'sports'
			},
			{ 
				preferenceLabel: $_('MenuItem_Arts_Preference_Text'), 
				mainMenuLabel: $_('MenuItem_Arts_MainMenu_Text'), 
				categoryFilters: 'kunst', 
				data: [],
				dataLoading: false, itemType: 'category',
				itemName: 'arts'
			},
			{ 
				preferenceLabel: $_('MenuItem_News_Preference_Text'), 
				mainMenuLabel: $_('MenuItem_News_MainMenu_Text'), 
				categoryFilters: 'nieuws', 
				data: [],
				dataLoading: false,
				itemType: 'category',
				itemName: 'news'
			},
			{ 
				preferenceLabel: $_('MenuItem_Children_Preference_Text'), 
				mainMenuLabel: $_('MenuItem_Children_MainMenu_Text'), 
				categoryFilters: 'kids', 
				data: [],
				dataLoading: false,
				itemType: 'category',
				itemName: 'children'
			},
			{ 
				preferenceLabel: $_('MenuItem_Social_Preference_Text'), 
				mainMenuLabel: $_('MenuItem_Social_MainMenu_Text'), 
				categoryFilters: 'maatschappelijk', 
				data: [],
				dataLoading: false,
				itemType: 'category',
				itemName: 'social'
			},
			{ 
				preferenceLabel: $_('MenuItem_Show_Preference_Text'), 
				mainMenuLabel: $_('MenuItem_Show_MainMenu_Text'), 
				categoryFilters: 'show', 
				data: [],
				dataLoading: false,
				itemType: 'category',
				itemName: 'show'
			},
			{ 
				preferenceLabel: $_('MenuItem_Music_Preference_Text'), 
				mainMenuLabel: $_('MenuItem_Music_MainMenu_Text'),
				categoryFilters: 'muziek', 
				data: [],
				dataLoading: false,
				isVisible: true,
				itemType: 'category',
				itemName: 'music'
			},
			{ 
				preferenceLabel: $_('MenuItem_Education_Preference_Text'), 
				mainMenuLabel: $_('MenuItem_Education_MainMenu_Text'), 
				categoryFilters: 'educatie',
				data: [],
				dataLoading: false,
				isVisible: true,
				itemType: 'category',
				itemName: 'education'
			}
		];
		return items;
    };

	return {
		initialize: function()
		{
			this.menuItems = createMenu();
			this.menuItemsVisibility = Config.common.menuItemsVisibilityDefault;
		},

		setItemVisibility: function(visibleItems)
		{
			this.menuItemsVisibility = visibleItems;
		},

		getVisualMenuItems: function()
		{		
			var visibleMenuItems = [];
			for(var i = 0; i<this.menuItems.length; i++)
			{
				if(this.menuItemsVisibility.indexOf(this.menuItems[i].itemName) > -1)
				{
					visibleMenuItems.push(this.menuItems[i]);
				}
			}
			return visibleMenuItems;
		},

		cleanUp: function() {
			delete this.menuItems;
			delete this.menuItemsVisibility;	
		}
	};	
})();