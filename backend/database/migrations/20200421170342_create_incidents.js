// Migration to create the incidents table.
exports.up = function(knex) {
  return knex.schema.createTable("INCIDENTS", function(table) {
    table.increments("ID").primary();

    table.string("TITLE").notNullable();
    table.string("DESCRIPTION").notNullable();
    table.decimal("VALUE").notNullable();

    table.integer("NGO_ID").unsigned().notNullable();
    table.foreign("NGO_ID").references("ID").on("NGO");

    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("INCIDENTS");
};
