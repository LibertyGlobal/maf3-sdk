var DataStorageService = (function() {
	return {
		postToDataStorage: function(appModName, parametersStr) {
			var requestUrl = Config.get('dataStorageUrl') +
				"appId=" + Config.get('dataStorageAppId') +
				"&appModType=datastorage&appModName=" + appModName +
				"&appModVersion=" + Config.get('dataStorageAppModVersion') + 
				"&stcDateTime=" + moment().utc().format('YYYY-MM-DD HH:mm:ss');

			if (parametersStr !== '') {
				requestUrl = requestUrl + "&" + parametersStr;
			}

			new Request({
				method: "POST",
				url: requestUrl,
				proxy: false
			}).send();
		}
	};
})();