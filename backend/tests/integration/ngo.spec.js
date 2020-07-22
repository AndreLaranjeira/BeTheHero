// Package imports:
const request = require("supertest");

// Module imports:
const app = require("../../src/app");
const connection = require("../../database/connection");
const Patterns = require("../../src/utils/validation_patterns");

// Test description:
describe("NGO", () => {

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
  it("should be possible to create a NGO", async () => {
    const response = await request(app)
      .post("/ngos")
      .send({
        name: "Test NGO",
        email: "test@test.com",
        whatsapp: "3204999234",
        city: "Atlanta",
        state: "GE"
      })
      .expect(200);

    expect(response.body).toHaveProperty("passkey");
    expect(response.body.passkey).toMatch(Patterns.authorizationPasskey);
  });

  it("should be possible to index NGOs", async () => {
    const response = await request(app).get("/ngos").expect(200);

    expect(response.body).toBeArray();

    response.body.forEach((ngo) => {
      // NGO properties.
      expect(ngo).toContainKeys([
        "NAME",
        "EMAIL",
        "WHATSAPP",
        "CITY",
        "STATE"
      ]);

      // Name.
      expect(ngo["NAME"]).not.toBeNull();
      expect(ngo["NAME"]).toBeString();

      // Email.
      expect(ngo["EMAIL"]).not.toBeNull();
      expect(ngo["EMAIL"]).toBeString();

      // Whatsapp.
      expect(ngo["NAME"]).toBeString();

      // City.
      expect(ngo["NAME"]).toBeString();

      // State.
      expect(ngo["STATE"]).not.toBeNull();
      expect(ngo["STATE"]).toBeString();
      expect(ngo["STATE"]).toHaveLength(2);
    });

  });
});
