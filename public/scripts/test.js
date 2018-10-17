$(() => {
  $.ajax({
    method: "GET",
    url: "/api/food"
  }).done((foods) => {
    for(food of foods) {
      $("<div>").text(food.name).appendTo($("body"));
    }
  });;
});
