var AssetCarouselCellEmptyFocusControl = new MAF.Class({
	ClassName: 'AssetCarouselCellEmptyFocusControl',

	Extends: MAF.element.Container,

	Protected: {
		generateContents: function() {
			var view = this;
			this.futureContainer = new MAF.element.Container({
				styles: {
					height: 'inherit',
					width: 'inherit',
					padding: 4
				}
			}).appendTo(this);

			this.Title = new MAF.element.TextField({
				totalLines: 3,
				visibleLines: 3,
				styles: {
					color: '#000000',
					fontFamily: 'InterstatePro-ExtraLight',
					fontSize: 40,
					vOffset: 40,
					hOffset: 35,
					width: 770,
					wrap: true,
					truncation: 'end'
				}
			}).appendTo(this);

			this.SubTitle = new MAF.element.TextField({
				totalLines: 3,
				visibleLines: 3,
				styles: {
					color: '#000000',
					fontFamily: 'InterstatePro-ExtraLight',
					fontSize: 30,
					vOffset: 240,
					hOffset: 35,
					width: 770,
					wrap: true,
					truncation: 'end'
				}
			}).appendTo(this);

			this.ReloadButton = new ButtonControl({
				buttonText: $_('MainScreen_Asset_Focus_ShowLaterContent_Button'),
				styles: {
					vOffset: 360,
					hOffset: 35,
					width: 379,
					height: 66
				},
				events: {
					onSelect: function(event) {
						console.log("onReload AssetCarouselEmptyFocus");
						view.fire("onReload", {});
						event.preventDefault();
						event.stopPropagation();
					}
				}
			}).appendTo(this);
			this.ReloadButton.hide();
		}
	},

	config: {
		render: true,
		focus: true
	},

	initialize: function() {
		this.parent();
		this.generateContents();
	},

	setFocus: function() {
		this.ReloadButton.focus();
	},

	changeData: function(emptyType, menuItemText, menuItemTimeWindow) {
		this.Title.setText("");
		this.SubTitle.setText("");
		this.ReloadButton.hide();
		switch (emptyType) {
			case "empty":
				var emptyText = "";
				if(menuItemTimeWindow < 60)
				{
					emptyText = $_('MainScreen_Asset_Focus_NoDataTitle', [menuItemText, menuItemTimeWindow]);
					emptyText = emptyText + $_('MainScreen_Asset_Focus_Minutes');
				}
				else
				{
					var period = menuItemTimeWindow / 60;
					emptyText = $_('MainScreen_Asset_Focus_NoDataTitle', [menuItemText, period]);
					emptyText = emptyText + $_('MainScreen_Asset_Focus_Hours');
				}

				this.Title.setText(emptyText);
				this.SubTitle.setText($_('MainScreen_Asset_Focus_NoDataSubTitle'));
				this.ReloadButton.show();
				break;
			case "loading":
				this.Title.setText($_('MainScreen_Asset_Focus_LoadingTitle'));
				this.SubTitle.setText($_('MainScreen_Asset_Focus_LoadingSubTitle'));
				break;
		}
	},

	suicide: function() {		
		delete this.futureContainer;
		delete this.Title;
		delete this.SubTitle;
		delete this.ReloadButton;
		this.parent();
	}
});