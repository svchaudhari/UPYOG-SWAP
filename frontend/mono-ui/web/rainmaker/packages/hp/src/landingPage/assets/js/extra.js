import $ from 'jquery'
//custom flexslider start
$(document).ready(function($) {
//js for photo gallery component design 1
// $('.thumb-bottom-scroll').flexslider({
//         animation: "fade",
// 		controlNav: false,
// 		animationLoop: false,
// 		slideshow: false,
//         sync: ".thumb-bottom-crucel"
// }),
// $('.thumb-bottom-crucel').flexslider({
//         animation: "slide",
// 		controlNav: false,
// 		animationLoop: false,
// 		slideshow: false,
// 		itemWidth: 210,
// 		//itemMargin: 5,
//         asNavFor: ".thumb-bottom-scroll"
//      }),
// //=========================

// $('.thumb-bottom').flexslider({
//         animation: "fade",
//         controlNav: "thumbnails",
//         start: function(slider){
//           $('body').removeClass('loading');
//         }
//       });
// //=========================
// $('.no-thumb').flexslider({
//         animation: "fade",
//         controlNav: false,
//         start: function(slider){
//           $('body').removeClass('loading');
//         }
//       });
// //=========================
// $('.thumb-right').flexslider({
//         animation: "fade",
//         controlNav: "thumbnails",
//         start: function(slider){
//           $('body').removeClass('loading');
//         }
//       });
// //=========================
// $('.thumb-left').flexslider({
//         animation: "fade",
//         controlNav: "thumbnails",
//         start: function(slider){
//           $('body').removeClass('loading');
//         }
//       });

//=========================


  //js for photo gallery component design 2
  $(".HomeGalleryCarasole").flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 200
  });
  $("#HomeVideoCarasole").flexslider({
    animation: "slide",
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 200
  });


  /*$("#doc-filter-form-container .datepicker.start-date").datepicker({
    dateFormat: "dd-mm-yy",
    changeYear: true,
    changeMonth: true,
    onSelect: function () {
      let endDate = $('#doc-filter-form-container .datepicker.end-date');
      if (endDate.val() != '') endDate.val('');
      endDate.datepicker('option', 'minDate', $(this).val());
    }
  });*/
  /*$("#doc-filter-form-container .datepicker.end-date").datepicker({ dateFormat: "dd-mm-yy", changeYear: true, changeMonth: true });
  if ($("#doc-filter-form-container .datepicker.start-date").val() != '') {
    let startDate = $('#doc-filter-form-container .datepicker.start-date');
    let endDate = $('#doc-filter-form-container .datepicker.end-date');
    endDate.datepicker('option', 'minDate', startDate.val());
  }*/
  $("form#doc-filter-form-container button[type='submit']").click(function (event) {

    event.preventDefault();
    $('input,select').each(function () {
      if ($(this).val() == "") {
        $(this).attr("disabled", "disabled");
      }
    });
    $(this).parents('form').submit();

  });
  $("form#doc-filter-form-container button[type='reset']").click(function (event) {

    event.preventDefault();
    let redirectUrl = $(this).attr('data-reset-url');
    if (redirectUrl == '') return;

    window.location.href = redirectUrl;
  });
  $('form#doc-filter-form-container select#document_category').on('change', function () {
    var formAction = $(this).val();
    if (formAction != '')
      $(this).parents('form').attr('action', formAction);
  });

  document.addEventListener("keyup", function (e) {
    if (e.keyCode === 9) {
      $("body").addClass("show-focus-outlines");
    }
  });

  document.addEventListener("mousedown", function (e) {
    $("body").removeClass("show-focus-outlines");
  });


});
