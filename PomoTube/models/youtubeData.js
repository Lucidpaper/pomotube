if(Meteor.isServer) {
	Meteor.methods({
		setWatchLaterPlaylist : function(userID) {
			Meteor.call('exchangeRefreshToken', userID);
			var user = Meteor.users.findOne(userID);
			var accessToken = user.services.google.accessToken;
			Youtube.authenticate({
			    type: "oauth",
				token: accessToken,
			});
			
			
			
			var getChannels = Meteor.wrapAsync(Youtube.channels.list);
			var getItems = Meteor.wrapAsync(Youtube.playlistItems.list);
			
			var data = getChannels({
				mine : true,
				part : 'contentDetails',
			});
			
			var playlistID = data.items[0]['contentDetails']['relatedPlaylists']['watchLater'];
			
			var data = getItems({
				part : 'contentDetails',
				playlistId : playlistID,
				maxResults : 10,
			});
			Meteor.users.update(userID, {$set : {"profile.watch_list" : data['items']}});
		},
		removeUser : function(userID) {
			Meteor.users.remove(userID);			
		},
		resetConfiguration: function() {
			ServiceConfiguration.configurations.remove({
			  service: "google"
			});		
		}
	});
	
	
}
