var students = [];
var presentStudents = [];

$(function () {
	$('#addButton').click(addClickEvent);
	
	$("#nameInput").keypress(function(event){
		if (event.keyCode == 13)
			addClickEvent();
	});
});

function addClickEvent () {
	var newName = $("#nameInput").val();
	$("#nameInput").val('');
	$("#nameInput").removeClass('populated');
	if(newName !=  "" && !alreadyAdded(newName)) updateNames(newName);
}

/* This is what updateNames builds:
<label for="0">
	<li>
		<input id="0" type="checkbox" />
		<span class="name">name</span>
	</li>
</label>
*/
function updateNames (newName) {
	var currentIndex = students.length;
	var html = '<label for="' + currentIndex + '"><li><input id="' + currentIndex + '" type="checkbox" /><span class="name">' + newName + '</span></li></label>';
	
	if(students.length == 0) {
		$("#names").html(html);
	}
	else {
		$("#names").append(html);
	}
	
	students.push(newName);
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
		$("#names").html('<li class="notice">No handles added</li>');
		students = [];
		presentStudents = [];
		
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
			
			$(this).remove();
			if (students.length == 0) {
				$('#clear-names-button').click();
			}
			
			//console.log(name + "removed!");
		}
	} 
	return true; 
	});
});