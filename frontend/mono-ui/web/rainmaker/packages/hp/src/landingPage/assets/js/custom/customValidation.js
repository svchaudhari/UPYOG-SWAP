/**
* Jquery custom  validation 
*@author: Hemant Thakur
*
*/
var Inputerror=false;
$(function(){
    $('.address_field_with_space').on('keyup blur',function()
    {
        var inputString = $(this).val();
        var max=150;
        re = /[`~!@$%^&*|+=?;:'"<>\[\]]/gi,'';
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[`~!@$%^&*|+=?;:'"<>\[\]]/gi,'');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p class="alert alert-danger">Please, Enter Alphanumeric with Space /,.()#_- only please.</p>');
            $('.alert').fadeOut(2000);

        }
        if(inputString.length>max){
             $(this).val($(this).val().substr(0, max));
             $('.alert').remove();
             $(this).after('<p  class="alert alert-danger">Please, Enter less then 150.</p>');
             $('.alert').fadeOut(2000);
        }
    });

    $('.pan_min_length').on('blur',function(){
        var pan_min_length=10;
        var pan_max_length=10;
        var inputString = $(this).val();
        if(inputString.length<10){
            $(this).after('<p  class="alert alert-danger">Please, Enter valid 10 digit alphanuric PAN card.</p>');
            $('.alert').fadeOut(2000);
            $(this).focus();

        }
    })
    $('.adhar_min_length').on('blur',function(){
        var pan_min_length=10;
        var pan_max_length=10;
        var inputString = $(this).val();
        if(inputString.length<12 && inputString.length!=0){
            $(this).after('<p  class="alert alert-danger">Please, Enter valid 12 digit Adhar card.</p>');
            $('.alert').fadeOut(2000);
            $(this).focus();

        }
    })
    $('.pin_min_length').on('blur',function(){
        var pan_min_length=10;
        var pan_max_length=10;
        var inputString = $(this).val();
        if(inputString.length<6 && inputString.length!=0){
            $(this).after('<p  class="alert alert-danger">Please, Enter valid 6 digit Pincode.</p>');
            $('.alert').fadeOut(2000);
            $(this).focus();

        }
    })
    /*name with space*/
    $('.name_with_space').on('keyup blur',function()
    {
        var inputString = $(this).val();
        re = /[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Enter Alphabets with space only.</p>');
            $('.alert').fadeOut(2000);
            //$(this).val('');
        }else{
          $(this).val(inputString.toLowerCase().replace(/\b[a-z]/g, function(letter) {return letter.toUpperCase();}));  
        }
        
       
    });
    /*name without space*/
    $('.name_without_space').on('keyup blur',function()
    {
        var inputString = $(this).val();
        re = /[0-9`~!@#$%^&*()_|+\-=?;:'", .<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[0-9`~!@#$%^&*()_|+\-=?;:'", .<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Enter Alphabets with space only.</p>');
            $('.alert').fadeOut(2000);
        }
        else{
          $(this).val(inputString.toLowerCase().replace(/\b[a-z]/g, function(letter) {return letter.toUpperCase();}));  
        }    });
    /*alphanumeri*/
    $('.alphanumeric_name_with_space').on('keyup blur',function()
    {
        var inputString = $(this).val();
        re = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, use Alphabets and numbers only.</p>');
            $('.alert').fadeOut(2000);
        }
    });
    /*alphanumeri*/
    $('.alphanumeric_name_without_space').on('keyup blur',function()
    {
        var inputString = $(this).val();
        re = /[`~!@#$%^&*()_|+\-=?;:'", .<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[`~!@#$%^&*()_|+\-=?;:'", .<>\{\}\[\]\\\/]/gi,'');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, use Alphabets and numbers only.</p>');
            $('.alert').fadeOut(2000);
        }
    });
    /*numbers only*/
    $('.numbers_only').on('keyup blur',function()
    {
        var inputString = $(this).val();
        re = /[a-zA-Z`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Enter Numbers only.</p>');
            $('.alert').fadeOut(2000);
        }
    });
    /* Ratio*/
    $('.ratio_validation').on('keyup blur',function()
    {
        var inputString = $(this).val();
        re = /[a-zA-Z`~!@#$%^&*()_|+\-=?;'",.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Enter Numbers in ratio only.</p>');
            $('.alert').fadeOut(2000);
        }
    });
    $('.alphanumeric_with_astric').on('keyup blur',function()
    {
        var inputString = $(this).val();
        var max=150;
        re = /[`~!@$%^&*|+=?;:'"<>\[\]]/gi,'';
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[`~!@$%^&|+=?;:'"<>\[\]]/gi,'');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Enter Alphanumeric with Space /,.()#_- only please.</p>');
            $('.alert').fadeOut(2000);

        }
        if(inputString.length>max){
             $(this).val($(this).val().substr(0, max));
             $('.alert').remove();
             $(this).after('<p  class="alert alert-danger">Please, Enter less then 150.</p>');
             $('.alert').fadeOut(2000);
        }
    });
    /*mobile number*/
    $('.mobile_number_ten_digit_only').on('keyup blur',function()
    {
        var inputString = $(this).val();
        var length = $(this).length;
        var firstno = inputString.charAt(0);
        
        if(firstno<6){
            var no_spl_char = inputString.replace(/[a-zA-Z0-5`~!@#$%^&*()_|+\-=?;: '",.<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Mobile No Start with (6, 7 , 8, 9).</p>');
            $('.alert').fadeOut(2000);
        }
        
        var max=10;
        re = /[a-zA-Z`~!@#$%^&*()_|+\-=?;: '",.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;: '",.<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Enter Numbers only.</p>');
            $('.alert').fadeOut(2000);
        }
        if(inputString.length>max){
             $(this).val($(this).val().substr(0, max));
             $('.alert').remove();
             $(this).after('<p  class="alert alert-danger">Please, Enter Valid 10 digit mobile number.</p>');
             $('.alert').fadeOut(2000);
        }

        if(inputString.length==max){
            var valarr = [];
            var stts = 0;
            $(".mobile_number_ten_digit_only").each(function() {
                var curr = $(this).val();
                 if (jQuery.inArray(curr, valarr) > -1) {
                     stts = 1;
                  } else {
                      valarr.push(curr);
                  }   
             });

            if(stts==1){
                //alert(stts);
                //$(this).val('');

                $('.alert').remove();
                $(this).after('<p  class="alert alert-danger">Claimant Witness Mobile No. and Applicant Mobile Must should be Different</p>');
                $('.alert').fadeOut(2000);
                $( this ).focus();
            }
        }


    });

    $('.mobile_number_ten_digit_only_masking').on('keyup blur',function()
    {
        var inputString = $(this).val();
        var length = $(this).length;
        var firstno = inputString.charAt(0);
        var max=11;
        let inputmass = inputString.replace(/\_/g, '');
        re = /[a-zA-Z`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);

        if(firstno<6){
            var no_spl_char = inputString.replace(/[a-zA-Z0-5`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Mobile No Start with (6, 7 , 8, 9).</p>');
            $('.alert').fadeOut(2000);
        }
        else if(isSplChar)
        {   
            var no_spl_char = inputString.replace(/[a-zA-Z`~!@#$%^&*()|+\-=?;: '",.<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Enter Numbers only.</p>');
            $('.alert').fadeOut(2000);
        } 
        else if(inputmass.length>max){
             $(this).val($(this).val().substr(0, max));
             $('.alert').remove();
             $(this).after('<p  class="alert alert-danger">Please, Enter Valid 10 digit mobile number.</p>');
             $('.alert').fadeOut(2000);
        }

        if(inputmass.length==max){
            var valarr = [];
            var stts = 0;
            $(".mobile_number_ten_digit_only").each(function() {
                var curr = $(this).val();
                 if (jQuery.inArray(curr, valarr) > -1) {
                     stts = 1;
                  } else {
                      valarr.push(curr);
                  }   
             });

            if(stts==1){
                //alert(stts);
                //$(this).val('');

                $('.alert').remove();
                $(this).after('<p  class="alert alert-danger">Claimant Witness Mobile No. and Applicant Mobile Must should be Different</p>');
                $('.alert').fadeOut(2000);
                $( this ).focus();
            }
        }


    });

     $('.account_no_masking').on('keyup blur',function()
    {
        var inputString = $(this).val();
        var length = $(this).length;
        var firstno = inputString.charAt(0);
        
        var max=22;
        re = /[a-zA-Z`~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {   
            var no_spl_char = inputString.replace(/[a-zA-Z`~!@#$%^&*()|+\-=?;: '",.<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Enter Numbers only.</p>');
            $('.alert').fadeOut(2000);
        }
        if(inputString.length>max){
             $(this).val($(this).val().substr(0, max));
             $('.alert').remove();
             $(this).after('<p  class="alert alert-danger">Please, Enter Valid Account number.</p>');
             $('.alert').fadeOut(2000);
        }

        if(inputString.length==max){
            var valarr = [];
            var stts = 0;
            $(".mobile_number_ten_digit_only").each(function() {
                var curr = $(this).val();
                 if (jQuery.inArray(curr, valarr) > -1) {
                     stts = 1;
                  } else {
                      valarr.push(curr);
                  }   
             });
        }


    });
    /*mobile number*/
    $('.mobile_number_ten_digit_only_duplicate').on('keyup blur',function()
    {
        var inputString = $(this).val();
        var length = $(this).length;
        var firstno = inputString.charAt(0);
        
        if(firstno<6){
            var no_spl_char = inputString.replace(/[a-zA-Z0-5`~!@#$%^&*()_|+\-=?;: '",.<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Mobile No Start with (6, 7 , 8, 9).</p>');
            $('.alert').fadeOut(2000);
        }
        
        var max=10;
        re = /[a-zA-Z`~!@#$%^&*()_|+\-=?;: '",.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;: '",.<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Enter Numbers only.</p>');
            $('.alert').fadeOut(2000);
        }
        if(inputString.length>max){
             $(this).val($(this).val().substr(0, max));
             $('.alert').remove();
             $(this).after('<p  class="alert alert-danger">Please, Enter Valid 10 digit mobile number.</p>');
             $('.alert').fadeOut(2000);
        }


    });
    /*aadhar number*/
    $('.aadhar_number').on('keyup blur',function()
    {
        var inputString = $(this).val();
        var max=12;
        re = /[a-zA-Z`~!@#$%^&*()_|+\-=?;:'", .<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:'", .<>\{\}\[\]\\\/]/gi,'');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Enter Numbers only.</p>');
            $('.alert').fadeOut(2000);
        }
        if(inputString.length>max){
             $(this).val($(this).val().substr(0, max));
             $('.alert').remove();
             $(this).after('<p  class="alert alert-danger">Please, Enter Valid 12 digit mobile number.</p>');
             $('.alert').fadeOut(2000);
        }
    });
    /*six digit*/
    $('.six_digit_zip_code').on('keyup blur',function()
    {
        var inputString = $(this).val();
        var max=7;
        re = /[a-zA-Z`~!@#$%^&*()_|+\-=?;:'" ,.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:'" ,.<>\{\}\[\]\\\/]/gi,'');
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Numbers Only</p>');
            $('.alert').fadeOut(2000);
            $(this).val(no_spl_char);
        }
        if(inputString.length>max){
             $(this).val($(this).val().substr(0, max));
             $('.alert').remove();
             $(this).after('<p  class="alert alert-danger">Please, Enter Valid '+max+' digit Pincode number.</p>');
             $('.alert').fadeOut(2000);
        }
    });
/*telephone numbers*/

    $('.telephone_numbers').on('keyup blur',function()
    {
        var inputString = $(this).val();
        var max=12;
        re = /[a-zA-Z`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[a-zA-Z`~!@#$%^&*()_|+=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Numbers Only with -</p>');
            $('.alert').fadeOut(2000);
            $(this).val(no_spl_char);
        }
        if(inputString.length>max){
             $(this).val($(this).val().substr(0, max));
             $('.alert').remove();
             $(this).after('<p  class="alert alert-danger">Please, Enter Valid '+max+' digit telephone number.</p>');
             $('.alert').fadeOut(2000);
        }
    });

    $('.email').on('blur',function()
    {
        var inputString = $(this).val();
        var re = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
        var emailCheck=re.test(inputString);
        if(emailCheck===false){
            $(this).val("");
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Enter Valid email id.</p>');
            Inputerror=true;
        }
        else{
           $('.alert').fadeOut(200);
            Inputerror=false;
        }
    });
    
    /*decimal number*/
    $('.decimal').on('keyup blur',function()
    {
        var inputString = $(this).val();
        var max=9;
        if(inputString.length>max){
             $(this).val($(this).val().substr(0, max));
             $('.alert').remove();
             $(this).after('<p  class="alert alert-danger">Please, Enter max 9 digit.</p>');
             $('.alert').fadeOut(2000);
        }
        re = /[a-zA-Z`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[a-zA-Z`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Enter Numbers only.</p>');
            $('.alert').fadeOut(2000);
        }
        var re = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/;
        var decimal=re.test(inputString);
        if(decimal===false){
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Enter valid decimal number.</p>');
            
            Inputerror=true;
        }
        else{
           $('.alert').fadeOut(200);
            Inputerror=false;
        }

    });

    /*mobile number*/
    $('.year').on('keyup blur',function()
    {
        var inputString = $(this).val();
        var max=9;
        re = /[a-zA-Z`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi;
        var isSplChar = re.test(inputString);
        if(isSplChar)
        {
            var no_spl_char = inputString.replace(/[a-zA-Z`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '');
            $(this).val(no_spl_char);
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Please, Enter Numbers only.</p>');
            $('.alert').fadeOut(2000);
        }
        if(inputString.length>max){
             $(this).val($(this).val().substr(0, max));
             $('.alert').remove();
             $(this).after('<p  class="alert alert-danger">Please, Enter Valid year.</p>');
             $('.alert').fadeOut(2000);
        }
    });
    /*date should not less than today's date*/
    $('.date_should_not_less_than_today').on('blur',function()
    {
        var inputString =$(this).val();
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        var input=inputString.split("-");
        var input_month = parseInt(input[0]);
        var input_day = parseInt(input[1]);
        var input_year = parseInt(input[2]);
        var startDt = curr_year+"-"+parseInt(curr_month+1)+"-"+curr_date;
        if(input_year >= curr_year){
            if(input_month>=curr_month){
                if(input_day>curr_date){
                    Inputerror=false;
                    $('.alert').remove();
                }
                else{
                    $('.alert').remove();
                    $(this).after('<p  class="alert alert-danger">Selected day should not less than current day.</p>');
                    $('#other').val("");
                    Inputerror=true;
                }
            }
            else{
                $('.alert').remove();
                $(this).after('<p  class="alert alert-danger">Selected Month should not less than current month.</p>');
                $('#other').val("");
                Inputerror=true;
            }
        }
        else{
            $('.alert').remove();
            $(this).after('<p  class="alert alert-danger">Selected Year should not less than current year.</p>');
            $('#other').val("");
            Inputerror=true;
        }
    });

});


    