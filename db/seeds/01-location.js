
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("location").del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex("location").insert({id: 1, address: "1 Name St", phone_number: "111-111-1111"})
      ]);
    });
};
