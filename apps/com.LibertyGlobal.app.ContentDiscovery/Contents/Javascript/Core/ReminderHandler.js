var ReminderHandler = (function() {
	var reminders = [];

	return {
		initialize: function() {			
			//reminders = ConfigurationStorageHandler.getAppReminderStorage();
			console.log("initialize: " + reminders.length);
		},

		setReminder: function(id, start, title, channelName, channelNr) {
			console.log("current reminders: " + reminders.length);
			console.log("setReminder: " + id + ", " + title + ", " + start);
			var reminder = new AssetReminder(id, start, title, channelName, channelNr);
			var startTimeAsset = moment(reminder.start).utc();
			if (startTimeAsset.isValid() === false) return;
			var currentTime = moment().utc();			
			if (startTimeAsset > currentTime) {
				var diff = moment(startTimeAsset - currentTime).utc();
				var delayInSeconds = ((diff.hours() * 60) + diff.minutes() * 60) + diff.seconds();
				console.log("Store notification in " + diff.hours() + ":" + diff.minutes() + ":" + diff.seconds() + " or " + delayInSeconds + " seconds, message:" + reminder.title + ", " + reminder.channelName + ":" + reminder.channelNr);

				if (reminder.timer === null) {
					reminder.timer = new Timer(delayInSeconds, function() {
						console.log("Notification: " + $_('Notification_Line1_Text', [reminder.title]) + ", " + $_('Notification_Line2_Text', [reminder.channelName, reminder.channelNr]));
						widget.notify(widget.getUrl("Images/icon.png"), [$_('App_Title'),
								$_('Notification_Line1_Text', [reminder.title]),
								$_('Notification_Line2_Text', [reminder.channelName, reminder.channelNr])
							],
							MAF.Notification.ALERT);
						ReminderHandler.removeReminder(reminder.assetId);
					});
					reminder.timer.start();
				}
				reminders.push(reminder);
			}
		},

		removeReminder: function(assetId) {
			console.log("removeReminder: " + assetId);
			var index = -1;
			for (var i = 0; i < reminders.length; i++)
				if (reminders[i].assetId === assetId)
					index = i;

			var reminder = reminders.splice(index, 1);
			if (reminder.timer !== null && reminder.timer !== undefined) {
				reminder.timer.stop();
				reminder.timer = null;
			}
		},

		isReminderSet: function(assetId) {
			console.log("Check reminder set: " + assetId + ", " + reminders.length);
			var found = false;
			for (var i = 0; i < reminders.length; i++)
				if (reminders[i].assetId === assetId)
					found = true;
			return found;
		},

		cleanUp: function() {
			//ConfigurationStorageHandler.setAppReminderStorage(reminders);
			for (var i = 0; i < reminders.length; i++) {
				if (reminders[i].timer !== null && reminders[i].timer !== undefined) {
					reminders[i].timer.stop();
					reminders[i].timer = null;
				}
				delete reminders[i];
			}
		}
	};
})();