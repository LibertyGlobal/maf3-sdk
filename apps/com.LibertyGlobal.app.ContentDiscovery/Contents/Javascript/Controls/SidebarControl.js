var SidebarControl = new MAF.Class({
	ClassName: 'SidebarControl',

	Extends: MAF.element.Container,

	Protected: {
		dispatchEvents: function(event){
			this.parent(event);
			switch (event.detail.direction) {
				case 'right':
					this.fire("onNavigateRight");
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
				hOffset: 1,
				vOffset: 27,
				position: 'relative',
				display: 'inline-block'
				}
			}).appendTo(this.collapsedContainer);

			this.collapsedprofileImage = new MAF.element.Image({
			source: 'Images/sidebar_profile_image.png',
			styles: {				
				position: 'relative',
				display: 'inline',
				hOffset: 36,
				vOffset: -68
			}
			}).appendTo(this.collapsedContainer);

			this.collapsedButton = new MAF.element.Image({
			source: 'Images/sidebar_collapsed_button.png',
			styles: {
				hOffset: 38,
				vOffset: 210,
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
				hOffset: 3,
				vOffset: 27,
				position: 'relative',
				display: 'inline-block'
				}
			}).appendTo(this.expandedContainer);

			this.expandedprofileImage = new MAF.element.Image({
			source: 'Images/sidebar_profile_image.png',
			styles: {
				hOffset: -340,
				vOffset: -11,
				position: 'relative'
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
								sidebarControl.editProfileButton.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
						}						
					}
				},
				styles: {
					marginBottom: 10,	
					vOffset: 40,				
					hOffset: 23,
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
								sidebarControl.switchProfileButton.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
							case 'down':
								sidebarControl.aboutAppButton.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
						}						
					}
				},
				styles: {	
					marginBottom: 10,
					vOffset: 40,			
					hOffset: 23,
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
								sidebarControl.editProfileButton.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
							case 'down':
								sidebarControl.exitButton.setFocus();
								event.preventDefault();
								event.stopPropagation();
								break;
						}						
					}
				},
				styles: {	
					marginBottom: 10,
					vOffset: 40,				
					hOffset: 23,
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
					vOffset: 40,				
					hOffset: 23,
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
	},

	expand: function() {
		this.setStyles({
			width: 460,
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
	},

	collapse: function() {
		this.setStyles({
			width: 182,
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
		this.switchProfileButton.setFocus();
	},

	suicide: function() {
		this.parent();
	}
});