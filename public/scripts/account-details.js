$(() => {

  let phone, email;

  $.ajax({
    method: "GET",
    url: "/api/users/" + currUser
  }).done((user) => {
      phone = user[0].phone;
      email = user[0].email;
      $('#current-email').text(`Current email: ${email}`);
      $('#current-phone').text(`Current phone number: ${phone || 'not set'}`);
    });

  $('#credit-card').submit(function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/users/update/cc/' + currUser,
      data: {
        card_number: $('#card-number').val(),
        card_security: $('#card-cvv').val(),
        card_expire: $('#card-expire').val()
      }
    })
    .then(function(r) {
      window.location.href = "/myaccount"
    });
  });

  $('#contact-info').submit(function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/users/update/contact/' + currUser,
      data: {
        email: $('#email').val(),
        phone: $('#tel').val()
      }
    }).then(function(r) {
      console.log('good good');
      window.location.href = "/myaccount"
    });
  });

});
