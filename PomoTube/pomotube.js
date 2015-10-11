

// Make sure it's in client
if (Meteor.isClient) {    
    
    // YouTube API will call onYouTubeIframeAPIReady() when API ready.
    // Make sure it's a global variable.
    onYouTubeIframeAPIReady = function () {

        // New Video Player, the first argument is the id of the div.
        // Make sure it's a global variable.
        player = new YT.Player("player", {

            height: "390",
            width: "590",
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
		in_break : function() {
			return stateManager.isInState('in_break');
		},	
		show_clock_icon : function() {
			return stateManager.isInState('in_pomodoro') || stateManager.isInState('waiting_to_start_pomodoro');	
		},
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
			stateManager.start('in_pomodoro');		
		},
		'click .stop-pom' : function() {
			stateManager.start('waiting_to_start_pomodoro');
		},
		'click .start-break' : function() {
			stateManager.start('in_break');
		},
	});
	
	
	
	
}







