// Attach DDP to your local app
var ddp = new MeteorDdp("ws://localhost:3000/websocket");

var posts = 0;

// TEST CONNECTION IS MADE
// ddp.connect().done(function() {
//   console.log('Connected!');
// });

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

var previousState = null;
var messageMap = {
	in_break : "Break Over",
	in_pomodoro : "Pomodoro Over",
};

//Connect to App
ddp.connect().then(function(){

	//Subscribe to a publication - in this case I publish the collection 'posts' as 'all_posts'
	ddp.subscribe('timer');

	//Watch that collection
	ddp.watch('timers', function (changedDoc, message){
		var currentState = changedDoc.state;
		if(messageMap[previousState] !== undefined) {
			sendNotification(messageMap[previousState]);
		}
		previousState = currentState;
	});
});
