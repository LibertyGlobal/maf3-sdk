var FacebookService = (function() {
	return {
		isPaired: function() {
			console.log("facebook isPaired: " + Facebook.userId);
			return (Facebook.userId !== false);
		},

		pair: function(callback, callbackParams) {
			Facebook.api('me', function(result) {
				console.log('The result:', result);
				callback(result, callbackParams);
			});
		},

		postToTimeline: function(url, programTitle, image, title, description, text, callback) {
			var message = $_('Facebook_Timeline_Message', [programTitle, text]);
			var body = {
				message: message,
				name: title,
				link: url || LocaleUtils.getTvBuzzBaseURL()
			};
			if (image && image.toLowerCase().indexOf("http") > -1) body.picture = image;
			if (description) body.description = description;
			Facebook.api('/me/feed', 'get', body,
				function(response) {
					if (response.id)
						callback(true);
					else
						callback(false);
				}
			);
		}
	};
})();