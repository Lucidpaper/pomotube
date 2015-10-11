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
                    event.target.playVideo();
                }

            }

        });

    };

    YT.load();
}
