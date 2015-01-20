var ReminderHandler = (function() {
	var reminders = [];

	return {
		initialize: function() {
			//reminders = ConfigurationStorageHandler.getAppReminderStorage();
		},

		setReminder: function(id, start, title, channelName, channelNr) {
			var reminder = new Reminder(id, start, title, channelName, channelNr);
			var list = reminders;
			var startTimeAsset = moment(reminder.start).utc();
			if (startTimeAsset.isValid() === false) return;
			var currentTime = moment().utc();
			if (startTimeAsset > currentTime) {
				var diff = moment(startTimeAsset - currentTime).utc();
				var delayInSeconds = ((diff.hours() * 60) + diff.minutes() * 60) + diff.seconds();

				reminder.timer = new Timer(delayInSeconds, function() {
					widget.notify(widget.getUrl("Images/Icon.png"), [$_('App_Title'),
							$_('Notification_Line2_Text', [reminder.channelName, reminder.channelNr]),
							$_('Notification_Line1_Text', [reminder.title])
						],
						MAF.Notification.ALERT);

					var index = -1;
					reminder.timer.stop();
					reminder.timer = null;
					for (var i = 0; i < list.length; i++)
						if (list[i].assetId === reminder.assetId)
							index = i;
					list.splice(index, 1);
				});
				reminder.timer.start();
				reminders.push(reminder);
			}
		},

		removeReminder: function(assetId) {
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
				reminders[i] = null;
			}
		}
	};
})();