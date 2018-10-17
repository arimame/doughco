
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("food_location_join").del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex("food_location_join").insert({food_id: 1, location_id: 1}),
        knex("food_location_join").insert({food_id: 3, location_id: 1}),
        knex("food_location_join").insert({food_id: 4, location_id: 1})
      ]);
    });
};
