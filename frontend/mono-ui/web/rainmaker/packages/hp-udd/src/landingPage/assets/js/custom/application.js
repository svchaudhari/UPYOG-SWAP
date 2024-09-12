/**
 *Function to show document in modal.
 */
 function getServiceDocument(serviceID,applicationID) {
	var dataString = 'serviceID=' + serviceID + '&applicationID=' + applicationID;
	onStartLoader();
	$.ajax({
		type: 'post',
		url: BASE_URL + "/application_dept/document/index",
		data: dataString,
		cache: false,
		success: function(data) {
			$("#dataModal").modal('show');
			$(".modal-dialog").html(data);
			onStopLoader(); 
		} 
	});
}
/**
 *Function to get Dept Application by ajax.
 */
function getDeptApplication() { 
    var departmentID     = $("#departmentID").val();
    var search_data_job  = "departmentID="+departmentID;
    onStartLoader();
    $.ajax({
        type: 'post',
        url: BASE_URL + "/application/default/dept-service",
        data: search_data_job,
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
 *Function to get Dept Application by ajax.
 */
function getInvestorApplication() { 
    var data = $("#service_application").serializeArray();
    onStartLoader();
    $.ajax({
        type: 'post',
        url: BASE_URL + "/application/manage-application/application",
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
 *Function to show document in modal.
 */
 function getDocumentInfo(documentID) {
	var dataString = 'documentID=' + documentID;
	onStartLoader();
	$.ajax({
		type: 'post',
		url: BASE_URL + "/application/document/document-info",
		data: dataString,
		cache: false,
		success: function(data) {
			$("#dataModal").modal('show');
			$(".modal-dialog").html(data);
			onStopLoader(); 
		} 
	});
}
/**
 *Function to show document in modal. 
 */
 function getDocumentOptionInfo(userdocumentID) {
	var dataString = 'userdocumentID=' + userdocumentID;
	onStartLoader();
	$.ajax({
		type: 'post',
		url: BASE_URL + "/application/document/document-option-info",
		data: dataString,
		cache: false,
		success: function(data) {
			$("#dataModal").modal('show');
			$(".modal-dialog").html(data);
			onStopLoader(); 
		} 
	});
}
/**
 *Function to show option of same document.
 */
function getDocumentOption(applicationSubmissionID,applicationDocumentID,documentID,indexID) { 
    var dataString = 'applicationSubmissionID=' + applicationSubmissionID + '&documentID=' + documentID + '&applicationDocumentID=' + applicationDocumentID;
    onStartLoader();
    $.ajax({
        type: 'post',
        url: BASE_URL + "/application/document/document-option",
        data: dataString,
        dataType: 'html',
        cache: false,
        success: function(newPartialView) {
            $("#document_expand_container_"+indexID).html(newPartialView);
            onStopLoader();
        } 
    });
    return false; 
}
/**
 *Function to upload document by ajax.
*/
function submitDocument(documentID,dmsId,fileName,fileType,fileSize) { 
    var Input  = document.getElementById('document-upload-'+documentID);
    if(Input.files && Input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            //$('#document-img-'+documentID).attr('src', e.target.result);
			$('#document-img-'+documentID).html('<i class="fa fa-3x fa-file" style="color: #dc3545;"></i>');
        }
        reader.readAsDataURL(Input.files[0]);
        $('#uploadDocument_'+documentID).yiiActiveForm('validate');
        var data = $('#uploadDocument_'+documentID).serializeArray();
        var url = $('#uploadDocument_'+documentID).attr('action');
        var formData = new FormData($('#uploadDocument_'+documentID)[0]);
		formData.append('remarks',$('#remarks_'+documentID).val());
        onStartLoader();
        $.ajax({
                url: url,
                type: 'post',
                enctype: 'multipart/form-data',
                dataType: 'json',
                data: formData,
                cache: false,
                processData: false,
                contentType: false,
            })
            .done(function (response) {
                if (response.success == true) {
                    onStopLoader();
					$('#document-img-'+documentID).html('<a href="#" onclick="getDocumentInfo('+response.model.id+')"><i class="fa fa-3x fa-file" style="color: #dc3545;"></i></a>');
                } else {
                    onStopLoader();
                    $.alert({
                        title: 'Error!',
                        content: response.message,
                    });
                }
            })
            .fail(function () {
                onStopLoader();
                console.log("error");
            });
    }
}
/**
 *Function to upload document option by ajax.
 */
 function submitDocumentOption(documentOptionID,applicationDocumentID) { 
    var newSrc = $('#document-img-option-'+documentOptionID).attr('src');
    $('#document-img-'+applicationDocumentID).attr('src', newSrc);
    var data = 'application_id=' + $('#application_id_'+documentOptionID).val() + '&document_id=' + $('#document_id_'+documentOptionID).val() + '&user_document_id=' + $('#user_document_id_'+documentOptionID).val() + '&remarks=' + $('#remarks_'+applicationDocumentID).val();
    onStartLoader();
    $.ajax({
        url: BASE_URL + "/application/document/upload-document-option",
        type: 'post',
        dataType: 'json',
        data: data
    }) 
    .done(function(response) {
        if(response.success == true) {
            onStopLoader();
        } else {
            onStopLoader(); 
            $.alert({
                title: 'Error!',
                content: response.message,
            });                     
        } 
    })
    .fail(function() {
        onStopLoader();
        console.log("error");
    });
}
/**
 *Function to submit Declaration Data by ajax.
 */
function checkDeclarationData(event) {
	$.confirm({
		title: 'Confirm!',
		content: 'Are you ready to submit?',
		buttons: {
			confirm: function() {
				$('#submit_declaration').prop("disabled", false); // Element(s) are now enabled.
				onStopLoader();
			},
			cancel: function() {
				onStopLoader();
			},
		}
	});
}
/**
 *Function to show OTP modal by ajax.
 */
function getOtpgenerate() {
    $.ajax({
        type: 'get',
        url: BASE_URL + "application/application/otp",
        cache: false,
        success: function(data) {
			$("#dataModal").modal('show');
			$(".modal-dialog").html(data);
        } 
    });
}

/**
 *Function to generate OTP by ajax.
 */
function getGenerateotp() {
    onStartLoader();
    $.ajax({
        type: 'get',
        url: BASE_URL + "/application/application/generateotp",
        dataType: 'json',
        cache: false,
        success: function(data) {
            if(data.success){
                alert("OTP sent to registered mobile no. Please check.");
                $("#otp").focus();
                onStopLoader();
            }
        } 
    });
}

/**
 *Function to generate OTP by ajax.
 */
function getSubmitotp() {
    onStartLoader();
    $.ajax({
        url: BASE_URL + "/application/application/verifyotp?otp="+$("#otp").val(),
        dataType: 'json',
        cache: false,
        success: function(data) {
            if(data.success){
                alert("OTP verified");
            }
            else{
                alert("OTP not valid. Please check.");
                $("#otp").focus();
            }
        } 
    });
    onStopLoader();
}