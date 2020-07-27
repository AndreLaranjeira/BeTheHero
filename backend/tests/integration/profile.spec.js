// Package imports:
const request = require("supertest");

// Module imports:
const app = require("../../src/app");
const connection = require("../../database/connection");

// Test description:
describe("Profile", () => {

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
  it("should be possible to see the incidents in a profile", async () => {
    const valid_ngo = await connection("NGOS")
      .select(["ID", "PASSKEY"])
      .orderBy("ID")
      .first();

    const response = await request(app)
      .get("/profile")
      .set({
        authorization: valid_ngo["PASSKEY"]
      })
      .expect(200);

    expect(response.body).toBeArray();

    response.body.forEach((incident) => {
      // Incident properties.
      expect(incident).toContainKeys([
        "TITLE",
        "DESCRIPTION",
        "VALUE",
        "NGO_ID"
      ]);

      // Title.
      expect(incident["TITLE"]).not.toBeNull();
      expect(incident["TITLE"]).toBeString();

      // Description.
      expect(incident["DESCRIPTION"]).not.toBeNull();
      expect(incident["DESCRIPTION"]).toBeString();

      // Value.
      expect(incident["VALUE"]).not.toBeNull();
      expect(incident["VALUE"]).toBeNumber();

      // NGO's ID.
      expect(incident["NGO_ID"]).not.toBeNull();
      expect(incident["NGO_ID"]).toBeNumber();
      expect(incident["NGO_ID"]).toEqual(valid_ngo["ID"]);

    });
  });

  it("should not be possible to see incidents with an invalid passkey",
    async () => {
      const passkey_chosen_for_test = "FFFFFFFF";

      await connection("NGOS").where("PASSKEY", passkey_chosen_for_test).del();

      const response = await request(app)
        .get("/profile")
        .set({
          authorization: passkey_chosen_for_test
        })
        .expect(400);

      expect(response.body).toHaveProperty("message");
      expect(response.body.message).toBeString();
      expect(response.body.message)
        .toEqual("Authorization does not match any credential in database!");

    }
  );

});
