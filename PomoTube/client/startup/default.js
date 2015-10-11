Meteor.startup(function(){
   Meteor.subscribe('timer', 'test1', function(){
	   var timer = Timers.findOne({user_id : 'test1'});
	   var state = timer ? timer['state'] : 'waiting_to_start_pomodoro';
	   var startedTime = timer ? timer['started_time'] : null;
	   Session.set('started_time', startedTime);
	   stateManager.changeTo(state);
   });
});
