var setNotification = function(message, startTime) {
	//if(moment(startTime).isValid() === false) return;
	var minutes = 2;
	(function () {
		widget.notify(widget.getUrl("Images/icon.png"), message, MAF.Notification.ALERT);
	}).delay(minutes * 60000);
};