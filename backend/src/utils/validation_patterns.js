// Export module:
module.exports = {
  authorizationPasskey: new RegExp("^[a-fA-F0-9]{8}$"),
  phoneNumber: new RegExp("^[0-9]{8,31}$")
};
