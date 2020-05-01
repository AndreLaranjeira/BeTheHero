// Package imports:
const crypto = require('crypto');

// Module imports:
const connection = require('../../database/connection');

// Export module:
module.exports = {
  async create(request, response) {

    // Parse request body:
    const {name, email, whatsapp, city, state} = request.body;

    // Read all the existing passkeys in the database:
    const existing_passkeys = await connection('NGOS').select('PASSKEY');

    // Generate NGO an UNIQUE passkey:
    let passkey = crypto.randomBytes(4).toString('HEX');

    while (existing_passkeys.includes(passkey))
      passkey = crypto.randomBytes(4).toString('HEX');

    // Insert data into table:
    await connection('NGOS').insert({
      PASSKEY: passkey,
      NAME: name,
      EMAIL: email,
      WHATSAPP: whatsapp,
      CITY: city,
      STATE: state,
      CREATED_AT: new Date(),
      UPDATED_AT: new Date()
    });

    return response.json({passkey});

  },

  async index(request, response) {
    const ngos = await connection('NGOS').select('*');
    return response.json(ngos);
  }
}
