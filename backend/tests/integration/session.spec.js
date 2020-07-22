// Package imports:
const request = require("supertest");

// Module imports:
const app = require("../../src/app");
const connection = require("../../database/connection");

// Test description:
describe("Session", () => {

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
  it("should be possible to create a session with a valid passkey",
    async () => {
      const valid_ngo = await connection("NGOS")
        .select(["NAME", "PASSKEY"])
        .orderBy("ID")
        .first();

      const response = await request(app)
        .post("/sessions")
        .send({
          passkey: valid_ngo["PASSKEY"]
        })
        .expect(200);

      expect(response.body).toHaveProperty("name");
      expect(response.body.name).toBeString();
      expect(response.body.name).toEqual(valid_ngo["NAME"]);
    }
  );

  it("should not be possible to create a session with an invalid passkey",
    async () => {
      const passkey_chosen_for_test = "FFFFFFFF";

      await connection("NGOS").where("PASSKEY", passkey_chosen_for_test).del();

      const response = await request(app)
        .post("/sessions")
        .send({
          passkey: passkey_chosen_for_test
        })
        .expect(400);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBeString();
      expect(response.body.message)
        .toEqual("Authorization does not match any credential in database!");
    }
  );

});
