
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.string('email');
    table.string('password');
    table.string('phone');
    table.integer('card_number');
    table.integer('card_security');
    table.integer('card_expire');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.dropColumn('email');
    table.dropColumn('password');
    table.dropColumn('phone');
    table.dropColumn('card_number');
    table.dropColumn('card_security');
    table.dropColumn('card_expire');
  });
};
