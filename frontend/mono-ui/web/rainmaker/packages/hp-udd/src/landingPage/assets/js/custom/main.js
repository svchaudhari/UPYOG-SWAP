import $ from 'jquery'
var partialViewContainer    = $("#partial_view_container");
var renewalPartialViewContainer    = $("#renewal_partial_view_container");
$(document).ready(function () {

  $("#profile-img").change(function () {
    GetFileSize(this);
  });

  $('[data-toggle="tooltip"]').tooltip();
	
	//////////////////////////////////Department of WCD///////////////////////////////////
	/**
	 *Submit step one Application Grant - Marriage Grant
	 */
	$('body').on('beforeSubmit', 'form#marriage_grant_stepone', function (event) {
       /* alert('here');  */
	      submitMarriageGrantStepOne(event);
      	  return false;
	});
    /**
     *Submit step one Application Grant - Coaching Grant
     */
    $('body').on('beforeSubmit', 'form#coaching_grant_stepone', function (event) {
          /*alert('here');*/  
          submitCoachingGrantStepOne(event);
            return false;
    });

  /**
   *Submit step one Application - Higher Education
   */
  $('body').on('beforeSubmit', 'form#higher_education_stepone', function (event) {
       /* alert('here');  */
        submitHigherEducationStepOne(event);
          return false;
  });
  /**
   *Submit step one Application - Vocational Training
   */
  $('body').on('beforeSubmit', 'form#vocational_training_stepone', function (event) {
       /* alert('here');  */
        submitVocationalTrainingStepOne(event);
          return false;
  });
  /**
   *Submit step one Application - Skill Development
   */
  $('body').on('beforeSubmit', 'form#skill_development_stepone', function (event) {    
        submitSkillDevelopmentStepOne(event);
          return false;
  });
  /**
   *Submit step one Application - Micro Small Industry
   */
  $('body').on('beforeSubmit', 'form#micro_small_industry_stepone', function (event) {       
        submitMicroSmallIndustryStepOne(event);
          return false;
  });
  /**
   *Submit step one Application - Micro Small Industry
   */
  $('body').on('beforeSubmit', 'form#house_construction_stepone', function (event) {       
        submitHouseConstructionStepOne(event);
          return false;
  });
	
	/**
	 *Update text to UPPERCASE of all Input.
	 */
	$("input[type=text]").keyup(function () {  
		$(this).val($(this).val().toUpperCase());  
	}); 
	/**
	 *Validation to allow numeric without decimal.
	 */
	$(".allownumericwithoutdecimal").on("keypress keyup blur",function (event) {    
		$(this).val($(this).val().replace(/[^\d].+/, ""));
		  if ((event.which < 48 || event.which > 57)) {
			event.preventDefault();
		}
    });
	/**
	 *Validation to allow text only.
	 */	
    $( ".txtOnly" ).keypress(function(e) {
		var key = e.keyCode;
		if (key >= 48 && key <= 57) {
			e.preventDefault();
		}
	});
	/**
	 *Validation to allow Integer only.
	 */		
	$( ".intOnly" ).keypress(function(e) {
		var key = e.keyCode;
		if (key > 31 && (key < 48 || key > 57)) {
			e.preventDefault();
		}
	});
	/**
	 *Validation to Final Submit.
	 */	
	$("#finalSubmit").on("click", function(){
    	if($('.agree').prop("checked") == false){
        	alert("Please Select Terms and Conditions to Proceed.");
        	return false;

      	}
    	else{
    		$("#finalSubmitForm").submit();
      		return true;
     	}
  	});	

	


	

	
});  


/**
 *Start loader on ajax response.
 */
function onStartLoader() {
    $("#erp_loader").removeClass("d-none");
    var body = document.body;
    body.classList.add("loader_body");
}
/**
 *Stop loader on ajax response.
 */
function onStopLoader() {
    $("#erp_loader").addClass("d-none");
    var body = document.body;
    body.classList.remove("loader_body");
}
/**
 * Function to clone table input. 
 */
function addItem(TableName,selectIndex,selectName) { 
	
//	var rowCount = $('.'+TableName+' tr').length;
//	var clone = $('.'+TableName+' tr:last').clone();
//	clone.find('select').attr('id', 'selectfilter_'+rowCount);
//	clone.attr('id', 'table_'+rowCount);
//	clone.insertAfter('.'+TableName+' tr:last');
//	$(".selectfilter").selectpicker();
//	$("#selectfilter_"+rowCount).selectpicker();
//	$("#selectfilter_"+rowCount).selectpicker('refresh');


  var tableBody = document.getElementById(TableName).getElementsByTagName("tbody")[0];
  var selectRows = document.getElementsByClassName("selectpicker-row");

  // Get the last select row to clone
  var lastSelectRow = selectRows[selectRows.length - 1];

  // Clone the row
  var clonedRow = lastSelectRow.cloneNode(true);

  // Reset the remove button
  var clonedRemoveButton = clonedRow.getElementsByClassName("remove-row")[0];
  clonedRemoveButton.addEventListener("click", function () {
    removeRow(this);
  });

  // Get all the selectpicker elements in the original row
  var originalSelectpickers = lastSelectRow.getElementsByClassName("selectpicker");

  // Iterate over the selectpicker elements in the original row
  for (var i = 0; i < originalSelectpickers.length; i++) {
    var originalSelectpicker = originalSelectpickers[i];

    // Create a new select element
    var newSelect = document.createElement("select");
    newSelect.className = "selectpicker";
    newSelect.name = selectName;

    newSelect.setAttribute("data-live-search", "true");


    // Copy the options from the original selectpicker
    for (var j = 0; j < originalSelectpicker.options.length; j++) {
      var option = document.createElement("option");
      option.text = originalSelectpicker.options[j].text;
      option.value = originalSelectpicker.options[j].value;
      newSelect.appendChild(option);
    }

    // Append the new select element to the cloned row
    clonedRow.getElementsByTagName("td")[selectIndex].innerHTML = "";
    clonedRow.getElementsByTagName("td")[selectIndex].appendChild(newSelect);

    // Initialize the new selectpicker
    	$(newSelect).selectpicker();
	
		
  }

  // Append the cloned row to the table body
  tableBody.appendChild(clonedRow);

  	const elements = document.getElementsByClassName('dropdown bootstrap-select');
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		element.style.width = '100%';
	}

}

function addItemWithOutSelect(TableName) { 
	var rowCount = $('.'+TableName+' tr').length;
	var clone = $('.'+TableName+' tr:last').clone();
	clone.find('input').val('');
	clone.insertAfter('.'+TableName+' tr:last');
}
/**
 * Function to remove table input. 
 */
function removeItem(TableName) { 
    $('.'+TableName).off('click').on('click', '.btnDelete', function () {
    	if(($('.'+TableName+' tbody tr').length) != 1){
        	$(this).closest('tr').remove();
        }
        else{
        	alert("Minimum 1 line is required in table");
        }
    });
} 
/**
 *Function to get file size.
 */
function GetFileSize(input) {
  var fi = document.getElementById('profile-img'); // GET THE FILE INPUT.
  var val = $(fi).val();
  switch(val.substring(val.lastIndexOf('.') + 1).toLowerCase()){
  case 'jpeg': case 'jpg': case 'png':
  // VALIDATE OR CHECK IF ANY FILE IS SELECTED.
  if (fi.files.length > 0) {
      // RUN A LOOP TO CHECK EACH SELECTED FILE.
      for (var i = 0; i <= fi.files.length - 1; i++) {
        var fsize = fi.files.item(i).size;      // THE SIZE OF THE FILE.
        var fileSize = Math.round((fsize / 1024));
      }
    }
    if(fileSize < 200){
      readURL(input)
    } else {
      $("#profile-img").val('');
      $.alert({
        title: 'Alert!',
        content: 'Please upload images less then or equal to 200KB!',
      });
    }
    break;
    default:
    $('#profile-img').val('');
    $.alert({
      title: 'Alert!',
      content: 'Please upload only JPEG or PNG',
    });
  }
}
/**
 *Function to show image preview.
 */
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#profile-img-tag').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}



