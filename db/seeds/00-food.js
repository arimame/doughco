
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("food_location_join").del()
    .then(function () {
      return knex("food").del()
        .then(function () {
          return Promise.all([
            // Inserts seed entries
            knex("food").insert({id: 1, name: "Sprinkle", description: "Yum", price: 2.99, image_url: "https://cdn.shopify.com/s/files/1/1595/6347/products/SprinkleDonut_Web_Store_1200x.jpg?v=1487014202"}),
            knex("food").insert({id: 2, name: "Chocolate", description: "Super yum", price: 2.99, image_url: "https://hips.hearstapps.com/wdy.h-cdn.co/assets/cm/15/09/54ef9111b81cb_-_chocolate-glazed-yeast-doughnuts-recipe-wdy1012-de.jpg"}),
            knex("food").insert({id: 3, name: "Sour Creme Glazed", description: "The very most amount of yum", price: 3.99, image_url: "https://images.heb.com/is/image/HEBGrocery/001818184-1?id=WLnSR3&fmt=jpg&fit=constrain,1&wid=296&hei=296"}),
            knex("food").insert({id: 4, name: "Double chocolate", description: "Pretty yum", price: 2.99, image_url: "https://hips.hearstapps.com/wdy.h-cdn.co/assets/cm/15/09/54ef9111b81cb_-_chocolate-glazed-yeast-doughnuts-recipe-wdy1012-de.jpg"})
          ]);
        });
    });
};
