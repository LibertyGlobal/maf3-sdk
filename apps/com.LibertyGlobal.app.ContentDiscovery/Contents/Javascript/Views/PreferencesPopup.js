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
					vOffset: 105,
					hOffset: 75
				}
			}).appendTo(view);

			view.MenuItemsGrid = new SettingsGridControl({
				rows: 4,
				columns: 3,
				styles: {
					hOffset: 60,
					vOffset: 160,
					width: 1500,
					height: 280
				},
				events: {
					onNavigateDownRight: function(eventData) {
						if (FacebookService.isPaired() !== true) {
							view.facebookButton.focus();
						} else {
							if (TwitterService.isPaired() !== true) {
								view.twitterButton.focus();
							} else {
								view.ContentTimesGrid.focus();
							}
						}
					}
				}
			}).appendTo(view);

			view.facebookButton = new MAF.element.Button({
				content: [
					new MAF.element.Text({
						text: $_('PreferencesScreen_ConnectFacebook_Button'),
						anchorStyle: 'center',
						styles: {
							width: 379,
							height: 66,
							hAlign: 'center',
							vAlign: 'center'
						}
					})
				],
				styles: {
					vOffset: 468,
					hOffset: 70,
					width: 379,
					height: 66
				},
				events: {
					onAppend: function() {
						this.element.addClass('GeneralButtonNormal');
						console.log("facebookButton: onAppend");
					},
					onFocus: function() {
						this.element.addClass('GeneralButtonHighlight');
						this.element.removeClass('GeneralButtonNormal');
						console.log("facebookButton: onFocus");
					},
					onBlur: function() {
						this.element.addClass('GeneralButtonNormal');
						this.element.removeClass('GeneralButtonHighlight');
						console.log("facebookButton: onBlur");
					},
					onNavigate: function(eventData) {
						switch (eventData.payload.direction) {
							case "down":
								view.ContentTimesGrid.focus();
								break;
							case "right":
								if (TwitterService.isPaired() !== true) {
									view.twitterButton.focus();
								} else {
									view.ContentTimesGrid.focus();
								}
								break;
							case "up":
							case "left":
								view.MenuItemsGrid.focusCell(4);
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

			view.twitterButton = new MAF.element.Button({
				content: [
					new MAF.element.Text({
						text: $_('PreferencesScreen_ConnectTwitter_Button'),
						anchorStyle: 'center',
						styles: {
							width: 379,
							height: 66,
							hAlign: 'center',
							vAlign: 'center'
						}
					})
				],
				styles: {
					vOffset: 468,
					hOffset: 570,
					width: 379,
					height: 66
				},
				events: {
					onAppend: function() {
						this.element.addClass('GeneralButtonNormal');
						console.log("facebookButton: onAppend");
					},
					onFocus: function() {
						this.element.addClass('GeneralButtonHighlight');
						this.element.removeClass('GeneralButtonNormal');
						console.log("facebookButton: onFocus");
					},
					onBlur: function() {
						this.element.addClass('GeneralButtonNormal');
						this.element.removeClass('GeneralButtonHighlight');
						console.log("facebookButton: onBlur");
					},
					onNavigate: function(eventData) {
						switch (eventData.payload.direction) {
							case "left":
								if (FacebookService.isPaired() !== true) {
									view.facebookButton.focus();
								} else {
									view.MenuItemsGrid.focusCell(4);
									view.MenuItemsGrid.focus();
								}
								break;
							case "up":
								view.MenuItemsGrid.focusCell(4);
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
					vOffset: 650,
					width: 1500,
					height: 70
				},
				events: {
					onNavigateUpLeft: function(eventData) {
						if (FacebookService.isPaired() !== true) {
							view.facebookButton.focus();
						} else {
							if (TwitterService.isPaired() !== true) {
								view.twitterButton.focus();
							} else {
								view.MenuItemsGrid.focus();
							}
						}
					},
					onNavigateDownRight: function(eventData) {
						view.doneButton.focus();
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
					vOffset: 730,
					hOffset: 75
				}
			}).appendTo(view);

			view.doneButton = new MAF.element.Button({
				content: [
					new MAF.element.Text({
						text: $_('PreferencesScreen_Close_Button'),
						anchorStyle: 'center',
						styles: {
							width: 379,
							height: 66,
							hAlign: 'center',
							vAlign: 'center'
						}
					})
				],
				styles: {
					vOffset: 756,
					hOffset: 1239,
					width: 379,
					height: 66
				},
				events: {
					onAppend: function() {
						this.element.addClass('GeneralButtonNormal');
					},
					onFocus: function() {
						this.element.addClass('GeneralButtonHighlight');
						this.element.removeClass('GeneralButtonNormal');
					},
					onBlur: function() {
						this.element.addClass('GeneralButtonNormal');
						this.element.removeClass('GeneralButtonHighlight');
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
						ReportingHandler.sendProfileReport(FacebookService.isPaired(), TwitterService.isPaired(),
							menuItems, contentTime);
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
		ConfigurationStorageHandler.retrieveProfileSettings();
		this.bindData();
	},

	onProfileUnloaded: function(event) {
		Twitter.reset();
		Facebook.reset();
	},

	bindData: function() {
		this.facebookButton.show();
		this.twitterButton.show();
		if (ConfigurationStorageHandler.isSelected() === true) {
			if (TwitterService.isPaired() === true) {
				this.disableButton(this.twitterButton, true);
			} else {
				this.disableButton(this.twitterButton, false);
			}
			if (FacebookService.isPaired() === true) {
				this.disableButton(this.facebookButton, true);
			} else {
				this.disableButton(this.facebookButton, false);
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

	disableButton: function(button, disabled) {
		if (disabled === true) {
			button.setDisabled(disabled);
			button.element.removeClass('GeneralButtonNormal');
			button.element.removeClass('GeneralButtonHighlight');
			button.element.addClass("GeneralButtonDisabled");
		} else {
			button.setDisabled(disabled);
			button.element.removeClass("GeneralButtonDisabled");
			button.element.addClass('GeneralButtonNormal');
		}
	},

	facebookPaired: function(result, callbackParams) {
		if (result.first_name !== undefined) {
			callbackParams.view.disableButton(callbackParams.view.facebookButton, true);
			callbackParams.view.setFocus();
			FacebookService.getProfilePicture(function(url) {
				ConfigurationStorageHandler.updateProfileImage(url);
			});
		}
	},

	twitterPaired: function(result, callbackParams) {
		if (result.screen_name !== undefined) {
			callbackParams.view.disableButton(callbackParams.view.twitterButton, true);
		} else {
			callbackParams.view.setFocus();
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
		this.parent();
	}
});