function updateCart(cookies, userEmail, locationId) {

  let cartArr = [];

  let userPhone;
  let locationPhone;

  $.ajax({
  method: "GET",
  url: `/api/users/${userEmail}`
  })
  .done((user) => {
    userPhone = user[0].phone;
    // console.log(userPhone);
  });

  $.ajax({
    method: "GET",
    url: `/api/location/${locationId}`
  })
  .done((location) => {
    locationPhone = location[0].phone_number;
    // console.log(locationPhone);
  });

  // console.log(userPhone, locationPhone);

  let cookieArr = cookies.split("; ");

  let cookieArrArr = [];
  for (let cookie of cookieArr) {
    cookieArrArr.push(cookie.split("="))
  }

  cookieArrArr = cookieArrArr.sort((a, b) => {
    // console.log(Number(a[0]), Number(b[0]));
    if (Number(a[0]) < Number(b[0])) return -1;
    if (Number(a[0]) > Number(b[0])) return 1;
    return 0;
  })

  // console.log(cookieArrArr)

  const $cart = $("#cart");

  $cart.empty();
  let totalPrice = 0;
  let totalQty = 0;
  $cart.append(
  `<p class="cartheading"> Your order summary <p>
    <div class="row">
      <div class="col-lg-2" align="center"><p>qty</p></div>
      <div class="col-lg-5" align="center"><p>item</p></div>
      <div class="col-lg-3" align="center"><p>price</p></div>
      <div class="col-lg-2" align="center"><p></p></div>
    </div>

  `);
  for (let i = 0; i < cookieArrArr.length; i++) {
    $.ajax({
    method: "GET",
    url: `/api/food/${cookieArrArr[i][0]}`
    })
     .done((food) => {
      cartArr.push({name: food[0].name, quantity: cookieArrArr[i][1]});
      // output.push([food[0].name, cookieArrArr[i][1]]);
      $cart.append(`

        <div class="row">
          <div class="col-lg-2" align="center">${cookieArrArr[i][1]}</div>
          <div class="col-lg-5" align="center">${food[0].name}</div>
          <div class="col-lg-3" align="center">$${(food[0].price * cookieArrArr[i][1]).toFixed(2)}</div>
          <div class="col-lg-2" align="center"><i class="material-icons" onclick="remove(${cookieArrArr[i][0]})">
delete_forever
</i></div></div>`);


      totalPrice += Number(food[0].price * cookieArrArr[i][1]);
      totalQty += Number(cookieArrArr[i][1]);
    })
  }

  console.log(cartArr);

  setTimeout(function() {

    let dozens = Math.floor(totalQty / 12);
    let discount = dozens * 5.99;

    if (dozens >= 1) {
      $cart.append(`<div class="totalcart"><i>Dozen Discount: -$${discount.toFixed(2)}</i></div>`);
    }

    let tax = ((Number(totalPrice - discount) * 0.13));

    $cart.append(`<div class="totalcart"><i>Tax: $${tax.toFixed(2)}</i></div>`)

    // console.log(totalPrice, discount, tax);

    $cart.append(`<div class = "totalcart finaltotal"><b>Total: $${(totalPrice - discount + tax).toFixed(2)}</b></div><form  id="submit-cart" method="GET" action="/checkout" align="center"><input class="btn btn-primary" type="submit" value="Place Order"></form>`)

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

  }, 100);


};

function remove(id) {
  console.log(id);
  document.cookie = `${id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  updateCart(document.cookie);
}
