var ReportingHandler = {
	counterDetails: 0,
	counterBio: 0,

	clearCounters: function() {
		//console.log("clear counters");
		this.counterDetails = 0;
		this.counterBio = 0;
	},

	increaseCounterBio: function() {
		//console.log("Counter bio ++");
		this.counterBio++;
	},

	increaseCounterDetails: function() {
		//console.log("Counter details ++");
		this.counterDetails++;
	},

	sendProfileReport: function(connectFacebook, connectTwitter, categories, timeWindow) {
		var appModuleName = "cdtv_profile_" + profile.countryCode.toLowerCase();
		var parameters = '';
		parameters = parameters.concat("scId=", profile.household);
		parameters = parameters.concat("&userId=", profile.household);
		parameters = parameters.concat("&MafProfileName=", (profile.name !== undefined && profile.name !== '') ? this.hashString(profile.name) : "");
		parameters = parameters.concat("&connectFb=", (connectFacebook === true) ? "1" : "0");
		parameters = parameters.concat("&connectTw=", (connectTwitter === true) ? "1" : "0");
		parameters = parameters.concat("&timeWindow=", timeWindow);

		parameters = parameters.concat("&catMovies=", (categories.indexOf("movies") !== -1) ? "1" : "0");
		parameters = parameters.concat("&catSeries=", (categories.indexOf("series") !== -1) ? "1" : "0");
		parameters = parameters.concat("&catNews=", (categories.indexOf("news") !== -1) ? "1" : "0");
		parameters = parameters.concat("&catSocial=", (categories.indexOf("social") !== -1) ? "1" : "0");
		parameters = parameters.concat("&catEducation=", (categories.indexOf("education") !== -1) ? "1" : "0");
		parameters = parameters.concat("&catChildren=", (categories.indexOf("kids") !== -1) ? "1" : "0");
		parameters = parameters.concat("&catShow=", (categories.indexOf("show") !== -1) ? "1" : "0");
		parameters = parameters.concat("&catSports=", (categories.indexOf("sports") !== -1) ? "1" : "0");
		parameters = parameters.concat("&catArts=", (categories.indexOf("arts") !== -1) ? "1" : "0");
		parameters = parameters.concat("&catMusic=", (categories.indexOf("music") !== -1) ? "1" : "0");

		DataStorageService.postToDataStorage(appModuleName, parameters);
	},

	sendUsageReport: function(categoryName, exitMethod) {
		var appModuleName = "cdtv_usage_" + profile.countryCode.toLowerCase();
		var parameters = '';
		parameters = parameters.concat("scId=", profile.household);
		parameters = parameters.concat("&userId=", profile.household);
		parameters = parameters.concat("&exitMethod=", exitMethod);
		parameters = parameters.concat("&catSelected=", categoryName);
		parameters = parameters.concat("&counterDetails=", this.counterDetails);
		parameters = parameters.concat("&counterBio=", this.counterBio);
		parameters = parameters.concat("&counterReminders=", ReminderHandler.getReminderCount());

		DataStorageService.postToDataStorage(appModuleName, parameters);
	},

	hashString: function(s) {
		// TODO
		// var hash = 0,
		// strlen = s.length,
		// i,
		// c;
		// if (strlen === 0) {
		// return hash;
		// }
		// for (i = 0; i < strlen; i++) {
		// c = s.charCodeAt(i);
		// hash = ((hash << 5) - hash) + c;
		// hash = hash & hash; // Convert to 32bit integer
		// }
		// return hash;
		return s;
	},

	cleanUp: function() {}
};