var SidebarControl = new MAF.Class({
	ClassName: 'SidebarControl',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event) {
			this.parent(event);
			switch (event.type) {
				case "navigate":
					switch (event.detail.direction) {
						case 'right':
							this.fire("onNavigateRight");
							break;
					}
					break;
				case "select":
					this.fire('onSelect', {
						action: this.focussedButton
					});
					break;
			}

		},
		createContent: function() {
			var sidebarControl = this;
			this.collapsedContainer = new MAF.element.Container({
				styles: {
					height: 'inherit',
					width: 'inherit'
				}
			}).appendTo(sidebarControl);

			this.collapsedprofileHighlightImage = new MAF.element.Image({
				source: 'Images/sidebar_profile_image_high.png',
				styles: {
					hOffset: 65,
					vOffset: 65,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this.collapsedContainer);

			this.collapsedprofileImage = new MAF.element.Image({
				aspect: 'auto',
				source: 'Images/sidebar_profile_image.png',
				styles: {
					position: 'relative',
					display: 'inline',
					hOffset: -29,
					vOffset: 27
				}
			}).appendTo(this.collapsedContainer);

			this.collapsedButton = new MAF.element.Image({
				source: 'Images/sidebar_collapsed_button.png',
				styles: {
					hOffset: 100,
					vOffset: 214,
					position: 'absolute'
				}
			}).appendTo(this.collapsedContainer);

			this.expandedContainer = new MAF.element.Container({
				styles: {
					height: 'inherit',
					width: 'inherit'
				}
			}).appendTo(sidebarControl);

			this.expandedprofileHighlightImage = new MAF.element.Image({
				source: 'Images/sidebar_profile_image_high_expanded.png',
				styles: {
					hOffset: 85,
					vOffset: 65,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this.expandedContainer);

			this.expandedprofileImage = new MAF.element.Image({
				aspect: 'auto',
				source: 'Images/sidebar_profile_image.png',
				styles: {
					hOffset: -260,
					vOffset: 27,
					position: 'relative'
				}
			}).appendTo(this.expandedContainer);

			this.expandedprofileText = new MAF.element.Text({
				styles: {
					color: '#ffffff',
					fontFamily: 'InterstatePro-Light, sans-serif',
					fontSize: 36,
					hOffset: 188,
					vOffset: 100,
					width: 245,
					truncation: 'end'
				}
			}).appendTo(this.expandedContainer);

			this.switchProfileButton = new MAF.element.Button({
				content: [
					new MAF.element.Text({
						text: $_('Sidebar_SwitchProfileButton'),
						styles: {
							anchorStyle: 'leftMiddle',
							width: 346,
							height: 79,
							marginLeft: 25
						}
					})
				],
				styles: {
					vOffset: 195,
					hOffset: 100,
					width: 346,
					height: 79
				},
				events: {
					onAppend: function() {
						this.element.removeClass('SidebarButtonHighlight');
						this.element.addClass('SidebarButtonNormal');
					},
					onFocus: function() {
						this.element.addClass('SidebarButtonHighlight');
						this.element.removeClass('SidebarButtonNormal');
					},
					onBlur: function() {
						this.element.addClass('SidebarButtonNormal');
						this.element.removeClass('SidebarButtonHighlight');
					},
					onSelect: function() {
						sidebarControl.focussedButton = "switch";
					}
				}
			}).appendTo(this.expandedContainer);

			this.editProfileButton = new MAF.element.Button({
				content: [
					new MAF.element.Text({
						text: $_('Sidebar_EditProfileButton'),
						styles: {
							anchorStyle: 'leftMiddle',
							width: 346,
							height: 79,
							marginLeft: 25
						}
					})
				],
				styles: {
					vOffset: 284,
					hOffset: 100,
					width: 346,
					height: 79
				},
				events: {
					onAppend: function() {
						this.element.removeClass('SidebarButtonHighlight');
						this.element.addClass('SidebarButtonNormal');
					},
					onFocus: function() {
						this.element.addClass('SidebarButtonHighlight');
						this.element.removeClass('SidebarButtonNormal');
					},
					onBlur: function() {
						this.element.addClass('SidebarButtonNormal');
						this.element.removeClass('SidebarButtonHighlight');
					},
					onSelect: function() {
						sidebarControl.focussedButton = "edit";
					}
				}
			}).appendTo(this.expandedContainer);

			this.aboutAppButton = new MAF.element.Button({
				content: [
					new MAF.element.Text({
						text: $_('Sidebar_AboutAppButton'),
						styles: {
							anchorStyle: 'leftMiddle',
							width: 346,
							height: 79,
							marginLeft: 25
						}
					})
				],
				styles: {
					vOffset: 373,
					hOffset: 100,
					width: 346,
					height: 79
				},
				events: {
					onAppend: function() {
						this.element.removeClass('SidebarButtonHighlight');
						this.element.addClass('SidebarButtonNormal');
					},
					onFocus: function() {
						this.element.addClass('SidebarButtonHighlight');
						this.element.removeClass('SidebarButtonNormal');
					},
					onBlur: function() {
						this.element.addClass('SidebarButtonNormal');
						this.element.removeClass('SidebarButtonHighlight');
					},
					onSelect: function() {
						sidebarControl.focussedButton = "about";
					}
				}
			}).appendTo(this.expandedContainer);

			this.exitButton = new MAF.element.Button({
				content: [
					new MAF.element.Text({
						text: $_('Sidebar_ExitButton'),
						styles: {
							anchorStyle: 'leftMiddle',
							width: 346,
							height: 79,
							marginLeft: 25
						}
					})
				],
				styles: {
					vOffset: 462,
					hOffset: 100,
					width: 346,
					height: 79
				},
				events: {
					onAppend: function() {
						this.element.removeClass('SidebarButtonHighlight');
						this.element.addClass('SidebarButtonNormal');
					},
					onFocus: function() {
						this.element.addClass('SidebarButtonHighlight');
						this.element.removeClass('SidebarButtonNormal');
					},
					onBlur: function() {
						this.element.addClass('SidebarButtonNormal');
						this.element.removeClass('SidebarButtonHighlight');
					},
					onSelect: function() {
						sidebarControl.focussedButton = "exit";
					}
				}
			}).appendTo(this.expandedContainer);
		}
	},

	config: {
		render: true,
		focus: false
	},

	initialize: function() {
		this.parent();
		this.createContent();
		this.collapse();
		this.isCollapsed = true;
		this.focussedButton = "switch";
		this.updateProfilePicture();
	},

	setProfileName: function(profileName) {
		this.expandedprofileText.setText(profileName);
	},

	updateProfilePicture: function() {
		this.collapsedprofileImage.setSource(ConfigurationStorageHandler.getProfileImage());
		this.expandedprofileImage.setSource(ConfigurationStorageHandler.getProfileImage());
	},

	expand: function() {
		this.isCollapsed = false;
		this.setStyles({
			width: 580,
			height: 1080,
			margin: 0,
			padding: 0,
			position: 'relative',
			display: 'inline-block',
			backgroundImage: "Images/sidebar_overlay_expanded.png"
		});
		this.collapsedContainer.hide();
		this.expandedContainer.show();
		this.setFocus();
	},

	collapse: function() {
		this.isCollapsed = true;
		this.setStyles({
			width: 240,
			height: 1080,
			margin: 0,
			padding: 0,
			position: 'relative',
			display: 'inline-block',
			backgroundImage: "Images/sidebar_overlay_collapsed.png"
		});
		this.collapsedContainer.show();
		this.expandedContainer.hide();
	},

	setFocus: function() {
		this.focussedButton = "switch";
		this.switchProfileButton.focus();
	},

	suicide: function() {
		delete this.collapsedContainer;
		delete this.collapsedprofileHighlightImage;
		delete this.collapsedprofileImage;
		delete this.collapsedButton;
		delete this.expandedContainer;
		delete this.expandedprofileHighlightImage;
		delete this.expandedprofileImage;
		delete this.expandedprofileText;
		delete this.switchProfileButton;
		delete this.editProfileButton;
		delete this.aboutAppButton;
		delete this.exitButton;
		this.parent();
	}
});