Meteor.startup(function(){
   Deps.autorun(function(){
	   if(Meteor.userId() != null) {
		   var userID = Meteor.userId();
		   Meteor.subscribe('timer', userID, function(){
			   var timer = Timers.findOne({user_id : userID});
			   var state = timer ? timer['state'] : 'waiting_to_start_pomodoro';
			   var startedTime = timer ? timer['started_time'] : null;
			   Session.set('started_time', startedTime);
			   stateManager.changeTo(state);
		   });
	   }
   });
});
