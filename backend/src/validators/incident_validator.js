// Package imports:
const {celebrate, Joi, Segments} = require("celebrate");

// Module imports:
const Patterns = require("../utils/validation_patterns");

// Export module:
module.exports = {
  create: celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().min(0.01).required()
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().pattern(Patterns.authorizationPasskey).required()
    }).unknown()
  }),

  delete: celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),

  index: celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  })
};
