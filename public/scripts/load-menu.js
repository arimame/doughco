$(() => {
  $.ajax({
    method: "GET",
    url: `/api/food/location/${location_id}`
  }).done((foods) => {
    let i;

    // displays donuts for location, as found in database, in rows of 2
    for (i = 0; i < foods.length - 1; i += 2) {
      const donut1 = addDonut(foods[i]);
      const donut2 = addDonut(foods[i+1]);
      $("#menu").append(`
        <div class="row">
          ${donut1}
          ${donut2}
        </div>
      `);
    }

    // adds an additional row of 1 donut if the location has an odd number
    if (i === foods.length - 1) {
      const donut3 = addDonut(foods[i]);
      $("#menu").append(`
        <div class="row">
          ${donut3}
        </div>
      `);
    }
  });;

  updateCart(document.cookie);

});

// addDonut takes in a donut object, as from the food table in database, and outputs an html article to display it
function addDonut(donut) {
  return `
    <article class="col-md-6">
      <div class="row">
        <div class="col-md-12 img-container" align="center">
          <img src=${donut.image_url}>
          <div class="description">${donut.description}</div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12" align="center">
           <p class="menu_title">${donut.name}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12" align="center">
          <p class="price">Price per donut: $${donut.price}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12" align="center">
          <div class="qty">
            <div class="minus bg-dark" onclick="minus('donut-qty-${donut.id}')">-</div>
              <input type="text" min="1" id="donut-qty-${donut.id}" class="count" name="qty" value="1">
            <div class="plus bg-dark" onclick="plus('donut-qty-${donut.id}')">+</div>
          </div>
        </div>
        <div class="col-md-12" align="center">
          <button class="toCart btn btn-primary" onclick="addToCart(${donut.id}, 'donut-qty-${donut.id}')" type="button"> Add to cart </button>
        </div>
      </div>
    </article>
  `;
}

// minus decreases the 'add to cart' value for a specific donut, id, on click of the '-' button
function minus(id) {
  const $val = $('#'+id);
  $val.val(parseInt($val.val()) - 1 );

  // ensures it never goes below 1
  if ($val.val() == 0) {
    $val.val(1);
  };
}

// plus increases the 'add to cart' value for a specific donut, id, on click of the '+' button
function plus(id) {
  const $val = $('#'+id);
  $val.val(parseInt($val.val()) + 1 );
}

// addToCart takes in a donut id and the id of its quantity input field and adds the donut name and quantity to the cart
function addToCart(id, qtyId) {

  let idStr = String(id)
  let qty = $('#'+qtyId).val();

  if (!(isNaN(parseFloat(qty))) && (parseFloat(qty)) > 0) {
    // breaks the cookie string into an array of arrays of length 2 of the form [id, value]
    let cookies = document.cookie.split("; ");
    let cookieArr = [];
    for (let cookie of cookies) {
      cookieArr.push(cookie.split("="));
    }

    for (let i = 0; i <= cookieArr.length; i++) {
      // if cookie has not been set, add cookie a cookie with qty
      if (i === cookieArr.length) {
        document.cookie = `${idStr}=${qty};path=/`;
        updateCart(document.cookie);
      // if cookie already exists, add qty to the current value of the cookie
      } else if (idStr === cookieArr[i][0]) {
        let newCookie = Number(cookieArr[i][1]) + Number(qty);
        document.cookie = `${idStr}=${newCookie};path=/`;
        updateCart(document.cookie);
        break;
      }
    }
  }
  // update the display of the quantity input field to be 1
  $('#'+qtyId).val(1);
}

// updateCart displays each donut which has a cookie in the cart
function updateCart(cookieStr) {
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
      <div class="col-lg-2" align="center"><p>qty</p></div>
      <div class="col-lg-5" align="center"><p>item</p></div>
      <div class="col-lg-3" align="center"><p>price</p></div>
      <div class="col-lg-2" align="center"><p></p></div>
    </div>
  `);

  if (cookieStr.length !== 0) {

    // display each donut which has a cookie in the cart, with its quantity and price
    for (let i = 0; i < cookieArr.length; i++) {
      $.ajax({
      method: "GET",
      url: `/api/food/${cookieArr[i][0]}`
      })
      .done((food) => {
        $cart.append(`
          <div class="row">
            <div class="col-lg-2" align="center">${cookieArr[i][1]}</div>
            <div class="col-lg-5" align="center">${food[0].name}</div>
            <div class="col-lg-3" align="center">$${(food[0].price * cookieArr[i][1]).toFixed(2)}</div>
            <div class="col-lg-2" align="center"><i class="material-icons" onclick="removeCookie(${cookieArr[i][0]})">delete_forever</i></div>
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
        $cart.append(`<div class = "totalcart"><i>Dozen Discount: -$${discount.toFixed(2)}</i></div>`);
      }

      // displays taxes, total price, and checkout button
      let tax = ((Number(totalPrice - discount) * 0.13));
      $cart.append(`<div class = "totalcart"><i>Tax: $${tax.toFixed(2)}</i></div>`);
      $cart.append(`<div class = "totalcart finaltotal"><b>Total: $${(totalPrice - discount + tax).toFixed(2)}</b></div><form align="center" method="GET" action="/checkout/${location_id}"><input class="btn btn-primary" type="submit" value="Checkout"></form>`);

    }, 150);
  }
};

// removeCookie removes the cookie with id
function removeCookie(id) {
  document.cookie = `${id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  updateCart(document.cookie);
}
