$(() => {
  $.ajax({
    method: "GET",
    url: "/api/food"
  }).done((foods) => {
    for (let i = 0; i < foods.length; i += 2) {
      //$(".container").append(`<div>${foods[i].name}</div>`);
      $(".container").append(`
        <div class="row">
          <article class="col-md">
            <p>${foods[i].name}</p>
            <img src=${foods[i].image_url} style="height:300px;width:300px;">
            <p>${foods[i].description}</p>
            <p>${foods[i].price}</p>
          </article>
          <article class="col-md">
            <p>${foods[i+1].name}</p>
            <img src=${foods[i+1].image_url} style="height:300px;width:300px;">
            <p>${foods[i+1].description}</p>
            <p>${foods[i+1].price}</p>
          </article>
        </div>
      `);
    }
    // for(food of foods) {
    //   $("<div>").text(food.name).appendTo($("body"));
    // }
  });;
});
