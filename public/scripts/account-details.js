$(() => {

  let phone, email, name, card_number, card_security, card_expire;

  // get account info from database to display
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

      // display email
      $('#email').attr('value', email);

      // display phone number or prompt to enter
      if (phone) {$('#tel').attr('value', phone);}
      else {$('#tel').attr('placeholder', 'Please enter your number (no dashes or spaces)').addClass("form-unfilled");}

      // display name or prompt to enter
      if (name) {$('#user-name').attr('value', name);}
      else {$('#user-name').attr('placeholder', 'Please enter your name (as it appears on your card)').addClass("form-unfilled");}

      // display last four digits of card number or prompt to enter
      if (card_number) {
        let str_card = String(card_number);
        let display_card = "************" + str_card.substring(str_card.length - 4, str_card.length);
        $('#card-number').attr('value', display_card);
      }
      else {$('#card-number').attr('placeholder', 'Please enter your card number').addClass("form-unfilled");}

      // display *** in place of cvv or prompt to enter
      if (card_security) {$('#card-cvv').attr('value', '***');}
      else {$('#card-cvv').attr('placeholder', 'Please enter your card\'s CVV').addClass("form-unfilled");}

      // display expiry date or prompt to enter
      if (card_expire) {$('#card-expire').attr('value', card_expire);}
      else {$('#card-expire').attr('placeholder', 'Please enter your card\'s expiry (MMYY)').addClass("form-unfilled");}

    });

  // update credit card info in database
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
      window.location.href = "/myaccount";
    });
  });

  // update contact info in database
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
      window.location.href = "/myaccount"
    });
  });

});
