var SidebarControl = new MAF.Class({
	ClassName: 'SidebarControl',

	Extends: MAF.element.Container,

	Protected: {
		createContent: function(collapsed) {	
			if(collapsed === true)
			{
				this.profileImage = new MAF.element.Image({
				source: 'Images/sidebar_profile_image.png',
				styles: {
					hOffset: 38,
					vOffset: 55
				}
				}).appendTo(this);

				this.profileHighlightImage = new MAF.element.Image({
				source: 'Images/sidebar_profile_image_high.png',
				styles: {
					hOffset: 3,
					vOffset: 27
				}
				}).appendTo(this);

				this.collapsedImage = new MAF.element.Image({
				source: 'Images/sidebar_collapsed_button.png',
				styles: {
					hOffset: 38,
					vOffset: 210
				}
				}).appendTo(this);
			}
			else
			{
				// this.backgroundContainer = new MAF.element.Container({
				// 	styles: {
				// 		backgroundImage: "Images/sidebar_overlay_expanded.png",
				// 		height: 'inherit',
				// 		width: 460					}
				// }).appendTo(this);

				// this.profileImage = new MAF.element.Image({
				// source: 'Images/sidebar_profile_image.png',
				// styles: {
				// 	hOffset: 38,
				// 	vOffset: 55
				// }
				// }).appendTo(this);

				// this.profileHighlightImage = new MAF.element.Image({
				// source: 'Images/sidebar_profile_image_high_expanded.png',
				// styles: {
				// 	hOffset: 3,
				// 	vOffset: 15
				// }
				// }).appendTo(this);
			}
		}
	},

	config: {
		focus: false
	},

	initialize: function() {
		this.parent();
		this.collapse();
		this.setStyles({
			width: 182,
			height:1080,
			position: 'relative',
			display: 'inline-block',
			backgroundImage:"Images/sidebar_overlay_collapsed.png"
		});
	},

	expand: function() {
		// this.setStyles({
		// 	width: 460
		// });
		this.createContent(false);
	},

	collapse: function() {
		// this.setStyles({
		// 	backgroundImage:"Images/sidebar_overlay_collapsed.png",
		//  	width: 183
		// });
		this.createContent(true);
	},

	suicide: function() {
		// delete this.backgroundContainer;
		// delete this.backgroundExpandedContainer;
		// delete this.profileImage;
		// delete this.profileHighlightImage;
		// delete this.collapsedImage;
		this.parent();
	}
});