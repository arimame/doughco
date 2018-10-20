
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.bigint('card_number');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('card_number');
  });
};
