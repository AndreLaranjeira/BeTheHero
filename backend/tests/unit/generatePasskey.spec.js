// Module imports:
const generatePasskey = require("../../src/utils/generatePasskey");
const Patterns = require("../../src/utils/validation_patterns");

// Test description:
describe("Generate passkey", () => {
  // Variable declaration.
  const passkey = generatePasskey();

  // Tests.
  it("should generate a string as a passkey", () => {
    expect(passkey).toBeString();
  });

  it("should generate a passkey with length 8", () => {
    expect(passkey).toHaveLength(8);
  });

  it("should generate a hexadecimal passkey", () => {
    expect(passkey).toMatch(/[a-fA-F0-9]*/);
  });

  it("should match the validation pattern for an authorization passkey", () => {
    expect(passkey).toMatch(Patterns.authorizationPasskey);
  });

});
