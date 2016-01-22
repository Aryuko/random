var disallowedNumbers = [0];

$(function () {
	$('#goButton').click(function () {
		var numberOfStudents = $("#numberInput").val();

		if(disallowedNumbers.length <= numberOfStudents) updateResult(random(numberOfStudents));
	});
});

$(function () {
	$("#numberInput").keypress(function(event){
		if (event.keyCode == 13)
			alert("Go!");
	});
});
		
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
	$('#clearButton').click(function () {
		updateResult("0");
		disallowedNumbers = [0];
		$("#numberWrapper ul").html('<li id="notice">No previous numbers generated</li>');
	});
});