var setNotification = function(message, startTime) {
	var startTime = moment(startTime).utc();
	if(startTime.isValid() === false) return;
	var currentTime = moment().utc();
	if(startTime > currentTime)
	{
		var diff = moment(startTime - currentTime).utc();
		var delayInSeconds = ((diff.hours() * 60) + diff.minutes() * 60) + diff.seconds();
		console.log("Store notification in " + diff.hours() + ":" + diff.minutes() + ":" + diff.seconds() +" or " + delayInSeconds + " seconds, message:" + message);
		
		(function () {
			console.log("Notification message:" + message);
			widget.notify(widget.getUrl("Images/icon.png"), message, MAF.Notification.ALERT);
		}).delay(delayInSeconds * 1000);
	}
};