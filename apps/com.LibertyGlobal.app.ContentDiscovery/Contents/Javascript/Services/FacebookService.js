var FacebookService = (function() {
	return {
		isPaired: function() {
			return (Facebook.userId !== false);
		},

		pair: function(callback, callbackParams) {
			Facebook.api('v2.2/me', function(result) {
				callback(result, callbackParams);
			});
		},

		postToTimeline: function(url, message, image, title, description, callback, callbackParams) {
			var body = {
				message: message,
				name: title,
				url: url,
				link: url
			};
			if (image && image.toLowerCase().indexOf("http") > -1) body.picture = image;
			if (description) body.description = description;
			Facebook.api('v2.2/me/feed', 'post', body,
				function(response) {
					if (response.id)
						callback(true, callbackParams);
					else
						callback(false, callbackParams);
				}
			);
		},

		getProfilePicture: function(callback) {
			var body = {
				height: 58,
				width: 58,
				type: 'square'
			};
			Facebook.api('v2.2/me/picture?redirect=0', 'get', body,
				function(response) {
					if (response.data !== undefined)
					{
						callback(response.data.url);
					}
					else
						callback('');
				}
			);
		}
	};
})();