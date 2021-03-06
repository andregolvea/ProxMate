$(window).live("afterunload", resetProxy);
resetProxy();

var global = checkStatus("global");
var youtube = checkStatus("youtube_channel");

$.when(global, youtube).done(function(g, y) {

	if (!global.response.enabled || !youtube.response.enabled) {
		return;
	}

	$(document).ready(function() {

		var interval;


		var hashChange = false;

		var hashWrapper = function() {
			hashChange = true;
		}

		$(window).bind("hashchange", hashWrapper);

		var tick = function() 
		{
			var restricted = $("#playnav-custom-error-message");
			var prestricted = $("#playnav-player-restricted");
			
			var rdisplay = restricted.css("display");
			var pdisplay = prestricted.css("display");

			var isRestricted = true;

			if (rdisplay == "block" && pdisplay == "block") {
				isRestricted = true;
			} else {
				isRestricted = false;
			}


			if (isRestricted) 
			{
				// Change text
				$("#playnav-custom-error-message").html("ProxMate will unblock this video now! :)");

				// Wenn sich nur der hash geändert hat wird die seite direkt neu geladen
				if (hashChange) 
				{	
					clearInterval(interval);
					proxifyUri(window.location, true);
				}
				else 
				{
					// Dieses Snippet sollte innerhalb des channels nur einmal ausgefährt werden, da sich nurnoch der hash ändern wird
					clearInterval(interval);
					proxifyUri(window.location, true);
				}
			}
		}

		// Unschön, hässlich, und sollte bald entfernt werden!!!!!
		var interval = setInterval(tick, 1000);

	});

});