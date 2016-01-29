var disallowedNumbers = [0];

$(function () {
	$('#goButton').click(clickEvent);
	
	$("#numberInput").keypress(function(event){
		if (event.keyCode == 13)
			clickEvent();
	});
});

function clickEvent () {
	var numberOfStudents = $("#numberInput").val();

	if(disallowedNumbers.length <= numberOfStudents) updateResult(random(numberOfStudents));
}

function random (max) {
	var r = Math.floor(Math.random() * max) + 1;
	
	if(!isAllowed(r)) return random(max);
	return r;
}

function isAllowed (number) {
	for (var i = 0; i < disallowedNumbers.length; i++){
		if(number == disallowedNumbers[i]){
			return false;
		}
	}
	return true;
}

function updateResult (number) {
	$("#output").html(number);
	
	if(disallowedNumbers == 0) {
		$("#numberWrapper ul").html('<li>' + number + '</li>');
	}
	else {
		$("#numberWrapper ul").append('<li>' + number + '</li>');
	}
	disallowedNumbers.push(number);
}

$(function () {
	$('body').delegate('ul#disallowed li', 'click', function () {
		if (disallowedNumbers != 0) {
			var number = $(this).text();
			disallowedNumbers.splice(disallowedNumbers.indexOf(number), 1);
			$(this).remove();
			if (disallowedNumbers.length - 1 == 0) {
				$('#clearButton').click();
			}
		}
	});
});

$(function () {
	$('#clearButton').click(function () {
		updateResult("0");
		disallowedNumbers = [0];
		$("#numberWrapper ul").html('<li id="notice">No previous numbers generated</li>');
	});
});