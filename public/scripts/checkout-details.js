$(() => {

  let phone, card_number;

  $.ajax({
    method: "GET",
    url: "/api/users/" + currUser
  }).done((user) => {
      phone = user[0].phone;
      card_number = user[0].card_number;
      if (phone) {$('#confirm-tel').attr('value', phone);}
      else {$('#confirm-tel').attr('placeholder', 'Please enter your number (no dashes or spaces)');}
      if (card_number) {
        let str_card = String(card_number);
        let display_card = "************" + str_card.substring(str_card.length - 4, str_card.length);
        $('.form-control').append(`<option>credit card: ${display_card}</option>`);
      }

    });

});
