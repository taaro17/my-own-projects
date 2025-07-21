exports.up = function(knex) {
  return knex.schema
    .createTable('accounts', function (table) {
      table.increments('id');
      table.string('name', 30).notNullable();
      table.string('account', 9).notNullable();
      table.integer('amount').defaultTo(0);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .then(function () {
      return knex.schema.createTable('transactions', function (table) {
        table.increments('id');
        table.integer("amount_to_send").notNullable();
        table.string('to_send_account').notNullable();
        table.string('from_send_account').notNullable();
      });
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('transactions')
    .then(function () {
      return knex.schema.dropTableIfExists('accounts');
    });
};

