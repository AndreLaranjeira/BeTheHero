// Package imports:
const request = require('supertest');

// Module imports:
const app = require('../../src/app');
const connection = require('../../database/connection');

// Test description:
describe('Incident', () => {

  // Configure test database.
  beforeEach(async () => {
    await connection.migrate.latest();
    await connection.seed.run();
  });

  afterEach(async() => {
    await connection.migrate.rollback();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  // Tests.
  it('should be possible to create an incident', async () => {
    const incident_title = 'Test incident';
    const incident_description = 'Test description';
    const incident_value = 49.99

    const valid_ngo = await connection('NGOS')
      .select(['ID', 'PASSKEY'])
      .orderBy('ID')
      .first();

    const response = await request(app)
      .post('/incidents')
      .set({
        authorization: valid_ngo['PASSKEY']
      }).send({
        title: incident_title,
        description: incident_description,
        value: incident_value
      })
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toBeNumber();

    const incident_created = await connection('INCIDENTS')
      .select(['TITLE', 'DESCRIPTION', 'VALUE', 'NGO_ID'])
      .where({id: response.body.id})
      .first();

    expect(incident_created).toContainKeys([
      'TITLE',
      'DESCRIPTION',
      'VALUE',
      'NGO_ID'
    ]);

    // Title.
    expect(incident_created['TITLE']).not.toBeNull();
    expect(incident_created['TITLE']).toBeString();
    expect(incident_created['TITLE']).toEqual(incident_title);

    // Description.
    expect(incident_created['DESCRIPTION']).not.toBeNull();
    expect(incident_created['DESCRIPTION']).toBeString();
    expect(incident_created['DESCRIPTION']).toEqual(incident_description);

    // Value.
    expect(incident_created['VALUE']).not.toBeNull();
    expect(incident_created['VALUE']).toBeNumber();
    expect(incident_created['VALUE']).toEqual(incident_value);

    // NGO's ID.
    expect(incident_created['NGO_ID']).not.toBeNull();
    expect(incident_created['NGO_ID']).toBeNumber();
    expect(incident_created['NGO_ID']).toEqual(valid_ngo['ID']);

  });

  it('should not be possible to create an incident with an invalid passkey',
    async () => {
      const incident_title = 'Test incident';
      const incident_description = 'Test description';
      const incident_value = 49.99
      const passkey_chosen_for_test = 'FFFFFFFF';

      await connection('NGOS').where('PASSKEY', passkey_chosen_for_test).del();

      const response = await request(app)
        .post('/incidents')
        .set({
          authorization: passkey_chosen_for_test
        }).send({
          title: incident_title,
          description: incident_description,
          value: incident_value
        })
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBeString();
      expect(response.body.message)
        .toEqual('Authorization does not match any credential in database!');
    }
  );

  it('should be possible to delete an incident', async () => {
    const valid_incident = await connection('INCIDENTS')
      .select(['ID', 'NGO_ID'])
      .orderBy('ID')
      .first();

    const corresponding_ngo = await connection('NGOS')
      .select('PASSKEY')
      .where({id: valid_incident['NGO_ID']})
      .first();

    const response = await request(app)
      .delete('/incidents/' + valid_incident['ID'])
      .set({
        authorization: corresponding_ngo['PASSKEY']
      })
      .expect(200);

    expect(response.body).toHaveProperty('success');
    expect(response.body.success).toBeString();
    expect(response.body.success).toEqual('Incident deleted successfully.');

    const query_results_for_deleted_incident = await connection('INCIDENTS')
      .select('*')
      .where({id: valid_incident['ID']});

    expect(query_results_for_deleted_incident).toBeArray();
    expect(query_results_for_deleted_incident).toBeEmpty();

  });

  it('should not be possible to delete an incident that does not exist',
    async () => {
      const id_chosen_for_test = 1;
      const a_passkey_for_the_header = 'FFFFFFFF'

      await connection('INCIDENTS').where('ID', id_chosen_for_test).del();

      const response = await request(app)
        .delete('/incidents/' + id_chosen_for_test)
        .set({
          authorization: a_passkey_for_the_header
        })
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBeString();
      expect(response.body.message).toEqual('Incident does not exist!');
    }
  );

  it('should not be possible to delete an incident with an invalid passkey',
    async () => {
      const passkey_chosen_for_test = 'FFFFFFFF';

      await connection('NGOS').where('PASSKEY', passkey_chosen_for_test).del();

      const valid_incident = await connection('INCIDENTS')
        .select('ID')
        .orderBy('ID')
        .first();

      const response = await request(app)
        .delete('/incidents/' + valid_incident['ID'])
        .set({
          authorization: passkey_chosen_for_test
        })
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBeString();
      expect(response.body.message).toEqual('Operation not permitted!');
    }
  );

  it('should not be possible to delete an incident with the wrong NGO passkey',
    async () => {
      const valid_incident = await connection('INCIDENTS')
        .select(['ID', 'NGO_ID'])
        .orderBy('ID')
        .first();

      const valid_NGO_unrelated_to_incident = await connection('NGOS')
        .select('PASSKEY')
        .whereNot({id: valid_incident['NGO_ID']})
        .first();

      const response = await request(app)
        .delete('/incidents/' + valid_incident['ID'])
        .set({
          authorization: valid_NGO_unrelated_to_incident['PASSKEY']
        })
        .expect(401);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBeString();
      expect(response.body.message).toEqual('Operation not permitted!');
    }
  );

  it('should be possible to index incidents', async () => {
    const response = await request(app)
      .get('/incidents')
      .expect(200);

    expect(response.body).toBeArray();

    response.body.forEach((incident) => {
      // Incident properties.
      expect(incident).toContainKeys([
        'TITLE',
        'DESCRIPTION',
        'VALUE',
        'NGO_ID',
        'NGO_NAME',
        'NGO_EMAIL',
        'NGO_WHATSAPP',
        'NGO_CITY',
        'NGO_STATE'
      ]);

      // Title.
      expect(incident['TITLE']).not.toBeNull();
      expect(incident['TITLE']).toBeString();

      // Description.
      expect(incident['DESCRIPTION']).not.toBeNull();
      expect(incident['DESCRIPTION']).toBeString();

      // Value.
      expect(incident['VALUE']).not.toBeNull();
      expect(incident['VALUE']).toBeNumber();

      // NGO's ID.
      expect(incident['NGO_ID']).not.toBeNull();
      expect(incident['NGO_ID']).toBeNumber();

      // Name.
      expect(incident['NGO_NAME']).not.toBeNull();
      expect(incident['NGO_NAME']).toBeString();

      // Email.
      expect(incident['NGO_EMAIL']).not.toBeNull();
      expect(incident['NGO_EMAIL']).toBeString();

      // Whatsapp.
      expect(incident['NGO_NAME']).toBeString();

      // City.
      expect(incident['NGO_NAME']).toBeString();

      // State.
      expect(incident['NGO_STATE']).not.toBeNull();
      expect(incident['NGO_STATE']).toBeString();
      expect(incident['NGO_STATE']).toHaveLength(2);

    });

  });

  it('should be possible to page the index of incidents', async () => {
    const page1_response = await request(app)
      .get('/incidents?page=1')
      .expect(200);

    const page2_response = await request(app)
      .get('/incidents?page=2')
      .expect(200);

    expect(page1_response.headers).toHaveProperty('x-total-count');
    expect(page1_response.headers['x-total-count']).toBeString();
    expect(Number(page1_response.headers['x-total-count'])).toBeNumber();

    expect(page2_response.headers).toHaveProperty('x-total-count');
    expect(page2_response.headers['x-total-count']).toBeString();
    expect(Number(page2_response.headers['x-total-count'])).toBeNumber();

    expect(page1_response.headers['x-total-count'])
      .toEqual(page2_response.headers['x-total-count']);

    expect(page1_response.body).toBeArray();
    expect(page2_response.body).toBeArray();

    expect(page1_response.body).not.toIncludeAnyMembers(page2_response.body);
    expect(page2_response.body).not.toIncludeAnyMembers(page1_response.body);

    expect(page1_response.body.length)
      .toBeGreaterThanOrEqual(page2_response.body.length);

  });

});
