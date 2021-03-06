
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("food_location_join").del()
    .then(function () {
      return knex("food").del()
        .then(function () {
          return Promise.all([
            // Inserts seed entries
            knex("food").insert({id: 1, name: "Birthday Surprise", description: "Enjoy the surprise of a birthday cake in a donut", price: 3.99, image_url: "https://i.imgur.com/00VcNJM.jpg"}),
            knex("food").insert({id: 2, name: "Butterscotch Swirl", description: "Smooth butterscotch with hints of caramel", price: 2.99, image_url: "https://i.imgur.com/pfB7O4E.jpg"}),
            knex("food").insert({id: 3, name: "Christmas Snow", description: "A taste of the holidays, with gingerbread and vanilla", price: 3.99, image_url: "https://i.imgur.com/ni7k1vc.jpg"}),
            knex("food").insert({id: 4, name: "Classic Chocolate", description: "Classic chocolate dip", price: 2.99, image_url: "https://i.imgur.com/HOyTrwZ.jpg"}),
            knex("food").insert({id: 5, name: "Hawaiian Wave", description: "Vanillia with a hibiscus glaze", price: 2.99, image_url: "https://i.imgur.com/nnS9pB1.jpg"}),
            knex("food").insert({id: 6, name: "Postachio Delight", description: "Postachio cream with a rose madeira cake", price: 2.99, image_url: "https://i.imgur.com/8yEiqaD.jpg"}),
            knex("food").insert({id: 7, name: "Raspberry Cream", description: "Candied raspberry with white chocolate drizzle", price: 3.99, image_url: "https://i.imgur.com/rbVA03i.jpg"}),
            knex("food").insert({id: 8, name: "Triple Chocolate", description: "Dark, milk, and white chocolate in a decadent donut", price: 2.99, image_url: "https://i.imgur.com/ATDdSgV.jpg"}),
            knex("food").insert({id: 9, name: "Tropical Sunset", description: "Mango and banana cream with a pineapple cake", price: 3.99, image_url: "https://i.imgur.com/PDKNSFb.jpg"}),
            knex("food").insert({id: 10, name: "Watermelon Kiss", description: "It's always summer with this watermelon treat", price: 2.99, image_url: "https://i.imgur.com/Q8ixxAs.jpg"})
          ]);
        });
    });
};
