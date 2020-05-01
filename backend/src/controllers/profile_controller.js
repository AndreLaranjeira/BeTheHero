// Module imports:
const connection = require('../../database/connection');

// Export module:
module.exports = {
  async index(request, response) {
    const ngo_passkey = request.headers.authorization;

    // Find the corresponding NGO ID.
    const [ngo] = await connection('NGOS').select('ID').where({passkey: ngo_passkey});

    if(ngo != null) {
      const incidents = await connection('INCIDENTS').where(
        {NGO_ID: ngo['ID']}
      ).select('*');
      return response.json(incidents);
    }

    else
      return response.status(400).json(
        {error: 'Authorization does not match any credential in database!'}
      );

  }
}
