$(() => {
  // console.log(foo);
  $.ajax({
    method: "GET",
    url: `/api/food/${foo}`
  }).done((foods) => {
    let i;
    for (i = 0; i < foods.length - 1; i += 2) {
      //$(".container").append(`<div>${foods[i].name}</div>`);
      $("#menu").append(`
        <div class="row">
          <article class="col-md-6">
            <div class="row">
              <div class="col-md-12 img-container" align="center">
                <img src=${foods[i].image_url}>
                <div class="description">${foods[i].description}</div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12" align="center">
                 <p class="menu_title">${foods[i].name}</p>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12" align="center">
                <p class="price">Price per donut: $${foods[i].price}</p>
              </div>
            </div>

            <div class="row">
                <div class="col-md-12" align="center">
                  <div class="qty">
                    <div class="minus bg-dark" onclick="minus('donut-qty-${foods[i].id}')">-</div>
                      <input type="text" min="1" id="donut-qty-${foods[i].id}" class="count" name="qty" value="1">
                    <div class="plus bg-dark" onclick="plus('donut-qty-${foods[i].id}')">+</div>
                  </div>
                </div>
                <div class="col-md-12" align="center">
                  <button class="toCart btn btn-primary" onclick="add(${foods[i].id}, 'donut-qty-${foods[i].id}')" type="button"> Add to cart </button>
                </div>
            </div>
          </article>


          <article class="col-md-6">

            <div class="row">
              <div class="col-md-12 img-container" align="center">
                <img src=${foods[i+1].image_url}>
                <div class="description">${foods[i+1].description}</div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12" align="center">
                 <p class="menu_title">${foods[i+1].name}</p>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12" align="center">
                <p class="price">Price per donut: $${foods[i+1].price}</p>
              </div>
            </div>

             <div class="row">
                <div class="col-md-12" align="center">
                  <div class="qty">
                    <div class="minus bg-dark" onclick="minus('donut-qty-${foods[i+1].id}')">-</div>
                      <input type="text" min="1" id="donut-qty-${foods[i+1].id}" class="count" name="qty" value="1">
                    <div class="plus bg-dark" onclick="plus('donut-qty-${foods[i+1].id}')">+</div>
                  </div>
                </div>
                <div class="col-md-12" align="center">
                  <button class="toCart btn btn-primary" onclick="add(${foods[i+1].id}, 'donut-qty-${foods[i+1].id}')" type="button"> Add to cart </button>
                </div>
            </div>

          </article>
        </div>
      `);
    }
    // console.log(i);
    if (i === foods.length - 1) {
      $("#menu").append(`
        <div class="row">
          <article class="col-md-6">

            <div class="row">
              <div class="col-md-12 img-container" align="center">
                <img src=${foods[i].image_url}>
                <div class="description">${foods[i].description}</div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12" align="center">
                 <p class="menu_title">${foods[i].name}</p>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12" align="center">
                <p class="price">Price per donut: $${foods[i].price}</p>
              </div>
            </div>

              <div class="row">
                <div class="col-md-12" align="center">
                  <div class="qty">
                    <div class="minus bg-dark" onclick="minus('donut-qty-${foods[i].id}')">-</div>
                      <input type="text" min="1" id="donut-qty-${foods[i].id}" class="count" name="qty" value="1">
                    <div class="plus bg-dark" onclick="plus('donut-qty-${foods[i].id}')">+</div>
                  </div>
                </div>
                <div class="col-md-12" align="center">
                  <button class="toCart btn btn-primary" onclick="add(${foods[i].id}, 'donut-qty-${foods[i].id}')" type="button"> Add to cart </button>
                </div>
            </div>
          </article>
        </div>
      `);
    }
    // for(food of foods) {
    //   $("<div>").text(food.name).appendTo($("body"));
    // }
  });;

  updateCart(document.cookie);

});

function minus(id) {
  const $val = $('#'+id);
  $val.val(parseInt($val.val()) - 1 )
  if ($val.val() == 0) {
    $val.val(1);
  };
}

function plus(id) {
  const $val = $('#'+id);
  $val.val(parseInt($val.val()) + 1 )
}

function add(id, qtyId) {

  let idStr = String(id)
  let qty = $('#'+qtyId).val();


  if (!(isNaN(parseFloat(qty))) && (parseFloat(qty)) > 0) {

  // console.log(idStr, qty);

  let cookies = document.cookie;
  // console.log(cookies);
  let cookieArr = cookies.split("; ");
  // console.log(cookieArr);
  let cookieArrArr = [];
  for (let cookie of cookieArr) {
    cookieArrArr.push(cookie.split("="))
  }
  // console.log(cookieArrArr.length);

  for (let i = 0; i <= cookieArrArr.length; i++) {
    // console.log(idStr === cookieArrArr[i][0]);
    // console.log(cookieArrArr[i][0]);
    if (i === cookieArrArr.length) {
      document.cookie = `${idStr}=${qty};path=/`
      updateCart(document.cookie)
    } else if (idStr === cookieArrArr[i][0]) {
      let newCookie = Number(cookieArrArr[i][1]) + Number(qty);
      // console.log(newCookie);
      document.cookie = `${idStr}=${newCookie};path=/`
      updateCart(document.cookie)
      break;
    }
  }

}

$('#'+qtyId).val(1);

}

function updateCart(cookies) {
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
    url: `/api/food/food/${cookieArrArr[i][0]}`
    })
     .done((food) => {
      // console.log(food);
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

  setTimeout(function() {

    let dozens = Math.floor(totalQty / 12);
    let discount = dozens * 5.99;

    if (dozens >= 1) {
      $cart.append(`<div class = "totalcart"><i>Dozen Discount: -$${discount.toFixed(2)}</i></div>`);
    }

    let tax = ((Number(totalPrice - discount) * 0.13));

    $cart.append(`<div class = "totalcart"><i>Tax: $${tax.toFixed(2)}</i></div>`)

    // console.log(totalPrice, discount, tax);

    $cart.append(`<div class = "totalcart finaltotal"><b>Total: $${(totalPrice - discount + tax).toFixed(2)}</b></div><form align="center" method="GET" action="/checkout/${location_id}"><input class="btn btn-primary" type="submit" value="Checkout"></form>`)

  }, 150);

};

function remove(id) {
  console.log(id);
  document.cookie = `${id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  updateCart(document.cookie);
}
