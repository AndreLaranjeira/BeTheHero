// Module imports:
const connection = require('../../database/connection');

// Export module:
module.exports = {
  async create(request, response) {
    const {title, description, value} = request.body;
    const ngo_passkey = request.headers.authorization;

    // Find the corresponding NGO ID.
    const [ngo] = await connection('NGOS').select('ID').where({passkey: ngo_passkey});

    if(ngo != null) {
      const [id] = await connection('INCIDENTS').insert({
        TITLE: title,
        DESCRIPTION: description,
        VALUE: value,
        NGO_ID: ngo['ID'],
        CREATED_AT: new Date(),
        UPDATED_AT: new Date()
      });
      return response.json({id});
    }

    else
      return response.status(400).json(
        {error: 'Authorization does not match any credential in database!'}
      );
  },

  async delete(request, response) {
    const incident_id = request.params['id'];
    const ngo_passkey = request.headers.authorization;

    // Find the corresponding NGO id.
    const [ngo] = await connection('NGOS').select('ID').where({passkey: ngo_passkey});

    // Find the incident for deletion:
    const incident = await connection('INCIDENTS').select('NGO_ID').where(
      {id: incident_id}
    ).first();
    console.log(incident);

    // Check the authorization:
    if(ngo == null || incident['NGO_ID'] != ngo['ID'])
      return response.status(401).json(
        {error: 'Operation not permitted!'}
      );
    else {
      await connection('INCIDENTS').where({id: incident_id}).delete();
      return response.json(
        {success: 'Incident deleted successfully.'}
      );
    }

  },

  async index(request, response) {
    const {page = 1} = request.query;
    const page_length = 5;

    // Total incident count.
    const [incident_count] = await connection('INCIDENTS').count();
    response.header('X-Total-Count', incident_count['count(*)']);

    // Incident data.
    const incidents = await connection('INCIDENTS')
      .join('NGOS', {'INCIDENTS.NGO_ID': 'NGOS.ID'})
      .limit(page_length)
      .offset((page - 1) * page_length)
      .select([
        'INCIDENTS.*',
        'NGOS.NAME',
        'NGOS.EMAIL',
        'NGOS.WHATSAPP',
        'NGOS.CITY',
        'NGOS.STATE'
      ]);

    return response.json(incidents);
  }
}
