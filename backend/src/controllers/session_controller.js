// Module imports:
const connection = require('../../database/connection');

// Export module:
module.exports = {
  async create(request, response) {
    const {passkey} = request.body;

    // Locate NGO via passkey.
    const ngo = await connection('NGOS').select('NAME').where({
      passkey: passkey
    }).first();

    if(ngo == null)
      return response.status(400).json(
        {error: 'Authorization does not match any credential in database!'}
      );

    else {
      const name = ngo['NAME'];
      return response.json({name});
    }

  }
}
