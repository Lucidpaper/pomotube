var periodHandler = null;
var timerHandler = null;

var startPeriod = function(periodLength, onStop) {
	startTimer(periodLength);
	periodHandler = Meteor.setTimeout(function(){
		onStop();		
	}, periodLength);
}
			
var resetTimers = function() {
	Meteor.clearTimeout(timerHandler);
	Meteor.clearTimeout(periodHandler);
}

var startTimer = function(length) {
	var currentSeconds = length / 1000;
	calculateCurrentTime(currentSeconds);
	timerHandler = Meteor.setInterval(function(){
		currentSeconds = currentSeconds - 1;
		calculateCurrentTime(currentSeconds);
	}, 1000);
}

var calculateCurrentTime = function(currentSeconds) {
	var seconds = Math.round(currentSeconds % 60);
	var minutes = Math.round((currentSeconds - seconds) / 60);
	minutes = minutes < 0 ? '00' : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;
	var time = minutes + ":" + seconds;
	Session.set('current_time', time);
}

var getStateMap = function() {
	return {
		waiting_to_start_pomodoro : {
			on_change : function() {
				document.getElementById("player").className = "hidden";
			}
		},
		in_pomodoro : {
			timer : {
				get_duration : function() {
					return 1000 * 60 * 25;
// 					var periodLength = 5000;
				},
				end_state : 'waiting_to_start_break',
			},
			get_duration : function() {
				
			},
		},
		waiting_to_start_break : {
			
		},
		in_break : {
			timer : {
				get_duration : function() {
					return 1000 * 60 * 25;

				},
				end_state : 'waiting_to_start_pomodoro',
			},
			on_change : function() {
				document.getElementById("player").className = "";
			}
		},
	};
}

stateManager = {
	start : function(newState) {
		resetTimers();
		var stateMap = getStateMap();
		var stateDetails = stateMap[newState];
		var duration = stateManager.getDuration(newState);
		if(duration != null) {
			var endState = stateManager.getEndState(newState);
			Meteor.call('startTimer', 'test1', duration, newState, endState);
		} else {
			Meteor.call('updateTimer', 'test1', newState);
		}
		stateManager.changeTo(newState);
	},
	changeTo : function(newState) {
		var stateMap = getStateMap();
		var stateDetails = stateMap[newState];
		var duration = stateManager.getDuration(newState);
		if(duration != null) {
			var endState = stateManager.getEndState(newState);
			var startedTime = Session.get('started_time');
			if(startedTime != null) {
				var currentTime = moment().utc().format('x');
				var elapsed = currentTime - startedTime;
				duration = duration - elapsed;
			}
			startPeriod(duration, function(){
				stateManager.start(endState);
			});
		}
		Session.set('timer_state', newState);
		if(_.has(stateDetails, 'on_change')) {
			stateDetails['on_change']();
		}
	},
	getDuration : function(stateName) {
		var stateMap = getStateMap();
		var stateDetails = stateMap[stateName];
		var timerDetails = _.has(stateDetails, 'timer') ? stateDetails['timer'] : null;
		return timerDetails ? timerDetails['get_duration']() : null;
	},
	getEndState : function(stateName) {
		var stateMap = getStateMap();
		return stateMap[stateName]['timer']['end_state'];
	},	
	isInState : function(state) {
		return Session.get('timer_state') == state;
	}
};
