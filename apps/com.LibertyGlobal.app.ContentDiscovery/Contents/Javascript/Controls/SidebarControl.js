var SidebarControl = new MAF.Class({
	ClassName: 'SidebarControl',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event){
			this.parent(event);
			switch(event.type)
			{
				case "navigate":
					switch (event.detail.direction) {
						case 'right':
							this.fire("onNavigateRight");
						break;								
					}
				break;
				case "select":
					this.fire('onSelect', { action: this.focussedButton });
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
			
			this.switchProfileButton = new SidebarButtonControl({
				buttonText: $_('Sidebar_SwitchProfileButton'),
				events: {
					onNavigate: function(event){
						switch (event.payload.direction) {
							case 'up':
								event.preventDefault();
								event.stopPropagation();
								break;
							case 'down':
								sidebarControl.focussedButton = "edit";
								sidebarControl.editProfileButton.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
						}						
					}
				},
				styles: {
					marginBottom: 10,	
					vOffset: 85,				
					hOffset: 100,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this.expandedContainer);

			this.editProfileButton = new SidebarButtonControl({
				buttonText: $_('Sidebar_EditProfileButton'),
				events: {
					onNavigate: function(event){
						switch (event.payload.direction) {
							case 'up':
								sidebarControl.focussedButton = "switch";
								sidebarControl.switchProfileButton.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
							case 'down':
								sidebarControl.focussedButton = "about";
								sidebarControl.aboutAppButton.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
						}						
					}
				},
				styles: {	
					marginBottom: 10,
					vOffset: 85,			
					hOffset: 100,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this.expandedContainer);

			this.aboutAppButton = new SidebarButtonControl({
				buttonText: $_('Sidebar_AboutAppButton'),
				events: {
					onNavigate: function(event){
						switch (event.payload.direction) {
							case 'up':
								sidebarControl.focussedButton = "edit";
								sidebarControl.editProfileButton.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
							case 'down':
								sidebarControl.focussedButton = "exit";
								sidebarControl.exitButton.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
						}						
					}
				},
				styles: {	
					marginBottom: 10,
					vOffset: 85,				
					hOffset: 100,
					position: 'relative',
					display: 'inline-block'
				}
			}).appendTo(this.expandedContainer);

			this.exitButton = new SidebarButtonControl({
				buttonText: $_('Sidebar_ExitButton'),
				events: {
					onNavigate: function(event){
						switch (event.payload.direction) {
							case 'up':
								sidebarControl.focussedButton = "about";
								sidebarControl.aboutAppButton.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
							case 'down':
								event.preventDefault();
								event.stopPropagation();
								break;
						}						
					}
				},
				styles: {
					marginBottom: 10,
					vOffset: 85,				
					hOffset: 100,
					position: 'relative',
					display: 'inline-block'
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
	},

	setProfileName: function(profileName) {
		this.expandedprofileText.setText(profileName);
	},

	expand: function() {
		this.isCollapsed = false;
		this.setStyles({
			width: 580,
			height:1080,
			margin: 0,
			padding: 0,
			position: 'relative',
			display: 'inline-block',
			backgroundImage:"Images/sidebar_overlay_expanded.png"
		});
		this.collapsedContainer.hide();
		this.switchProfileButton.clearFocus();
		this.editProfileButton.clearFocus();
		this.aboutAppButton.clearFocus();
		this.exitButton.clearFocus();
		this.expandedContainer.show();	
		this.setFocus();	
	},

	collapse: function() {
		this.isCollapsed = true;
		this.setStyles({
			width: 240,
			height:1080,
			margin: 0,
			padding: 0,
			position: 'relative',
			display: 'inline-block',
			backgroundImage:"Images/sidebar_overlay_collapsed.png"
		});
		this.collapsedContainer.show();
		this.expandedContainer.hide();
	},

	setFocus: function() { 
		this.focussedButton = "switch";
		this.switchProfileButton.setFocus();
	},

	suicide: function() {
		this.parent();
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
	}
});