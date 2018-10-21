$(() => {

  let phone, card_number;

  // get info of current user from database
  $.ajax({
    method: "GET",
    url: "/api/users/" + currUser
  }).done((user) => {
    phone = user[0].phone;
    card_number = user[0].card_number;

    // if user has entered a phone number, prepopulate it; else display prompt
    if (phone) {$('#confirm-tel').attr('value', phone);}
    else {$('#confirm-tel').attr('placeholder', 'Please enter your number (no dashes or spaces)');}

    // if user has entered a cred card, display an option to pay by card
    if (card_number) {
      let str_card = String(card_number);
      let display_card = "************" + str_card.substring(str_card.length - 4, str_card.length);
      $('.form-control').append(`<option>credit card: ${display_card}</option>`);
    }
  });
});
