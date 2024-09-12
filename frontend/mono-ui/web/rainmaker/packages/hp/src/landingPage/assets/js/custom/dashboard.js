/**
 *Function to get Investor Application by ajax.
 */
function getApplicationInfo(ApplicationStatus) { 
    var data = 'ApplicationStatus=' + ApplicationStatus;
    onStartLoader();
    $.ajax({
        type: 'post',
        url: BASE_URL + "/dashboard/default/application",
        data: data,
        dataType: 'html',
        cache: false,
        success: function(newPartialView) {
            partialViewContainer.html(newPartialView);
            onStopLoader();
        } 
    });
    return false;
} 
/**
 *Function to show generate Approval Letter in modal.
 */
function getApplicationTimeline(ApplicationID) { 
	var dataString = 'ApplicationID=' + ApplicationID;
	onStartLoader();
	$.ajax({
		type: 'post',
		url: BASE_URL + "/dashboard/default/timeline",
		data: dataString,
		cache: false,
		success: function(data) { 
			$("#dataModal").modal('show');
			$(".modal-dialog").html(data);
			onStopLoader(); 
		} 
	});
}