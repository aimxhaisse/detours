$(document).ready(function () {
    var currentImage = false;

    var setUpNavigation = function () {
	var idx = 1;

	$("img:not(no-lightense)").each(function () {
	    $(this).attr("id", "detour-" + idx);
	    idx += 1;
	});

	var moveToNextImage = function (next) {
	    if ($(next).length) {
		var offset = $(next).offset();
		$("#content").scrollTop(offset.top);
		$(next).trigger('click');
	    }
	};

	$("body").keypress(function (e) {
	    if (e.key == ' ' && currentImage != false) {
		next = "#detour-" + (parseInt(currentImage.split("-")[1], 10) + 1);
		$(currentImage).trigger('click');
		setTimeout(function () { moveToNextImage(next); }, 350);
	    }
	});
    };

    var setUpLightense = function () {
	return Lightense('img:not(.no-lightense)', {
	    time: 300,
	    padding: 40,
	    offset: 40,
	    keyboard: true,
	    cubicBezier: '',
	    background: 'rgba(0, 0, 0, .98)',
	    zIndex: 1000000,
	    afterShow: function (config) {
		currentImage = $(config.target).attr("id");
	    },
	    afterHide: function (config) {
		currentImage = false;
	    }
	});
    };

    var icon_reset = "var(--color-icon-reset)";
    var icon_hl = "var(--color-icon-hl)";
    var icon_on = "var(--color-icon-on)";

    var setUpHighlightAudioIcon = function () {
	$(".audio-play").hover(function () {
	    var color = $(this).find("g").attr("fill");

	    if (color == icon_reset) {
		$(this).find("g").attr("fill", icon_hl);
	    }
	}, function () {
	    var color = $(this).find("g").attr("fill");

	    if (color == icon_hl) {
		$(this).find("g").attr("fill", icon_reset);
	    }
	});
    };

    // Audio player.
    //
    // - Each link with the "audio-play" class is a player,
    // - It wraps an audio SVG icon,
    // - Target link is the audio file to be played,
    // - Multiple players supported, they need to point to != targets.
    //
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
		$(this).find("g").attr("fill", icon_on);
	    } else {
		audio_preload[target].pause();
		$(this).find("g").attr("fill", icon_reset);
	    }

	    return false;
	});
    };

    setUpLightense();
    setUpNavigation();
    setUpAudio();
    setUpHighlightAudioIcon();
});
