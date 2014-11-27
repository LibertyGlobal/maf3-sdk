var AgeRatingConfig = function(ageRatingFromTVA) {
	var displayText = "";
	for (var i = 0; i < ageRatingScheme.ClassificationScheme.Term.length; i++) {
		if (ageRatingScheme.ClassificationScheme.Term[i].termId === ageRatingFromTVA) {
			for (var j = 0; j < ageRatingScheme.ClassificationScheme.Term[i].Name.length; j++) {
				if (ageRatingScheme.ClassificationScheme.Term[i].Name[j].language === countryLangCode) {
					displayText = ageRatingScheme.ClassificationScheme.Term[i].Name[j].language;
					break;
				}
			}
			break;
		}
	}
	return (displayText !== undefined) ? displayText : "";
};
