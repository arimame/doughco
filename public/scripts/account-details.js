$(() => {

  let phone, email, name, card_number, card_security, card_expire;

  $.ajax({
    method: "GET",
    url: "/api/users/" + currUser
  }).done((user) => {
      phone = user[0].phone;
      email = user[0].email;
      name = user[0].name;
      card_number = user[0].card_number;
      card_security = user[0].card_security;
      card_expire = user[0].card_expire;
      // $('#current-email').text(`Current email: ${email}`);
      // $('#current-phone').text(`Current phone number: ${phone || 'not set'}`);
      $('#email').attr('value', email);
      if (phone) {$('#tel').attr('value', phone);}
      else {$('#tel').attr('placeholder', 'Please enter your number (no dashes or spaces)').addClass("form-unfilled");}
      if (name) {$('#user-name').attr('value', name);}
      else {$('#user-name').attr('placeholder', 'Please enter your name (as it appears on your card)').addClass("form-unfilled");}
      if (card_number) {
        let str_card = String(card_number);
        let display_card = "************" + str_card.substring(str_card.length - 4, str_card.length);
        $('#card-number').attr('value', display_card);
      }
      else {$('#card-number').attr('placeholder', 'Please enter your card number').addClass("form-unfilled");}
      if (card_security) {$('#card-cvv').attr('value', '***');}
      else {$('#card-cvv').attr('placeholder', 'Please enter your card\'s CVV').addClass("form-unfilled");}
      if (card_expire) {$('#card-expire').attr('value', card_expire);}
      else {$('#card-expire').attr('placeholder', 'Please enter your card\'s expiry (MMYY)').addClass("form-unfilled");}

    });

  $('#credit-card').submit(function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/users/update/cc/' + currUser,
      data: {
        name: $('#user-name').val(),
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
