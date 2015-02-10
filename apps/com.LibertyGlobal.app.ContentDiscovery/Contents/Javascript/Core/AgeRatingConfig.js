var AgeRatingConfig = function(ageRatingFromTVA) {
	var displayText = "";
	var countryLangCode = profile.languageCode.toLowerCase() + "-" + profile.countryCode.toUpperCase();
	for (var i = 0; i < ageRatingScheme.ClassificationScheme.Term.length; i++) {
		if (ageRatingScheme.ClassificationScheme.Term[i].termId === ageRatingFromTVA.toString()) {
			for (var j = 0; j < ageRatingScheme.ClassificationScheme.Term[i].Name.length; j++) {
				if (ageRatingScheme.ClassificationScheme.Term[i].Name[j].language === countryLangCode) {
					displayText = ageRatingScheme.ClassificationScheme.Term[i].Name[j].displayValue;
					break;
				}
			}
			break;
		}
	}
	return (displayText !== undefined) ? displayText : "";
};
