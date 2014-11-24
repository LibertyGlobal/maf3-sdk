var setNotification = function(title, channel, channelNr, startTime) {
	var startTimeAsset = moment(startTime).utc();
	if(startTimeAsset.isValid() === false) return;
	var currentTime = moment().utc();
	if(startTimeAsset > currentTime)
	{
		var diff = moment(startTimeAsset - currentTime).utc();
		var delayInSeconds = ((diff.hours() * 60) + diff.minutes() * 60) + diff.seconds();
		console.log("Store notification in " + diff.hours() + ":" + diff.minutes() + ":" + diff.seconds() +" or " + delayInSeconds + " seconds, message:" + title + ", " + channel + ":" + channelNr);
		
		(function () {
			//widget.notify(widget.getUrl("Images/icon.png"), [, "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"], MAF.Notification.C2A); 
			//widget.notify(widget.getUrl("Images/icon.png"), "title to display: " + title, MAF.Notification.ALERT);
			//screen.log("Notify: " + title);
			widget.notify(widget.getUrl("Images/icon.png"), 
			[$_('App_Title'), $_('Notification1_Text', [title]),
				$_('Notification2_Text', [channel, channelNr])
			],
			MAF.Notification.CALL2ACTION);
		}).delay(delayInSeconds * 1000);
	}
};