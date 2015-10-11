

sendNotification = function(text) {
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	}

// Let's check if the user is okay to get some notification
	else if (Notification.permission === "granted") {
	// If it's okay let's create a notification
		var notification = new Notification(text);
	}
	
	// Otherwise, we need to ask the user for permission
	else if (Notification.permission !== 'denied') {
		Notification.requestPermission(function (permission) {
		// If the user is okay, let's create a notification
			if (permission === "granted") {
				var notification = new Notification(text);
			}
		});
	}
}
 
