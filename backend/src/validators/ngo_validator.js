// Package imports:
const {celebrate, Joi, Segments} = require('celebrate');

// Module imports:
const Patterns = require('../utils/validation_patterns');

// Export module:
module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.string().pattern(Patterns.phoneNumber),
      city: Joi.string(),
      state: Joi.string().length(2)
    })
  })
}
