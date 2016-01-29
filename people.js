var students = [];
var presentStudents = [];
var week = 15;

$(function () {
	getCookies();
	
	$('#addButton').click(addClickEvent);
	
	$("#nameInput").keypress(function(event){
		if (event.keyCode == 13)
			addClickEvent();
	});	
});

function getCookies () {
	var studentsCookie = Cookies.getJSON('students');
	var presentStudentsCookie = Cookies.getJSON('presentStudents');
	var weekCookie = Cookies.get('week');
	
	if(studentsCookie != null){
		students = studentsCookie;
	}
	if(presentStudentsCookie != null){
		presentStudents = presentStudentsCookie;
	}
	if(weekCookie != null){
		week = weekCookie;
	}
	
	initNames();
}

function setCookies () {
	Cookies.set('students', students, {expires: 365});
	Cookies.set('presentStudents', presentStudents, {expires: 365});
	Cookies.set('week', week, {expires: 365});
}

function initNames () {
	for(var i = 0; i < students.length; i++){
		var name = students[i];
		addName(name, isPresent(name), false);
	}
}

function addClickEvent () {
	var newName = $("#nameInput").val();
	$("#nameInput").val('');
	$("#nameInput").removeClass('populated');
	if(newName !=  "" && !alreadyAdded(newName)) addName(newName, true, true);
}

/* This is what addName builds:
<label for="0">
	<li>
		<input id="0" type="checkbox" />
		<span class="name">name</span>
	</li>
</label>
*/
function addName (newName, checked, update) {
	if(alreadyAdded(newName)) var currentIndex = students.indexOf(newName);
	else var currentIndex = students.length;
	
	if(checked) {
		var html = '<label for="' + currentIndex + '"><li><input id="' + currentIndex + '" type="checkbox" checked="checked" /><span class="name">' + newName + '</span></li></label>';
		if(update) presentStudents.push(newName);
	}
	else {
		var html = '<label for="' + currentIndex + '"><li><input id="' + currentIndex + '" type="checkbox" /><span class="name">' + newName + '</span></li></label>';
	}
	
	if($("#names > label").length == 0) {
		$("#names").html(html);
	}
	else {
		$("#names").append(html);
	}
	
	if(update){ 
		students.push(newName);
		setCookies();
	}
}

function alreadyAdded (student) {
	for (var i = 0; i < students.length; i++){
		if(student == students[i]){
			return true;
		}
	}
	return false;
}

function isPresent (student) {
	for (var i = 0; i < presentStudents.length; i++){
		if(student == presentStudents[i]){
			return true;
		}
	}
	return false;
	
}

$(function () {
	$('#clear-names-button').click(function () {
		$("#names").html('<li class="notice">None</li>');
		students = [];
		presentStudents = [];
		setCookies();
		
		//console.log(presentStudents);
	});
});

$(document).on("change", ":checkbox", function (e) {
	if($(this).is(":checked")) {
		var name = $(this).next().text();
		presentStudents.push(name);
		
		//console.log("checked, " + name);
		//console.log("present:"  + presentStudents);
	}
	else {
		var name = $(this).next().text();
		presentStudents.splice(presentStudents.indexOf(name), 1);
		
		//console.log("unchecked, " + name);
		//console.log("present:"  + presentStudents);
	}
	setCookies();
});

$(function () {
	$('body').delegate('ul#names li', 'contextmenu', function() {
		return false;
	});
	
	$('body').delegate('ul#names li', 'mouseup', function (e) {
		if(e.button == 2) {
			if (students.length != 0) {
				var name = $(this).text();

				students.splice(students.indexOf(name), 1);
				if(isPresent(name)) presentStudents.splice(presentStudents.indexOf(name), 1);
				setCookies();

				$(this).remove();
				if (students.length == 0) {
					$('#clear-names-button').click();
				}
			}
		}
	});
});