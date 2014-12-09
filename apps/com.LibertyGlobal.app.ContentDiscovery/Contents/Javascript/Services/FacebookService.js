var FacebookService = (function() {
	return {
		isPaired: function() {
			return (Facebook.userId !== false);
		},

		pair: function(callback, callbackParams) {
			Facebook.api('me', function(result) {
				callback(result, callbackParams);
			});
		},

		postToTimeline: function(url, message, image, title, description, callback) {
			//console.log("postToTimeline: " + url + ", " + message + ", " + image + ", " + title + ", " + description);
			var body = {
				message: message,
				name: title,
				url: url,
				link: url
			};
			if (image && image.toLowerCase().indexOf("http") > -1) body.picture = image;
			if (description) body.description = description;
			Facebook.api('/me/feed', 'post', body,
				function(response) {
					if (response.id)
						callback(true);
					else
						callback(false);
				}
			);
		},

		getProfilePicture: function(callback) {
			var body = {
				height: 58,
				width: 58,
				type: 'square'
			};
			Facebook.api('/me/picture?redirect=0', 'get', body,
				function(response) {
					if (response.data !== undefined)
						callback(response.data.url);
					else
						callback('');
				}
			);
		}
	};
})();