var ReminderHandler = {
	handleCall2Action: false,
	handleCall2ActionChannelNr: null,
	reminders: [],

	initialize: function() {},

	getReminderCount: function() {
		return this.reminders.length;
	},

	setReminder: function(id, start, title, channelName, channelNr) {
		var reminderHandler = this;
		var reminder = new Reminder(id, start, title, channelName, channelNr);
		var list = this.reminders;
		var startTimeAsset = moment(reminder.start).utc();
		if (startTimeAsset.isValid() === false) return;
		var currentTime = moment().utc();
		if (startTimeAsset > currentTime) {
			var diff = moment(startTimeAsset - currentTime).utc();
			var delayInSeconds = ((diff.hours() * 60) + diff.minutes() * 60) + diff.seconds();

			reminder.timer = new Timer(delayInSeconds, function() {
				// reminderHandler.handleCall2Action = true;
				// reminderHandler.handleCall2ActionChannelNr = reminder.channelNr;
				// screen.log("c2aTimer start: " + reminder.channelNr);
				// var c2aTimer = new Timer(Config.common.call2ActionMessageDisplayTimeout,
				// function() {
				// screen.log("c2aTimer timeout");
				// reminderHandler.handleCall2Action = false;
				// reminderHandler.handleCall2ActionChannelNr = null;
				// c2aTimer.stop();
				// c2aTimer = null;
				// });
				// c2aTimer.start();
				widget.notify(widget.getUrl("Images/Icon_notification.png"), [$_('App_Title'),
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
			this.reminders.push(reminder);
		}
	},

	removeReminder: function(assetId) {
		var index = -1;
		for (var i = 0; i < this.reminders.length; i++)
			if (this.reminders[i].assetId === assetId)
				index = i;

		var reminder = this.reminders.splice(index, 1);
		if (reminder.timer !== null && reminder.timer !== undefined) {
			reminder.timer.stop();
			reminder.timer = null;
		}
	},

	isReminderSet: function(assetId) {
		var found = false;
		for (var i = 0; i < this.reminders.length; i++)
			if (this.reminders[i].assetId === assetId)
				found = true;
		return found;
	},

	cleanUp: function() {
		for (var i = 0; i < this.reminders.length; i++) {
			if (this.reminders[i].timer !== null && this.reminders[i].timer !== undefined) {
				this.reminders[i].timer.stop();
				this.reminders[i].timer = null;
			}
			this.reminders[i] = null;
		}
		this.reminders = null;
		delete this.reminders;
	}
};