// Migration to make a NGO's passkey unique.
exports.up = function(knex) {
  return knex.schema.alterTable("NGOS", function(table) {
    table.unique("PASSKEY");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("NGOS", function(table) {
    table.dropUnique("PASSKEY");
  });
};
