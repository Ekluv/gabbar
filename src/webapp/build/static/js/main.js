$(document).ready(function($) {

  if ($.validate) {
    $.validate();
  }

  checkSession()

  function serializeForm($form) {
  /* fn to convert formdata to JSON
       params: $form: jquery form obj
       source from following link
       http://stackoverflow.com/questions/1184624/convert-form-data-to-javascript-object-with-jquery
     */
  var o = {};
  var a = $form.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
}

  function checkSession() {
    if (window.localStorage.getItem('token')) {
      $('.log_pop .go-to-dashboard').removeClass('hidden');
    } else {
      $('.log_pop .login').removeClass('hidden');
    }
  }

  function saveTokenAndRedirectToDashboard(response) {
    console.log(response);
    window.localStorage.setItem('token', response.token);
    window.location = '/app';
  }

  function handleResponseError(err) {
    window.alertify.error('Error !');
    var errors = Object.values(err.responseJSON || {}).map(function(value) {
      return value[0];
    });
    window.alertify.alert('Error', errors.join('</br>'), function(){
    });
  }


  $('#register').submit(function(e) {
    e.preventDefault();
    var data = serializeForm($('#register'));
    $.ajax({
      url: '/v1/account/signup',
      type: 'POST',
      contentType: "application/json",
      data: JSON.stringify(data),
    })
    .done(saveTokenAndRedirectToDashboard)
    .fail(handleResponseError);
  });

  $('#loginForm').submit(function(e) {
    e.preventDefault();
    var data = serializeForm($('#loginForm'));
    $.ajax({
      url: '/v1/account/login',
      type: 'POST',
      contentType: "application/json",
      data: JSON.stringify(data),
    })
    .done(saveTokenAndRedirectToDashboard)
    .fail(handleResponseError);
  });
});
