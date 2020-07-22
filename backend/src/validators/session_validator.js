// Package imports:
const {celebrate, Joi, Segments} = require("celebrate");

// Module imports:
const Patterns = require("../utils/validation_patterns");

// Export module:
module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      passkey: Joi.string().pattern(Patterns.authorizationPasskey).required()
    })
  })
};
