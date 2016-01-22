var disallowedNumbers = [0];
var result = null;

$(function () {
	$('#goButton').click(function () {
		console.log("button pressed, " + disallowedNumbers);
		var numberOfStudents = $("#numberInput").val();

		var result = random(numberOfStudents);

		while (!isAllowed()){
			result = random(numberOfStudents);
		}

		updateResult(result);
	});
});

$("#numberInput").keypress(function(event){
    console.log(event.keyCode);       //debug
    if (event.keyCode == 13)
        alert("Go!");
});
		
function random (max) {
	return Math.random(max) + 1;
}

function isAllowed () {
	disallowedNumbers.forEach(function (item, index, array) {
		if(result == item){
			return false;
		}
	});
	
	return true;
}

function updateResult (number) {
	$("#output").html(number);
	
	if(disallowedNumbers == 0) {
		console.log("first number added");
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