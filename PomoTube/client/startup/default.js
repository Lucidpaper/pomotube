Meteor.startup(function(){
   Deps.autorun(function(){
    
    	if(Meteor.userId() != null) {
		   var userID = Meteor.userId();
		   Meteor.subscribe('timer', userID, function(){
			   var timer = Timers.findOne({user_id : userID});
			   console.log(timer);
			   var state = timer ? timer['state'] : 'waiting_to_start_pomodoro';
			   var startedTime = timer ? timer['started_time'] : null;
			   var currentTime = timer ? timer['current_time'] : 0;
			   Session.set('started_time', startedTime);
			   Session.set('current_video_time', currentTime);
			   stateManager.changeTo(state);
		   });
	   }
   });
   
    var scopes = ['https://www.googleapis.com/auth/youtube.readonly', 'email', 'profile'];
    Accounts.ui.config({
	    requestPermissions : {
		    google : scopes
		},
		requestOfflineToken: {
			google : true,
		},
    });
   
});
