// Migration to create the NGOs table.
exports.up = function(knex) {
  return knex.schema.createTable('NGOS', function(table) {
    table.increments('ID').primary();

    table.string('PASSKEY').notNullable();
    table.string('NAME').notNullable();
    table.string('EMAIL').notNullable();
    table.string('WHATSAPP');
    table.string('CITY')
    table.string('STATE', 2).notNullable();

    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('NGOS');
};
