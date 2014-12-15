var PreferencesPopup = new MAF.Class({
	ClassName: 'PreferencesPopup',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event) {},
		createContent: function() {
			var view = this;
			view.Title = new MAF.element.Text({
				text: $_('PreferencesScreen_Title'),
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 48,
					width: 'inherit' - 150,
					vOffset: 40,
					hOffset: 75
				}
			}).appendTo(view);

			view.MenuItemsTitle = new MAF.element.Text({
				text: $_('PreferencesScreen_MenuItems_Title'),
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 36,
					width: 'inherit' - 150,
					vOffset: 115,
					hOffset: 75
				}
			}).appendTo(view);

			view.MenuItemsGrid = new SettingsGridControl({
				rows: 3,
				columns: 3,
				styles: {
					hOffset: 60,
					vOffset: 170,
					width: 1500,
					height: 240
				},
				events: {
					onNavigateDownRight: function(eventData) {
						if (FacebookService.isPaired() !== true) {
							view.facebookButton.setFocus();
						} else {
							if (TwitterService.isPaired() !== true) {
								view.twitterButton.setFocus();
							} else {
								view.ContentTimesGrid.focus();
							}
						}
					}
				}
			}).appendTo(view);

			view.facebookText = new MAF.element.Text({
				text: $_('PreferencesScreen_ConnectedFacebook_Text'),
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-ExtraLight, sans-serif',
					fontSize: 36,
					vOffset: 450,
					hOffset: 75,
					width: 500,
					height: 66
				}
			}).appendTo(view);
			view.facebookText.hide();

			view.facebookButton = new ButtonControl({
				buttonText: $_('PreferencesScreen_ConnectFacebook_Button'),
				styles: {
					vOffset: 438,
					hOffset: 75,
					width: 379,
					height: 66
				},
				events: {
					onNavigate: function(eventData) {
						switch (eventData.payload.direction) {
							case "down":
								view.ContentTimesGrid.focus();
								break;
							case "right":
								if (TwitterService.isPaired() !== true) {
									view.twitterButton.setFocus();
								} else {
									view.ContentTimesGrid.focus();
								}
								break;
							case "up":
							case "left":
								view.MenuItemsGrid.focusCell(3);
								view.MenuItemsGrid.focus();
								break;
						}
						eventData.preventDefault();
						eventData.stopPropagation();
					},
					onSelect: function() {
						FacebookService.pair(view.facebookPaired, {
							"view": view
						});
					}
				}
			}).appendTo(view);

			view.twitterText = new MAF.element.Text({
				text: $_('PreferencesScreen_ConnectedTwitter_Text'),
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-ExtraLight, sans-serif',
					fontSize: 36,
					vOffset: 450,
					hOffset: 570,
					width: 500,
					height: 66
				}
			}).appendTo(view);
			view.twitterText.hide();

			view.twitterButton = new ButtonControl({
				buttonText: $_('PreferencesScreen_ConnectTwitter_Button'),
				styles: {
					vOffset: 438,
					hOffset: 570,
					width: 379,
					height: 66
				},
				events: {
					onNavigate: function(eventData) {
						switch (eventData.payload.direction) {
							case "left":
								if (FacebookService.isPaired() !== true) {
									view.facebookButton.setFocus();
								} else {
									view.MenuItemsGrid.focusCell(3);
									view.MenuItemsGrid.focus();
								}
								break;
							case "up":
								view.MenuItemsGrid.focusCell(3);
								view.MenuItemsGrid.focus();
								break;
							case "right":
							case "down":
								view.ContentTimesGrid.focus();
								break;
						}
						eventData.preventDefault();
						eventData.stopPropagation();
					},
					onSelect: function() {
						TwitterService.pair(view.twitterPaired, {
							"view": view
						});
					}
				}
			}).appendTo(view);

			view.ContentTimeTitle = new MAF.element.Text({
				text: $_('PreferencesScreen_ContentTime_Title'),
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 36,
					width: 'inherit' - 150,
					vOffset: 550,
					hOffset: 75
				}
			}).appendTo(view);

			view.ContentTimeSubTitle = new MAF.element.Text({
				text: $_('PreferencesScreen_ContentTime_SubTitle'),
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-ExtraLight, sans-serif',
					fontSize: 30,
					width: 'inherit' - 150,
					vOffset: 600,
					hOffset: 75
				}
			}).appendTo(view);

			view.ContentTimesGrid = new SettingsGridControl({
				type: 'radio',
				rows: 1,
				columns: 3,
				styles: {
					hOffset: 60,
					vOffset: 640,
					width: 1500,
					height: 80
				},
				events: {
					onNavigateUpLeft: function(eventData) {
						if (FacebookService.isPaired() !== true) {
							view.facebookButton.setFocus();
						} else {
							if (TwitterService.isPaired() !== true) {
								view.twitterButton.setFocus();
							} else {
								view.MenuItemsGrid.focus();
							}
						}
					},
					onNavigateDownRight: function(eventData) {
						view.doneButton.setFocus();
					}
				}
			}).appendTo(view);

			view.ContentTimeFooter = new MAF.element.Text({
				text: $_('PreferencesScreen_ContentTime_Footer'),
				styles: {
					color: '#FFFFFF',
					fontFamily: 'InterstatePro-ExtraLight, sans-serif',
					fontSize: 26,
					width: 'inherit' - 150,
					vOffset: 725,
					hOffset: 75
				}
			}).appendTo(view);

			view.doneButton = new ButtonControl({
				buttonText: $_('PreferencesScreen_Close_Button'),
				styles: {
					vOffset: 756,
					hOffset: 1239,
					width: 379,
					height: 66
				},
				events: {
					onNavigate: function(eventData) {
						switch (eventData.payload.direction) {
							case "left":
							case "right":
							case "down":
								break;
							case "up":
								view.ContentTimesGrid.focus();
								break;
						}
						eventData.preventDefault();
						eventData.stopPropagation();
					},
					onSelect: function() {
						var menuItems = [];
						for (var i = 0; i < view.MenuItemsGrid.cells.length; i++) {
							var menuItemData = view.MenuItemsGrid.cells[i].getCellDataItem();
							if (menuItemData.selected === true) {
								menuItems.push(menuItemData.name);
							}
						}
						var contentTime = "30";
						for (i = 0; i < view.ContentTimesGrid.cells.length; i++) {
							var contentTimeItemData = view.ContentTimesGrid.cells[i].getCellDataItem();
							if (contentTimeItemData.selected === true) {
								contentTime = contentTimeItemData.name;
								break;
							}
						}
						ConfigurationStorageHandler.updateVisibleMenuItems(menuItems);
						ConfigurationStorageHandler.updateContentTimeWindow(contentTime);
						view.fire('onPreferencesClosed', {});
					}
				}
			}).appendTo(this);
		}
	},

	config: {
		render: true,
		focus: false
	},

	initialize: function() {
		this.fnOnProfileLoaded = this.onProfileLoaded.subscribeTo(MAF.application, 'onLoadProfile', this);
		this.fnOnProfileUnloaded = this.onProfileUnloaded.subscribeTo(MAF.application, 'onUnloadProfile', this);

		this.contentTimes = [];
		this.contentTimes.push({
			name: "30",
			displayName: $_('PreferencesScreen_ContentTime_30min_Text'),
			selected: false
		});
		this.contentTimes.push({
			name: "60",
			displayName: $_('PreferencesScreen_ContentTime_60min_Text'),
			selected: false
		});
		this.contentTimes.push({
			name: "90",
			displayName: $_('PreferencesScreen_ContentTime_90min_Text'),
			selected: false
		});
		this.parent();
		this.createContent();
	},

	onProfileLoaded: function(event) {
		console.log("Preferences Load profile: " + ConfigurationStorageHandler.getVisibleMenuItems() + ", " + ConfigurationStorageHandler.getContentTimeWindow());
		this.bindData();
	},

	onProfileUnloaded: function(event) {
		console.log("Preferences Unload profile: " + ConfigurationStorageHandler.getVisibleMenuItems() + ", " + ConfigurationStorageHandler.getContentTimeWindow());
		Twitter.reset();
		Facebook.reset();
	},

	bindData: function() {
		this.facebookButton.show();
		this.twitterButton.show();
		if (ConfigurationStorageHandler.isSelected() === true) {
			if (TwitterService.isPaired() === true) {
				this.twitterButton.hide();
				this.twitterText.show();
			}
			else
			{
				this.twitterButton.show();
				this.twitterText.hide();
			}
			if (FacebookService.isPaired() === true) {
				this.facebookButton.hide();
				this.facebookText.show();
			}
			else
			{
				this.facebookButton.show();
				this.facebookText.hide();
			}
		}

		this.MenuItemsGrid.changeDataset(MenuHandler.getCurrentMenuItemConfig());
		for (var i = 0; i < this.contentTimes.length; i++) {
			(this.contentTimes[i].name === ConfigurationStorageHandler.getContentTimeWindow()) ?
			this.contentTimes[i].selected = true:
				this.contentTimes[i].selected = false;
		}
		this.ContentTimesGrid.changeDataset(this.contentTimes);
	},

	setFocus: function() {
		this.doneButton.focus();
	},

	facebookPaired: function(result, callbackParams) {
		if (result.first_name !== undefined) {
			callbackParams.view.facebookButton.hide();
			callbackParams.view.facebookText.show();
		}
	},

	twitterPaired: function(result, callbackParams) {
		if (result.screen_name !== undefined) {
			callbackParams.view.twitterButton.hide();
			callbackParams.view.twitterText.show();
		}
	},

	suicide: function() {
		this.fnOnProfileLoaded.unsubscribeFrom(MAF.application, 'onLoadProfile');
		this.fnOnProfileLoaded = null;
		this.fnOnProfileUnloaded.unsubscribeFrom(MAF.application, 'onUnloadProfile');
		this.fnOnProfileUnloaded = null;
		delete this.contentTimes;
		delete this.Title;
		delete this.MenuItemsTitle;
		delete this.MenuItemsGrid;
		delete this.facebookButton;
		delete this.twitterButton;
		delete this.ContentTimeTitle;
		delete this.ContentTimeSubTitle;
		delete this.ContentTimesGrid;
		delete this.ContentTimeFooter;
		delete this.doneButton;
		delete this.facebookText;
		delete this.twitterText;
		this.parent();
	}
});