// Seeding for the NGOS table.
exports.seed = function(knex) {
  return knex('NGOS').truncate().then(() => {
    return knex('NGOS').insert([
      {
        ID: 1,
        PASSKEY: '00000001',
        NAME: 'Aperture Science, inc.',
        EMAIL: 'CaveJohnson@aperture.com',
        WHATSAPP: '00345123481',
        CITY: null,
        STATE: 'MI',
        CREATED_AT: new Date(),
        UPDATED_AT: new Date()
      },
      {
        ID: 2,
        PASSKEY: '00000002',
        NAME: 'Code 4 change',
        EMAIL: 'contact@C4C.com',
        WHATSAPP: '99234852983',
        CITY: 'Atlanta',
        STATE: 'GE',
        CREATED_AT: new Date(),
        UPDATED_AT: new Date()
      },
      {
        ID: 3,
        PASSKEY: 'FFFFFFFF',
        NAME: 'Doofenschmirtz evil, inc.',
        EMAIL: 'norm@doofenschmitz_evil_inc.com',
        WHATSAPP: null,
        CITY: 'Danville',
        STATE: 'DE',
        CREATED_AT: new Date(),
        UPDATED_AT: new Date()
      }
    ]);
  });
};
