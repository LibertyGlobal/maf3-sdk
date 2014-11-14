var TwitterService = (function() {
	var CHARS_IN_LINK = 22;
	var TWEET_MAX_CHARS = 140;
	return {
		isPaired: function()
		{
			console.log("Twitter isPaired: " + Twitter.userId);
			return (Twitter.userId !== false);
		},

		pair: function(callback, callbackParams) {
			Twitter.api('me', function(result) {
				console.log('The result:', result);
				callback(result, callbackParams);
			});
		},

		postStatus: function (programTitle, image, text, callback, callbackParams) {
			var message = $_('Twitter_Message', [programTitle, text, image]);
			Twitter.api('/statuses/update.json', 'post', {
				status: message
			}, function (tweet) {
				callback(tweet.id ? true : false, callbackParams);
			});
		}
	};
})();