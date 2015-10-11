

// Make sure it's in client
if (Meteor.isClient) {    
    
    Meteor.startup(function(){
	   stateManager.changeTo('waiting_to_start_pomodoro');
	   
    });
    
    // YouTube API will call onYouTubeIframeAPIReady() when API ready.
    // Make sure it's a global variable.
    onYouTubeIframeAPIReady = function () {

        // New Video Player, the first argument is the id of the div.
        // Make sure it's a global variable.
        player = new YT.Player("player", {

            height: "400", 
            width: "600", 

            // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")
            videoId: "LdH1hSWGFGU", 

            // Events like ready, state change, 
            events: {

                onReady: function (event) {

                    // Play video when player ready.
                }

            }

        });

    };

    YT.load();
    
	Template['main'].helpers({
		in_pomodoro : function() {
			return stateManager.isInState('in_pomodoro');
		},
		waiting_to_start_pomodoro : function() {
			return stateManager.isInState('waiting_to_start_pomodoro');
		},
		waiting_to_start_break : function() {
			return stateManager.isInState('waiting_to_start_break');
		},
		current_time : function() {
			return Session.get('current_time');
		},
		display : function() {
			return stateManager.isInState('in_break') ? '' : 'hidden';
		}
	});
	
	
	
	Template['main'].events({
		'click .start-pom' : function() {
			stateManager.changeTo('in_pomodoro');		
		},
		'click .stop-pom' : function() {
			stateManager.changeTo('waiting_to_start_pomodoro');
		},
		'click .start-break' : function() {
			stateManager.changeTo('in_break');
		},
	});
	
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
		var seconds = currentSeconds % 60;
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
				on_change : function() {
// 					var periodLength = 1000 * 60 * 25;
					var periodLength = 5000;
					startPeriod(periodLength, function(){
						stateManager.changeTo('waiting_to_start_break');
					});
				}
			},
			waiting_to_start_break : {
				
			},
			in_break : {
				on_change : function() {
// 					var periodLength = 1000 * 60 * 5;
					var periodLength = 5000;
				document.getElementById("player").className = "";
					startPeriod(periodLength, function(){
						stateManager.changeTo('waiting_to_start_pomodoro');
					});
				}
			},
		};
	}
	
	var stateManager = {
		changeTo : function(newState) {
			resetTimers();
			var stateMap = getStateMap();
			var stateDetails = stateMap[newState];
			Session.set('timer_state', newState);
			if(_.has(stateDetails, 'on_change')) {
				stateDetails['on_change']();
			}
		},
		isInState : function(state) {
			return Session.get('timer_state') == state;
		}
	};
	
	
	
}







