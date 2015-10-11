

// Make sure it's in client
if (Meteor.isClient) {    
    
    // YouTube API will call onYouTubeIframeAPIReady() when API ready.
    // Make sure it's a global variable.

    
    
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







