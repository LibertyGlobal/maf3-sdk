var TwitterService = (function() {
	var CHARS_IN_LINK = 22;
	var TWEET_MAX_CHARS = 140;
	return {
		isPaired: function()
		{
			return (Twitter.userId !== false);
		},

		pair: function(callback, callbackParams) {
			//Twitter.api('me', 'get', {}, function(result) {
			Twitter.api('me', function(result) {
				callback(result, callbackParams);
			});
		},

		postStatus: function (message, callback, callbackParams) {
			Twitter.api('/statuses/update.json', 'post', {
				status: message
			}, function (tweet) {
				callback(tweet.id ? true : false, callbackParams);
			});
		}
	};
})();