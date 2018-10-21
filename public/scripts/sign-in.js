$(() => {
  $('#sign-in-button').click(function(e) {
  	e.preventDefault();
  	$.ajax({
  		method: 'POST',
  		url: '/api/users/register',
  		data: {
  			email: $('#email').val(),
  			password: $('#password').val()
  		}
  	}).then(function(r) {
      window.location.href = "/";
    });
  });

});
