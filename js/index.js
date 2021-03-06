
$(document).ready(function() {
	adaptSize();
});

$(window).on('orientationchange', function(event) {
	adaptSize();
});

function adaptSize() {
	var screenWidth = $(window).width();
	var screenHeight = $(window).height();
	
	if (screenHeight > screenWidth) {
		var imgWidth = screenWidth / 2;
		if (imgWidth < 300) {
			imgWidth = 'auto';
		}
		
		$('#img').css({
			width: imgWidth,
			height: 'auto'
		});
	} else {
		var imgHeight = screenHeight / 2;
		if (imgHeight < 300) {
			imgHeight = 'auto';
		}
		
		$('#img').css({
			height: imgHeight,
			width: 'auto'
		});
	}
	
	$('#answer').css({
		top: -($('#img').outerHeight() * 0.77),
		width: ($('#img').outerHeight() * 0.3)
	});
	
	$('#one_more').css({
		top: -($('#img').outerHeight() * 0.25)
	});
}

var answers = [
		'It is certain',
		'It is decidedly so',
		'Without a doubt',
		'Yes, definitely',
		'You may rely on it',
		'As I see it, yes',
		'Most likely',
		'Outlook good',
		'Signs point to yes',
		'Yes',
		'Reply hazy, try again',
		'Ask again later',
		'Better not tell you now',
		'Cannot predict now',
		'Concentrate and ask again',
		'Don\'t count on it',
		'My reply is no',
		'My sources say no',
		'Outlook not so good',
		'Very doubtful'
	];
	
var timerId;
var shaking = false;

/* |x| > 5 */
var alpha = 7;
var beta = 7;
var gamma = 7;

function ready() {
	$('#ok_button').remove();
	$('#answer_container_2').hide(600);
	shaking = true;
	startListening();
	setTimeout(start, 1000);
}

function start() {
	if (shaking) {
		var xRate = alpha;
		var yRate = beta
		var zRate = gamma;
	
		if ((Math.abs(Math.round(xRate)) <= 5) && (Math.abs(Math.round(yRate)) <= 5) && (Math.abs(Math.round(zRate)) <= 5)) {
			clearTimeout(timerId);
			shaking = false;
			var answer = answers[Math.floor(Math.random() * (answers.length))];
			$('#answer').html(answer);
			$('#answer_container_2').show(600);
			
			setTimeout(newTry, 2000);
		}	
	
		timerId = setTimeout(start, 100);
	}
}

function newTry() {
	var buttons = '<div class="next" id="button_0"><button class="ui-btn ui-shadow ui-corner-all ui-btn-inline">' + "One more time?" + '</button></div>';
    $('#one_more').html(buttons);
	$('#one_more').show();
	
    $('#button_0').click(function() {
        $('#answer_container_2').hide(600);
		$('#one_more').hide();
		ready();
    });
}

function startListening() {
	window.ondevicemotion = function(event) {
		alpha = event.rotationRate.alpha;
		beta = event.rotationRate.beta;
		gamma = event.rotationRate.gamma;
	}
}