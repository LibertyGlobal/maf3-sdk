var Config = (function () {
	var values = {};
	var defaultEnv = 'live';

	var merge = function (baseset, set) {
		var result = {};
		var key = '';
		for (key in baseset) {
			result[key] = baseset[key];
		}
		for (key in set) {
			result[key] = set[key];
		}
		return result;
	};

	return {
		get: function(key) {
			return values[key] || "";
		},

		getEnv: function () {

			// see if there is an env set in the query string:
			var qsEnv = (function () {
				var match,
					pl = /\+/g,  // Regex for replacing addition symbol with a space
					search = /([^&=]+)=?([^&]*)/g,
					decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
					query = window.location.search.substring(1);

				var urlParams = {};
				match = search.exec(query);
				while(match) {
					urlParams[decode(match[1])] = decode(match[2]);
					match = search.exec(query);
				}
				if(urlParams.env)
					return urlParams.env;
				return '';
			})();

			var url = window.location.pathname;
			var filename = url.substring(url.lastIndexOf('/')+1);

			var env;
			if(qsEnv)
				env = qsEnv;
			else
				env = defaultEnv;

			// if set in query string, load that; otherwise use env in query string param
			return env;
		},

		load: function (environment) {
			var env = environment || this.getEnv();
			//log("Loading env: "+env);	
			values = merge(this.common, this[env]);
		},

		loadCountryConfig: function(countryCode) {
			values = merge(values, this[countryCode]);
		}
	};
})();