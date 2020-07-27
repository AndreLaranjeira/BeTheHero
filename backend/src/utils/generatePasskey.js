// Package imports:
const crypto = require("crypto");

// Export module:
module.exports = function generatePasskey() {
  return crypto.randomBytes(4).toString("HEX");
};
