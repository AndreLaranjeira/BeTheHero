// Seeding for the INCIDENTS table.
exports.seed = function(knex) {
  return knex('INCIDENTS').truncate().then(() => {
    return knex('INCIDENTS').insert([
      {
        ID: 1,
        TITLE: 'Repulsion gel trials',
        DESCRIPTION: 'Help us advance the cause of science.',
        VALUE: 50,
        NGO_ID: 1,
        CREATED_AT: new Date(),
        UPDATED_AT: new Date()
      },
      {
        ID: 2,
        TITLE: 'Conversion gel trials',
        DESCRIPTION: 'Help us advance the cause of science.',
        VALUE: 20,
        NGO_ID: 1,
        CREATED_AT: new Date(),
        UPDATED_AT: new Date()
      },
      {
        ID: 3,
        TITLE: 'Inator internship',
        DESCRIPTION: 'Help me come up with inator ideas to take over the Tri-state area!',
        VALUE: 7.50,
        NGO_ID: 3,
        CREATED_AT: new Date(),
        UPDATED_AT: new Date()
      }
    ]);
  });
};
