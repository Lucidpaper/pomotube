if(Meteor.isServer) {
	Meteor.methods({
		setWatchLaterPlaylist : function(userID) {
			var user = Meteor.users.findOne(userID);
			var accessToken = user.services.google.accessToken;
			Youtube.authenticate({
			    type: "oauth",
				token: accessToken,
			});
			
			var getChannels = Meteor.wrapAsync(Youtube.channels.list);
		
			var data = getChannels({
				mine : true,
				part : 'contentDetails',
			});
			
			var playlistID = data.items[0]['contentDetails']['relatedPlaylists']['watchLater'];
			Meteor.users.update(userID, {$set : {"profile.playlist_id" : playlistID}});
			
		},
		removeUser : function(userID) {
			Meteor.users.remove(userID);			
		},
	});
	
	
}
