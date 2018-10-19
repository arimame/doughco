$(() => {
  console.log(foo);
  $.ajax({
    method: "GET",
    url: `/api/food/${foo}`
  }).done((foods) => {
    let i;
    for (i = 0; i < foods.length - 1; i += 2) {
      //$(".container").append(`<div>${foods[i].name}</div>`);
      $(".container").append(`
        <div class="row">
          <article class="col-md-6">

            <div class="row">
              <div class="col-md-12">
                <img src=${foods[i].image_url}>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                 <p class="menu_title">${foods[i].name}</p>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <p class="price">Price per donut: $${foods[i].price}</p>
              </div>
            </div>

            <div class="row">
              <form>
                <div class="col-lg-4">
                  <div class="qty mt-5">
                    <span class="minus bg-dark" onclick="minus('donut-qty-${foods[i].id}')">-</span>
                      <input type="text" id="donut-qty-${foods[i].id}" class="count" name="qty" value="1">
                    <span class="plus bg-dark" onclick="plus('donut-qty-${foods[i].id}')">+</span>
                  </div>
                </div>
                <div class="col-lg-4">
                  <button class="toCart" onclick="add(${foods[i].id}, 'donut-qty-${foods[i].id}')" type="button"> Add to cart </button>
                </div>
              </form>
            </div>

          </article>


          <article class="col-md-6">

            <div class="row">
              <div class="col-md-12">
                <img src=${foods[i+1].image_url}>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                 <p class="menu_title">${foods[i+1].name}</p>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <p class="price">Price per donut: $${foods[i+1].price}</p>
              </div>
            </div>

            <div class="row">
              <form>
                <div class="col-lg-4">
                  <div class="qty mt-5">
                    <span class="minus bg-dark" onclick="minus('donut-qty-${foods[i+1].id}')">-</span>
                      <input type="text" id="donut-qty-${foods[i+1].id}" class="count" name="qty" value="1">
                    <span class="plus bg-dark" onclick="plus('donut-qty-${foods[i+1].id}')">+</span>
                  </div>
                </div>
                <div class="col-lg-4">
                  <button class="toCart" onclick="add(${foods[i+1].id}, 'donut-qty-${foods[i+1].id}')" type="button"> Add to cart </button>
                </div>
              </form>
            </div>

          </article>
        </div>
      `);
    }
    console.log(i);
    if (i === foods.length - 1) {
      $(".container").append(`
        <div class="row">
          <article class="col-md-6">

            <div class="row">
              <div class="col-md-12">
                <img src=${foods[i].image_url}>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                 <p class="menu_title">${foods[i].name}</p>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <p class="price">Price per donut: $${foods[i].price}</p>
              </div>
            </div>

            <div class="row">
              <form>
                <div class="col-lg-4">
                  <div class="qty mt-5">
                    <span class="minus bg-dark" onclick="minus('donut-qty-${foods[i].id}')">-</span>
                    <input type="text" id="donut-qty-${foods[i].id}" class="count" name="qty" value="1">
                    <span class="plus bg-dark" onclick="plus('donut-qty-${foods[i].id}')">+</span>
                  </div>
                </div>
                <div class="col-lg-4">
                  <button class="toCart" onclick="add(${foods[i].id}, 'donut-qty-${foods[i].id}')" type="button"> Add to cart </button>
                </div>
              </form>
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

  // console.log(idStr, qty);

  let cookies = document.cookie;
  console.log(cookies);
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
      document.cookie = `${idStr}=${qty}`
      updateCart(document.cookie)
    } else if (idStr === cookieArrArr[i][0]) {
      let newCookie = Number(cookieArrArr[i][1]) + Number(qty);
      console.log(newCookie);
      document.cookie = `${idStr}=${newCookie}`
      updateCart(document.cookie)
      break;
    }
  }

}

function updateCart(cookies) {
  let cookieArr = cookies.split("; ");

  let cookieArrArr = [];
  for (let cookie of cookieArr) {
    cookieArrArr.push(cookie.split("="))
  }

  const $cart = $("#cart");

  $cart.empty();
  let totalPrice = 0;
  let totalQty = 0;

  for (let i = 0; i < cookieArrArr.length; i++) {
    $.ajax({
    method: "GET",
    url: `/api/food/food/${cookieArrArr[i][0]}`
    })
     .done((food) => {
      console.log(food);
      $cart.append(`
       <div>${cookieArrArr[i][1]} : ${food[0].name} -- $${(food[0].price * cookieArrArr[i][1]).toFixed(2)} <button onclick="remove(${cookieArrArr[i][0]})">Remove</button></div>`);
      totalPrice += Number(food[0].price * cookieArrArr[i][1]);
      totalQty += Number(cookieArrArr[i][1]);
    })
  }

  setTimeout(function() {

    let dozens = Math.floor(totalQty / 12);
    let discount = dozens * 5.99;

    if (dozens >= 1) {
      $cart.append(`<div>Dozen Discount: -- $${discount.toFixed(2)}</div>`);
    }

    let tax = ((Number(totalPrice - discount) * 0.13));

    $cart.append(`<div>Tax -- $${tax.toFixed(2)}</div>`)

    console.log(totalPrice, discount, tax);

    $cart.append(`<div>TOTAL -- $${(totalPrice - discount + tax).toFixed(2)}</div>`)

  }, 100);

};

function remove(id) {
  document.cookie = `${id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  updateCart(document.cookie);
}
