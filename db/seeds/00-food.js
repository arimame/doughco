
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("food").del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex("food").insert({id: 1, name: "Sprinkle", description: "Yum", price: 2.99, image_url: "n/a"})
      ]);
    });
};
