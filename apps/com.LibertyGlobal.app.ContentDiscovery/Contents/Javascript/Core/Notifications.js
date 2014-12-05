var setNotification = function(title, channel, channelNr, startTime) {
	var startTimeAsset = moment(startTime).utc();
	if(startTimeAsset.isValid() === false) return;
	var currentTime = moment().utc();
	console.log("set notfication: " +startTimeAsset + ", " + currentTime);
	if(startTimeAsset > currentTime)
	{
		var diff = moment(startTimeAsset - currentTime).utc();
		var delayInSeconds = ((diff.hours() * 60) + diff.minutes() * 60) + diff.seconds();
		console.log("Store notification in " + diff.hours() + ":" + diff.minutes() + ":" + diff.seconds() +" or " + delayInSeconds + " seconds, message:" + title + ", " + channel + ":" + channelNr);
		
		(function () {
			console.log("Notification: " + $_('Notification_Line1_Text', [title]) + ", " + $_('Notification_Line2_Text', [channel, channelNr]));
			widget.notify(widget.getUrl("Images/icon.png"), 
					[$_('App_Title'), $_('Notification_Line1_Text', [title]), $_('Notification_Line2_Text', [channel, channelNr])],
					MAF.Notification.ALERT);
		}).delay(delayInSeconds * 1000);
	}
};