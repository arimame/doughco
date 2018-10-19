function updateCart(cookies, userEmail, locationId) {

  const output = [];

  let userPhone;
  let locationPhone;

  // console.log(userEmail);

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
    console.log(locationPhone);
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

  for (let i = 0; i < cookieArrArr.length; i++) {
    $.ajax({
    method: "GET",
    url: `/api/food/food/${cookieArrArr[i][0]}`
    })
     .done((food) => {
      // console.log(food);
      output.push([food[0].name, cookieArrArr[i][1]]);
      $cart.append(`
       <div>${cookieArrArr[i][1]} : ${food[0].name} -- $${(food[0].price * cookieArrArr[i][1]).toFixed(2)} <button onclick="remove(${cookieArrArr[i][0]})">Remove</button></div>`);
      totalPrice += Number(food[0].price * cookieArrArr[i][1]);
      totalQty += Number(cookieArrArr[i][1]);
    })
  }

  return output;

};
