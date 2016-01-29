var disallowedNames = [];

$(function () {
	$('#goButton').click(clickEvent);
});

function clickEvent () {
	var numberOfStudents = presentStudents.length;
	if(disallowedNames.length < numberOfStudents) updateResult(presentStudents[random(numberOfStudents)]);
}

function random (max) {
	var r = Math.floor(Math.random() * max);
	
	if(!isAllowed(r)) return random(max);
	return r;
}

function isAllowed (index) {
	var student = presentStudents[index];
	
	for (var i = 0; i < disallowedNames.length; i++){
		if(student == disallowedNames[i]){
			return false;
		}
	}
	return true;
}

function updateResult (student) {
	$("#output").html('<a href="https://gits-15.sys.kth.se/INDA15/' + student + '-week-' + week + '" target="_blank">' + student + '</a>');
	
	var html = '<li>' + student + '</li>';
	if(disallowedNames.length == 0) {
		$("#numberWrapper ul").html(html);
	}
	else {
		$("#numberWrapper ul").append(html);
	}
	disallowedNames.push(student);
}

$(function () {
	$('body').delegate('ul#disallowed li', 'click', function () {
		if (disallowedNames.size != 0) {
			var student = $(this).text();
			disallowedNames.splice(disallowedNames.indexOf(student), 1);
			$(this).remove();
			if (disallowedNames.length == 0) {
				$('#clearButton').click();
			}
		}
	});
});

$(function () {
	$('#clearButton').click(function () {
		disallowedNames = [];
		$("#numberWrapper ul").html('<li class="notice">No students previously selected</li>');
	});
});