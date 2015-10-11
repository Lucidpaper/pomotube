Timers = new Mongo.Collection('timers');


var timerHandlers = {};

if(Meteor.isServer) {
	Meteor.methods({
		startTimer : function(userID, duration, startState, endState) {
			runTimer(userID, duration, startState, endState);
		},
		updateTimer : function(userID, newState) {
			var timer = {
				user_id : userID,
				started_time : null,
				state : newState,
			};
			Meteor.clearTimeout(timerHandlers[userID]);
			Timers.upsert({user_id : userID}, {$set : timer});
		},
	});
}

var timerHandler = null;
var runTimer = function(userID, duration, startState, endState) {
		var timer = {
			user_id : userID,
			started_time : moment().utc().format('x'),
			state : startState,
		};
		Timers.upsert({user_id : userID}, {$set : timer});
		Meteor.clearTimeout(timerHandlers[userID]);
		timerHandlers[userID] = Meteor.setTimeout(function(){
			timer.started_time = null;
			timer.state = endState;
			Timers.update({user_id : userID}, {$set : timer});
		}, duration);
}

