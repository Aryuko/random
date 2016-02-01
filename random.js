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
/*
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
}*/

function updateResult (student) {	
	spinner(student);
	
	var html = '<li>' + student + '</li>';
	if(disallowedNames.length == 0) {
		$("#numberWrapper ul").html(html);
	}
	else {
		$("#numberWrapper ul").append(html);
	}
	disallowedNames.push(student);
}

function spinner (student) {
	var spinList = [];
	spinList = spinList.concat(presentStudents);	//basically spinList = presentStudents, but doesn't glitch
	
	spinList.splice(spinList.indexOf(student), 1);	//move selected student to end of list
	spinList.push(student);
	
	spinList = spinList.concat(spinList);			//multiply the list to make it longer
	spinList = spinList.concat(spinList);
	
	var savedIndex = spinList.length - 1;			//save index we will scroll to
	
	spinList = spinList.concat(spinList);			//add one more to make the list continue after the destination, making it look endless
	
	buildSpinner(spinList);
	$("#output ul").removeClass("outputTransition");
	
	$("#output ul").css('top', 0 + 'px');
	
	var elementHeight = $("#output").height() + 1;	//+1 from border
	var targetTop = - (savedIndex * elementHeight);
	
	$("#output ul").addClass("outputTransition");
	$("#output ul").css('top', targetTop + 'px');
}

function buildSpinner (list) {
	var selectedStudent = list[list.length - 1];				//selected student, at end of list
	
	var html = '';
	for (var i = 0; i < list.length - 1; i++) {
		html += '<li>' + list[i] + '</li>';
	}
	html += '<a href="https://gits-15.sys.kth.se/INDA15/' + selectedStudent + '-week-' + week + '" target="_blank">' + selectedStudent + '</a>';
	
	$("#output ul").html(html);
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