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
            <div class="col-md-6">
              <p class="price">Per donut: $${foods[i].price}</p>
            </div>
            <div class="col-md-6">
              <p class="price">Per dozen: $${(foods[i].price  * 10).toFixed(2)}</p>
          </div>

          <div class="row">
           <form method="POST" action="locations/${foo}/food/${foods[i].id}">

              <div class="col-lg-4">
                <div class="qty mt-5">
                <span class="minus bg-dark">-</span>
                  <input type="number" class="count" name="qty" value="1">
                <span class="plus bg-dark">+</span>
               </div>
              </div>
              <div class="col-lg-4">
               <input type="submit" value="Add to cart">
              </div>
                 <div class="col-lg-4">
               <select name="size">
                  <option>Individual</option>
                  <option>Dozen</option>
                </select>
              </div>
            </form>
          </div>








          </article>


          <article class="col-md-6">
            <p class="menu_title">${foods[i+1].name}</p>
            <img src=${foods[i+1].image_url}>
            <p class="price">Per donut: $${foods[i].price}</p>
            <p class="price">Per dozen: $${(foods[i].price  * 10).toFixed(2)}</p>
          </article>
        </div>
      `);
    }
    console.log(i);
    if (i === foods.length - 1) {
      $(".container").append(`
        <div class="row">
          <article class="col-md">
            <p class="menu_title">${foods[i].name}</p>
            <img src=${foods[i].image_url}>
            <p class="price">Per donut: $${foods[i].price}</p>
            <p class="price">Per dozen: $${(foods[i].price  * 10).toFixed(2)}</p>
          </article>
        </div>
      `);
    }
    // for(food of foods) {
    //   $("<div>").text(food.name).appendTo($("body"));
    // }
  });;
});
