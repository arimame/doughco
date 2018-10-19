function updateCart(cookies) {

  let cartArr = [];
  const output = [];

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

  console.log(cookieArrArr)

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
      cartArr.push(food);
      output.push([food[0].name, cookieArrArr[i][1]]);
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

    $cart.append(`<div>TOTAL -- $${(totalPrice - discount + tax).toFixed(2)}</div><form id="submit-cart" method="GET" action="/checkout"><input type="submit" value="Checkout"></form>`)

    $('#submit-cart').submit(function(e) {
      e.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/checkout/process',
        data: {
          cart: JSON.stringify(cartArr)
        }
      })
    });

  }, 100);

  return output;

};

function remove(id) {
  document.cookie = `${id}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  updateCart(document.cookie);
}
