var ShareScreen = new MAF.Class({
	ClassName: 'ShareScreen',
	Extends: MAF.system.FullscreenView,

	// Add array of items on constructor of the class
	initialize: function() {
		var view = this;
		view.shareTextArray = [];
		view.currentItem = null;
		view.parent();
		this.updateData(view);
	},

	updateData: function(view) {
		LGI.Guide.Broadcast.create()
			.fields(LGI.Guide.Broadcast.ID, LGI.Guide.Broadcast.TITLE, LGI.Guide.Broadcast.START, LGI.Guide.Broadcast.END,
				LGI.Guide.Broadcast.AGE_RATING, LGI.Guide.Broadcast.CAST, LGI.Guide.Broadcast.CHANNEL,
				LGI.Guide.Broadcast.POPULARITY, LGI.Guide.Broadcast.SEASON, LGI.Guide.Broadcast.EPISODE,
				LGI.Guide.Broadcast.STATISTICS, LGI.Guide.Broadcast.POPULARITY, 'video.year', "video.language",
				"video.shortSynopsis", LGI.Guide.Broadcast.IMAGE_LINK, LGI.Guide.Broadcast.CATEGORY, "video.subcategory")
			.filter(LGI.Guide.Broadcast.ID.equalTo(this.persist.assetId))
			.findOne(function(response) {
				if (response.length > 0) {
					view.currentItem = response[0];
					view.elements.Poster.setSource(view.currentItem.video.imageLink.href.replace("https", "http"));
					view.elements.Title.setText(view.currentItem.video.title);
					view.shareTextArray = $_('ShareScreen_EmptyMessage_Text', [view.currentItem.video.title]).split();
					view.elements.ShareText.setText(view.shareTextArray.join(''));
					view.controls.shareButton.focus();
				}
			});
	},

	// Create your view template
	createView: function() {
		var view = this;
		view.elements.backgroundImageNormal = new MAF.element.Image({
			source: 'Images/background_main.jpg'
		}).appendTo(view);

		view.controls.sideBarContainer = new SidebarControl({}).appendTo(view);

		view.elements.rightContainer = new MAF.element.Container({
			styles: {
				height: 1080,
				width: 1680,
				position: 'relative',
				display: 'inline-block'
			}
		}).appendTo(view);

		view.elements.Title = new MAF.element.Text({
			styles: {
				color: '#FFFFFF',
				fontFamily: 'InterstatePro-Light, sans-serif',
				fontSize: 50,
				width: 'inherit' - 20,
				truncation: 'end',
				vOffset: 80,
				hOffset: 50,
				margin: 0,
				padding: 0
			}
		}).appendTo(view.elements.rightContainer);

		view.elements.PosterContainer = new MAF.element.Container({
			styles: {
				vOffset: 170,
				hOffset: 50,
				height: 374,
				width: 260,
				backgroundColor: '#b2bfcb',
				padding: 1
			}
		}).appendTo(view.elements.rightContainer);
		view.elements.Poster = new MAF.element.Image({
			styles: {
				height: 372,
				width: 258
			}
		}).appendTo(view.elements.PosterContainer);

		view.elements.ShareTextContainer = new MAF.element.Container({
			styles: {
				height: 374,
				width: 1002,
				vOffset: 170,
				hOffset: 332,
				borderWidth: 2,
				borderColor: '#b2bfcb',
				borderStyle: 'solid',
				padding: 1
			}
		}).appendTo(view.elements.rightContainer);

		view.elements.ShareTextBackgroundContainer = new MAF.element.Container({
			styles: {
				background: '#FFFFFF',
				opacity: 0.05,
				height: 372,
				width: 1000
			}
		}).appendTo(view.elements.ShareTextContainer);
		view.elements.ShareText = new MAF.element.TextField({
			editable: true,
			visibleLines: 9,
			totalLines: 9,
			styles: {
				color: '#bddae9',
				fontFamily: 'InterstatePro-Light, sans-serif',
				fontSize: 30,
				height: 352,
				width: 970,
				vOffset: 180,
				hOffset: 347,
				wrap: true
			},
			events: {
				onBlur: function() {
					view.elements.ShareTextContainer.setStyles({
						borderColor: "#b2bfcb",
						borderWidth: 2
					});
				},
				onFocus: function() {
					view.elements.ShareTextContainer.setStyles({
						borderColor: "#FFFFFF",
						borderWidth: 3
					});
				},
				onNavigate: function(event) {
					switch (event.payload.direction) {
						case 'down':
							view.controls.horizontalMenu.setFocus();
							event.preventDefault();
							event.stopPropagation();
							break;
					}
				},
				onKeyDown: function(event) {
					screen.log("key pressed: " + event.payload.key + ", " + event.payload.keyCode + ", length: " + view.shareTextArray.length);
					if (event.payload.key === "back") //"backspace")
					{
						view.shareTextArray.pop();
						event.preventDefault();
						event.stopPropagation();
					} else if (event.payload.key === "space") {
						view.shareTextArray.push(' ');
						event.preventDefault();
						event.stopPropagation();
					} 
					else if (event.payload.key.length === 1 || (event.payload.key.substring(0, 2) === "\\u")) {
						if (view.shareTextArray.length <= 500) {
							view.shareTextArray.push(event.payload.key);
						}
						var twitterButton = view.controls.horizontalMenu.getButton(2);
						if (view.shareTextArray.length > 140) {
							twitterButton.setSelected(true);
							twitterButton.setDisabled(true);
						} else {
							twitterButton.setDisabled(false);
						}
						event.preventDefault();
						event.stopPropagation();
					}
					//console.log("data after: " + view.shareTextArray.join(''));
					view.elements.ShareText.setText(view.encodeText(view.shareTextArray.join('')));
				}
			}
		}).appendTo(view.elements.rightContainer);

		view.elements.FacebookImage = new MAF.element.Image({
			source: 'Images/facebook_logo.png',
			styles: {
				vOffset: 170,
				hOffset: 1352
			}
		}).appendTo(view.elements.rightContainer);

		view.elements.TwitterImage = new MAF.element.Image({
			source: 'Images/twitter_logo.png',
			styles: {
				vOffset: 257,
				hOffset: 1352
			}
		}).appendTo(view.elements.rightContainer);

		view.controls.horizontalMenu = new HorizontalMenuControl({
			button1Text: $_('ShareScreen_ExcludeFacebook_Button'),
			button1Type: "check",
			button2Text: $_('ShareScreen_ExcludeTwitter_Button'),
			button2Type: "check",
			button3Text: $_('ShareScreen_ClearAll_Button'),
			styles: {
				height: 72,
				width: 1002,
				vOffset: 560,
				hOffset: 332
			},
			events: {
				onNavigate: function(event) {
					switch (event.payload.direction) {
						case 'down':
							view.controls.shareButton.setFocus();
							event.preventDefault();
							event.stopPropagation();
							break;
					}
				},
				onButtonSelect: function(eventData) {
					switch (eventData.payload.action) {
						case 1:
							break;
						case 2:
							break;
						case 3:
							view.elements.ShareText.setText("");
							break;
					}
				}
			}
		}).appendTo(this.elements.rightContainer);

		view.controls.backButton = new ButtonControl({
			buttonText: $_('ShareScreen_Back_Button'),
			styles: {
				vOffset: 680,
				hOffset: 552,
				width: 379,
				height: 66
			},
			events: {
				onNavigate: function(eventData) {
					switch (eventData.payload.direction) {
						case "left":
						case "up":
							view.controls.horizontalMenu.setFocus();
							break;
						case "right":
							view.controls.shareButton.setFocus();
							break;
						case "down":
							break;
					}
					eventData.preventDefault();
					eventData.stopPropagation();
				},
				onSelect: function() {
					MAF.application.loadView('view-MainScreen');
				}
			}
		}).appendTo(this.elements.rightContainer);

		view.controls.shareButton = new ButtonControl({
			buttonText: $_('ShareScreen_Send_Button'),
			styles: {
				vOffset: 680,
				hOffset: 955,
				width: 379,
				height: 66
			},
			events: {
				onNavigate: function(eventData) {
					switch (eventData.payload.direction) {
						case "left":
							view.controls.backButton.setFocus();
							break;
						case "up":
							view.controls.horizontalMenu.setFocus();
							break;
						case "right":
						case "down":
							break;
					}
					eventData.preventDefault();
					eventData.stopPropagation();
				},
				onSelect: function() {
					if (view.controls.horizontalMenu.getButton(1).isSelected() === false) // share facebook
					{
						FacebookService.postToTimeline(
							Config.common.facebookDefaultUrl,
							view.shareTextArray.join(''),  
							view.currentItem.video.imageLink.href,
							view.currentItem.video.title,							
							view.currentItem.video.shortSynopsis,
							view.facebookCompleted);
					}
					if (view.controls.horizontalMenu.getButton(2).isSelected() === false) // share twitter
					{
						TwitterService.postStatus(view.shareTextArray.join(''), 
							view.twitterCompleted, []);
					}
				}
			}
		}).appendTo(this.elements.rightContainer);
		view.controls.shareButton.setFocus();
	},

	facebookCompleted: function(result)
	{
		// TODO
		console.log("facebookCompleted: " + result);
	},

	twitterCompleted: function(result, params)
	{
		// TODO
		console.log("twitterCompleted: " + result);
	},

	encodeText: function(textToEncode) {
		var encoded = textToEncode.replace(/</g, "&lt;");
		encoded = encoded.replace(/>/g, "&gt;");
		return encoded;
	},

	updateView: function() {
		var view = this;
		view.elements.Poster.setSource();
		view.elements.Title.setText("");
		view.elements.ShareText.setText("");
		var facebookButton = view.controls.horizontalMenu.getButton(1);
		var twitterButton = view.controls.horizontalMenu.getButton(2);
		facebookButton.setDisabled(true);
		facebookButton.setSelected(true);
		twitterButton.setDisabled(true);
		twitterButton.setSelected(true);
		if (ProfileHandler.isSelected() === true) {
			if (TwitterService.isPaired() === true) {
				twitterButton.setDisabled(false);
				twitterButton.setSelected(false);
			}
			if (FacebookService.isPaired() === true) {
				facebookButton.setDisabled(false);
				facebookButton.setSelected(false);
			}
		}
		view.shareTextArray = [];
		view.currentItem = null;
		this.updateData(view);
	},

	destroyView: function() {
		var view = this;
		delete view.shareTextArray;
		delete view.currentItem;
		delete view.elements.backgroundImageNormal;
		delete view.controls.sideBarContainer;
		delete view.elements.rightContainer;
		delete view.elements.Poster;
		delete view.elements.PosterContainer;
		delete view.elements.Title;
		delete view.elements.ShareTextContainer;
		delete view.elements.ShareTextBackgroundContainer;
		delete view.elements.ShareText;
		delete view.elements.FacebookImage;
		delete view.elements.TwitterImage;
		delete view.controls.horizontalMenu;
		delete view.controls.backButton;
		delete view.controls.shareButton;
	}
});