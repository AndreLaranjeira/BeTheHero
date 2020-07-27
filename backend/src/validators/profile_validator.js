// Package imports:
const {celebrate, Joi, Segments} = require("celebrate");

// Module imports:
const Patterns = require("../utils/validation_patterns");

// Export module:
module.exports = {
  index: celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().pattern(Patterns.authorizationPasskey).required()
    }).unknown()
  })
};
