/**
 *Function to submit Application for Marriage Grantstep one application by ajax.
 */
function submitMarriageGrantStepOne() {
	$('#marriage_grant_stepone').yiiActiveForm('validate');
	if($('#marriage_grant_stepone').find('.has-error').length) {
	  return false;
    }
    //event.preventDefault();
    //event.stopImmediatePropagation();
    var data = $("#marriage_grant_stepone").serializeArray();
    var formData = new FormData($('#marriage_grant_stepone')[0]);
    $.confirm({
    	title: 'Confirm!',
    	content: 'Are you ready to submit?',
    	buttons: {
    		confirm: function() {
    			onStartLoader();
    			$.ajax({
                    url: BASE_URL + "/grant/marriage-grant/submit-step-one",
                    type: 'post',
                    enctype: 'multipart/form-data',
                    dataType: 'json',
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
    			})
    			.done(function(response) {
    				if(response.success == true) { 
    					onStopLoader();
                        $.confirm({
                            title: 'Success!',
                            content: response.message,
                            buttons: {
                                confirm: function () {
                                    window.location.href=BASE_URL+'/application/document?submissionID='+response.model.id;
                                },
                            } 
                        });
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
    		},
    		cancel: function() {
    			onStopLoader();
    		},
    	}
    }); 
}
/**
 *Function to submit Application for Coaching Grant step one application by ajax.
 */
function submitCoachingGrantStepOne(event) {
    $('#coaching_grant_stepone').yiiActiveForm('validate');
    if($('#coaching_grant_stepone').find('.has-error').length) {
      return false;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    var data = $("#coaching_grant_stepone").serializeArray();
    var formData = new FormData($('#coaching_grant_stepone')[0]);
 
    $.confirm({
        title: 'Confirm!',
        content: 'Are you ready to submit??',
        buttons: {
            confirm: function() {
                onStartLoader();
                $.ajax({
                    url: BASE_URL + "/grant/coaching-grant/submit-step-one",
                    type: 'post',
                    enctype: 'multipart/form-data',
                    dataType: 'json',
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
                })

                .done(function(response) {
                    if(response.success == true) { 
                        onStopLoader();
                        $.confirm({
                            title: 'Success!',
                            content: response.message,
                            buttons: {
                                confirm: function () {
                                    window.location.href=BASE_URL+'/application/document?submissionID='+response.model.id;
                                },
                            } 
                        });
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
            },
            cancel: function() {
                onStopLoader();
            },
        }
    }); 
}
/**
 *Function to submit Application for Higher Education step one application by ajax.
 */
function submitHigherEducationStepOne(event) {
    $('#higher_education_stepone').yiiActiveForm('validate');
    if($('#higher_education_stepone').find('.has-error').length) {
      return false;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    var data = $("#higher_education_stepone").serializeArray();
    var formData = new FormData($('#higher_education_stepone')[0]);
    $.confirm({
        title: 'Confirm!',
        content: 'Are you ready to submit??',
        buttons: {
            confirm: function() {
                onStartLoader();
                $.ajax({
                    url: BASE_URL + "/grant/higher-education/submit-step-one",
                    type: 'post',
                    enctype: 'multipart/form-data',
                    dataType: 'json',
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
                })
                .done(function(response) {
                    if(response.success == true) { 
                        onStopLoader();
                        $.confirm({
                            title: 'Success!',
                            content: response.message,
                            buttons: {
                                confirm: function () {
                                    window.location.href=BASE_URL+'/application/document?submissionID='+response.model.id;
                                },
                            } 
                        });
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
            },
            cancel: function() {
                onStopLoader();
            },
        }
    }); 
}
/**
 *Function to submit Application for Higher Education step one application by ajax.
 */
function submitVocationalTrainingStepOne(event) {
    $('#vocational_training_stepone').yiiActiveForm('validate');
    if($('#vocational_training_stepone').find('.has-error').length) {
      return false;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    var data = $("#vocational_training_stepone").serializeArray();
    var formData = new FormData($('#vocational_training_stepone')[0]);
    $.confirm({
        title: 'Confirm!',
        content: 'Are you ready to submit??',
        buttons: {
            confirm: function() {
                onStartLoader();
                $.ajax({
                    url: BASE_URL + "/grant/vocational-training/submit-step-one",
                    type: 'post',
                    enctype: 'multipart/form-data',
                    dataType: 'json',
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
                })
                .done(function(response) {
                    if(response.success == true) { 
                        onStopLoader();
                        $.confirm({
                            title: 'Success!',
                            content: response.message,
                            buttons: {
                                confirm: function () {
                                    window.location.href=BASE_URL+'/application/document?submissionID='+response.model.id;
                                },
                            } 
                        });
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
            },
            cancel: function() {
                onStopLoader();
            },
        }
    }); 
}
/**
 *Function to submit Application for Skill Development step one application by ajax.
 */
function submitSkillDevelopmentStepOne(event) {
    $('#skill_development_stepone').yiiActiveForm('validate');
    if($('#skill_development_stepone').find('.has-error').length) {
      return false;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    var data = $("#skill_development_stepone").serializeArray();
    var formData = new FormData($('#skill_development_stepone')[0]);
    $.confirm({
        title: 'Confirm!',
        content: 'Are you ready to submit??',
        buttons: {
            confirm: function() {
                onStartLoader();
                $.ajax({
                    url: BASE_URL + "/grant/skill-development/submit-step-one",
                    type: 'post',
                    enctype: 'multipart/form-data',
                    dataType: 'json',
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
                })
                .done(function(response) {
                    if(response.success == true) { 
                        onStopLoader();
                        $.confirm({
                            title: 'Success!',
                            content: response.message,
                            buttons: {
                                confirm: function () {
                                    window.location.href=BASE_URL+'/application/document?submissionID='+response.model.id;
                                },
                            } 
                        });
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
            },
            cancel: function() {
                onStopLoader();
            },
        }
    }); 
}
/**
 *Function to submit Application for Micro Small Industry step one application by ajax.
 */
function submitMicroSmallIndustryStepOne(event) {
    $('#micro_small_industry_stepone').yiiActiveForm('validate');
    if($('#micro_small_industry_stepone').find('.has-error').length) {
      return false;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    var data = $("#micro_small_industry_stepone").serializeArray();
    var formData = new FormData($('#micro_small_industry_stepone')[0]);
    $.confirm({
        title: 'Confirm!',
        content: 'Are you ready to submit??',
        buttons: {
            confirm: function() {
                onStartLoader();
                $.ajax({
                    url: BASE_URL + "/grant/micro-small-industry/submit-step-one",
                    type: 'post',
                    enctype: 'multipart/form-data',
                    dataType: 'json',
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
                })
                .done(function(response) {
                    if(response.success == true) { 
                        onStopLoader();
                        $.confirm({
                            title: 'Success!',
                            content: response.message,
                            buttons: {
                                confirm: function () {
                                    window.location.href=BASE_URL+'/application/document?submissionID='+response.model.id;
                                },
                            } 
                        });
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
            },
            cancel: function() {
                onStopLoader();
            },
        }
    }); 
}
/**
 *Function to submit Application for House Construction step one application by ajax.
 */
function submitHouseConstructionStepOne(event) {
    $('#house_construction_stepone').yiiActiveForm('validate');
    if($('#house_construction_stepone').find('.has-error').length) {
      return false;
    }
    event.preventDefault();
    event.stopImmediatePropagation();
    var data = $("#house_construction_stepone").serializeArray();
    var formData = new FormData($('#house_construction_stepone')[0]);
    $.confirm({
        title: 'Confirm!',
        content: 'Are you ready to submit?',
        buttons: {
            confirm: function() {
                onStartLoader();
                $.ajax({                   
                    url: BASE_URL + "/grant/house-construction/submit-step-one",
                    type: 'post',
                    enctype: 'multipart/form-data',
                    dataType: 'json',
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false,
                })
                .done(function(response) {
                    if(response.success == true) { 
                        onStopLoader();
                        $.confirm({
                            title: 'Success!',
                            content: response.message,
                            buttons: {
                                confirm: function () {
                                    window.location.href=BASE_URL+'/application/document?submissionID='+response.model.id;
                                },
                            } 
                        });
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
            },
            cancel: function() {
                onStopLoader();
            },
        }
    }); 
}