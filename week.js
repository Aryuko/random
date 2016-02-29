var url = "week-15";

function updateUrl () {
	var text = url;
	$("#url").val(text);
    
    var urlInput = $("#url");
}

function getUrl () {
    return $("#url").val().trim();
}

$(function () {
	$("#url").keyup(function(event){
        url = getUrl();
        if(url.charAt(0) == "-") url = url.substring(1);
        setCookies();
        
        var targetUrl = $('#target').attr("href");
        
        if(targetUrl != null) {
            $('#target').attr("href", "https://gits-15.sys.kth.se/INDA15/" + selectedStudent + "-" + url);
        }
	});	
});