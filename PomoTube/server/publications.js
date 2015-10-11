Meteor.publish('timer', function(userID){
	return Timers.find({user_id : userID});
});