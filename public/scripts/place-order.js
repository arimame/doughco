// placeOrder displays the cart and send the order information to the location's phone number using Twilio
function placeOrder(cookieStr, userEmail, locationId) {

  let cartArr = [];
  let userPhone;
  let locationPhone;

  // obtain user phone number for Twilio
  $.ajax({
  method: "GET",
  url: `/api/users/${userEmail}`
  })
  .done((user) => {
    userPhone = user[0].phone;
  });

  // obtain location phone number for Twilio
  $.ajax({
    method: "GET",
    url: `/api/location/${locationId}`
  })
  .done((location) => {
    locationPhone = location[0].phone_number;
  });

  // breaks the cookie string into an array of arrays of length 2 of the form [id, value]
  let cookies = cookieStr.split("; ");
  let cookieArr = [];
  for (let cookie of cookies) {
    cookieArr.push(cookie.split("="));
  }

  // sorts cookies by the ids of the donuts
  cookieArr = cookieArr.sort((a, b) => {
    if (Number(a[0]) < Number(b[0])) return -1;
    if (Number(a[0]) > Number(b[0])) return 1;
    return 0;
  });

  const $cart = $("#cart");

  $cart.empty();
  let totalPrice = 0;
  let totalQty = 0;

  $cart.append(`
    <p class="cartheading"> Your order summary <p>
    <div class="row">
      <div class="col-lg-3" align="center"><p>qty</p></div>
      <div class="col-lg-6" align="center"><p>item</p></div>
      <div class="col-lg-3" align="center"><p>price</p></div>
    </div>
  `);

  // display each donut which has a cookie in the cart, with its quantity and price,
  // and also add this info to the order which is sent to the location's phone number
  for (let i = 0; i < cookieArr.length; i++) {
    $.ajax({
    method: "GET",
    url: `/api/food/${cookieArr[i][0]}`
    })
    .done((food) => {
      cartArr.push({name: food[0].name, quantity: cookieArr[i][1]});
      $cart.append(`
        <div class="row">
          <div class="col-lg-3" align="center">${cookieArr[i][1]}</div>
          <div class="col-lg-6" align="center">${food[0].name}</div>
          <div class="col-lg-3" align="center">$${(food[0].price * cookieArr[i][1]).toFixed(2)}</div>
        </div>`);
      totalPrice += Number(food[0].price * cookieArr[i][1]);
      totalQty += Number(cookieArr[i][1]);
    });
  }

  // displays total information, after the individual donut information has been retrieved by the database
  setTimeout(function() {
    let dozens = Math.floor(totalQty / 12);
    let discount = dozens * 5.99;

    // adds discount for each dozen purchased
    if (dozens >= 1) {
      $cart.append(`<div class="totalcart"><i>Dozen Discount: -$${discount.toFixed(2)}</i></div>`);
    }

    // displays taxes, total price, and checkout button
    let tax = ((Number(totalPrice - discount) * 0.13));
    $cart.append(`<div class="totalcart"><i>Tax: $${tax.toFixed(2)}</i></div>`);
    $cart.append(`<div class = "totalcart finaltotal"><b>Total: $${(totalPrice - discount + tax).toFixed(2)}</b></div><form  id="submit-cart" method="GET" action="/checkout" align="center"><input class="btn btn-primary" type="submit" value="Place Order"></form>`);

    // submits order
    $('#submit-cart').submit(function(e) {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/checkout/process',
        data: {
          cart: JSON.stringify(cartArr),
          clientPhone: userPhone,
          clientEmail: userEmail,
          storePhone: locationPhone
        }
      }).done(window.location.href = '/order/purgatory/' + userPhone); // change to clientPhone
    });

  }, 150);
};

