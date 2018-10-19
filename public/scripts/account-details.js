$(() => {

  let phone;
  let email;

  $.ajax({
    method: "GET",
    url: "/api/users/" + currUser
  }).done((user) => {
      console.log('user details', user);
      phone = user[0].phone;
      email = user[0].email;
      console.log(phone, email);
      $('#current-email').text(`Current email: ${email}`);
      $('#current-phone').text(`Current phone number: ${phone}`);
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
      console.log('good');
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
