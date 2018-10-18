exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable("food", function(table) {
      table.increments("id");
      table.string("name");
      table.string("description");
      table.float("price");
      table.string("image_url");
    }),

    knex.schema.createTable("location", function(table) {
      table.increments("id");
      table.string("address");
      table.string("phone_number");
    }),

    knex.schema.createTable("food_location_join", function(table) {
      table.integer("food_id");
      table.integer("location_id");
      table.foreign("food_id").references("id").inTable("food");
      table.foreign("location_id").references("id").inTable("location");
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("food"),
    knex.schema.dropTable("location"),
    knex.schema.dropTable("food_location_join")
  ]);
};
