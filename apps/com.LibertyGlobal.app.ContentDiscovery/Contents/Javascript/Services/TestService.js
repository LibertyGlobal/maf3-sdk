var TestService = (function() {
	return {
		loadAssets: function(callback) {
			var url = 'http://lgi.io/kraken/v2/schedule/data/HU/broadcasts.json?maxBatchSize=7';
			//log(url);
			new Request({
				url: url,
				onSuccess: function(json) {
					console.log(json);

					if(MAF && MAF.messages) {
						debugger;
						json.data.forEach(function(asset, u){
							new Request({
								url: asset.selfLink.href,
								onSuccess: function(assetJson) {
									console.log(assetJson);
									//MAF.messages.store('BroadcastItems', json);
								},
								onError: function(e) {
									console.log("onError: " + e);
								},
								onFailure: function(e) {
									console.log("onFailure: " + e);
								}
							}).send();
						}, this);
					}
				},
				onError: function(e) {
					console.log("onError: " + e);
				},
				onFailure: function(e) {
					console.log("onFailure: " + e);
				}
			}).send();
		},
		loadAssetsFromFile: function() { 
			var url = 'http://localhost:63723/programs/contentdiscovery';
			new Request({
				url: url,
				onSuccess: function(json) {
					console.log(json);
					MAF.messages.store('TestAssets', json);
				},
				onError: function(e) {
					console.log("onError: " + e);
				},
				onFailure: function(e) {
					console.log("onFailure: " + e);
				}
			}).send();
		}
	};
})();