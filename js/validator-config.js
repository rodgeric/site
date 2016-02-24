$(document).ready(function(){
  
  // Validation when click submit
  $('.push-btn').click(function (e) {

      var name = $(this).siblings('.name-field');
      var sername = $(this).siblings('.sername-field');
      var fathername = $(this).siblings('.fathername-field');
      var datefield = $(this).siblings('.date-field');
      var phone = $(this).siblings('.phone-field'); 
      var email = $(this).siblings('.email-field');
      var message = $(this).siblings('.message-field');
      var allFormElements = $(this).siblings('[type=text]');

      var trimmed = $.trim($(email).val());
      $(email).val(trimmed);
      //Main validation ckecher
      // if ( $(this).siblings().is('.message-field') ) {
      //      if( message.val() === '' || message.val().length > 500 ) {
      //       message.addClass('notvalid');
      //       e.preventDefault();
      //       console.log('no message');
      //      }
      // }
      /*if ( $(this).siblings().is('.name-field') && !/^[а-яА-ЯёЁa-zA-Z][^0-9]+$/.test( name.val() ) ) {
          name.addClass('notvalid').shake();
          e.preventDefault();
          console.log('no name');
      }*/
      // if ( $(this).siblings().is('.sername-field') && !/^[а-яА-ЯёЁa-zA-Z][^0-9]+$/.test( sername.val() ) ) {
      //     sername.addClass('notvalid');
      //     e.preventDefault();
      //     console.log('no sername');
      // }
      /*if ( $(this).siblings().is('.date-field') && datefield.val().length < 1 ) {
          datefield.addClass('notvalid').shake();
          e.preventDefault();
          console.log('no datefield');
      }*/
      // if ( $(this).siblings().is('.fathername-field') && !/^[а-яА-ЯёЁa-zA-Z][^0-9]+$/.test( fathername.val() ) ) {
      //     fathername.addClass('notvalid');
      //     e.preventDefault();
      //     console.log('no fathername');
      // }
/*      if ( $(this).siblings().is('.phone-field') && phone.val().length < 1 ) {
          phone.addClass('notvalid').shake();
          e.preventDefault();
          console.log('no phone');
      }*/
      /*if ( $(this).siblings().is('.message-field') && message.text().length < 5 ) {
        message.addClass('notvalid').shake();
        e.preventDefault();
        console.log('no text');
      }*/
      if ( $(this).siblings().is('.email-field') && !/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test( email.val() ) ) {
          email.addClass('notvalid').shake();
          e.preventDefault();
          console.log('no mail');
      }

     /* if ( $(this).siblings("input[type=text], input[type=tel]").each().val().length > 20 ) {
          $(this).siblings("input").addClass('notvalid').shake();
          e.preventDefault();
          console.log('no length');
      } */
  });

  // Validation when unfocus
  /*$('.push-btn').siblings('.name-field').focusout(function(){
    if ( $(this).val() > 0 && !/^[а-яА-ЯёЁa-zA-Z][^0-9]+$/.test( $(this).val() ) ) {
        $(this).addClass('notvalid').shake();
        e.preventDefault();
    }
  });*/
  
  // $('.push-btn').siblings('.email-field').focusout(function(){
  //   if ( $(this).val() < 16 && !/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test( $(this).val() ) ) {
  //       $(this).addClass('notvalid').shake();
  //       e.preventDefault();
  //   }
  // });
  /*$('.push-btn').siblings('.message-field').focusout(function(){
    if ( $(this).val() > 0 && $(this).val().length > 500 || $(this).val().length === 0 ) {
        $(this).addClass('notvalid').shake();
        e.preventDefault();
    }
  });*/
  
  // add mask to phone
  $('.phone-field').inputmask('+7(999) 999-99-99');

});

