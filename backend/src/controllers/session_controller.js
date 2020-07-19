// Module imports:
const connection = require('../../database/connection');

// Export module:
module.exports = {
  async create(request, response) {
    const {passkey} = request.body;

    // Locate NGO via passkey.
    const ngo = await connection('NGOS').select('NAME').where({
      passkey: passkey.toLowerCase()
    }).first();

    if(ngo == null)
      return response.status(400).json({
        statusCode: 400,
        error: 'Bad request',
        message: 'Authorization does not match any credential in database!'
      });

    else {
      const name = ngo['NAME'];
      return response.json({name});
    }

  }
}
