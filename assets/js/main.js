$(document).ready(function () {

    var setUpLightense = function () {
	Lightense('img:not(.no-lightense)', {
	    time: 300,
	    padding: 40,
	    offset: 40,
	    keyboard: true,
	    cubicBezier: '',
	    background: 'rgba(0, 0, 0, .98)',
	    zIndex: 1000000,
	});
    };

    // Audio player.
    //
    // - Each link with the "audio-play" class is a player,
    // - It wraps an audio SVG icon,
    // - Target link is the audio file to be played,
    // - Multiple players supported, they need to point to != targets.
    var setUpAudio = function () {
	var audio_preload = {};

	$(".audio-play").each(function () {
	    var target = $(this).attr("href");

	    audio_preload[target] = new Audio(target);
	    audio_preload[target].loop = true;
	});

	$(".audio-play").click(function () {
	    var target = $(this).attr("href");

	    if (audio_preload[target].paused) {
		audio_preload[target].play();
	    } else {
		audio_preload[target].pause();
	    }

	    return false;
	});
    };

    setUpLightense();
    setUpAudio();
});
