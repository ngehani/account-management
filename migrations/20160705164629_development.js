exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('firstName');
    table.string('lastName');
    table.string('email').notNullable();
    table.boolean('isSuperuser').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
