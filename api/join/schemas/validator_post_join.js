'use strict';

const Joi = require('joi');

const payload = Joi.alternatives().try(
  // FIXME: should allow underline
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
);

const response = Joi.alternatives().try(
  Joi.object({
    message: Joi.string().required()
  })
);

module.exports = {
  payload: payload,
  response: response
};
