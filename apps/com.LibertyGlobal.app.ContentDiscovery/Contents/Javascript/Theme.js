Theme.Fonts.add('InterstatePro-Bold', 'Fonts/InterstatePro-Bold');
Theme.Fonts.add('InterstatePro-ExtraLight', 'Fonts/InterstatePro-ExtraLight');
Theme.Fonts.add('InterstatePro-Light', 'Fonts/InterstatePro-Light');
Theme.Fonts.add('UPCDigital-Bold', 'Fonts/UPCDigital-Bold');
Theme.Fonts.add('UPCDigital-Regular', 'Fonts/UPCDigital-Regular');

Theme.set({
	view: {
		styles: {}
	},
	'SidebarButtonHighlight': {
		styles: {
			backgroundImage: 'Images/sidebar_button_high_expanded.png',
			fontSize: 32,
			opacity: 1.00,
			fontFamily: 'InterstatePro-Light',
			color: '#FFFFFF'
		}
	},
	'SidebarButtonNormal': {
		styles: {
			backgroundImage: '',
			fontSize: 32,
			opacity: 0.32,
			fontFamily: 'InterstatePro-Light',
			color: '#FFFFFF'
		}
	}
});