
    var videoID = null;
    
	Tracker.autorun(function(){
		if(Meteor.user()) {
			var watchList = Meteor.user()['profile']['watch_list'];
			if(watchList == undefined) {
				Meteor.call('setWatchLaterPlaylist', Meteor.userId());
			} else {
				videoID = watchList[0]['contentDetails']['videoId'];
				YT.load();
			}
		}
	});


onYouTubeIframeAPIReady = function () {

    // New Video Player, the first argument is the id of the div.
    // Make sure it's a global variable.
    
    player = new YT.Player("player", {

        height: "390",
        width: "590",
        // videoId is the "v" in URL (ex: http://www.youtube.com/watch?v=LdH1hSWGFGU, videoId = "LdH1hSWGFGU")
        videoId: videoID, 

        // Events like ready, state change, 
        events: {

            onReady: function (event) {

             	if(Session.get('current_video_time') != 0) {
	             	player.seekTo(Session.get('current_video_time'));
	             	player.stopVideo();
             	}
             	
            }

        }

    });

};




