Meteor.publish('timer', function(userID){
	return Timers.find({user_id : userID});
});

Meteor.publish("userData", function(){
  return Meteor.users.find(
    {_id: this.userId},
    {fields: {'_id' : 1, 'profile': 1, 'username' : 1}}
  );
});

/*
Accounts.onCreateUser(function(options, user){
	Meteor.call('setWatchLaterPlaylist', user._id);
	return user;
});
*/




