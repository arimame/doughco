
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("location").del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex("location").insert({id: 1, address: "King and Spadina Store", phone_number: 12047208938, lat:'43.644618', long: '-79.394891'}),
        knex("location").insert({id: 2, address: "Bloor and Yonge Store", phone_number: 12047208938, lat:'43.670718', long:'-79.386446'})
      ]);
    });
};
