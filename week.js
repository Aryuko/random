var week = 15;

$(function () {
	$('body').delegate('#week', 'contextmenu', function() {
		return false;
	});
	
	$('body').delegate('#week', 'mouseup', function (e) {
		if(e.button == 0) {
			week ++;
		}
		else if(e.button == 2) {
			week --;
		}
		setCookies();
		updateWeek();
	});
});

function updateWeek () {
	var text = "Week " + week;
	$("#week").text(text);
}