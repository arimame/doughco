$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  $('#sign-in-button').click(function(e) {
  	e.preventDefault();
  	$.ajax({
  		method: 'POST',
  		url: '/api/users/register',
  		data: {
  			email: $('#email').val(),
  			password: $('#password').val()
  		}
  	});
  });

});
