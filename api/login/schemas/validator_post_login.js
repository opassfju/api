'use strict';

const Joi = require('joi');

const loginPayload = Joi.alternatives().try(
  // FIXME: should allow underline
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
);

const loginResponse = Joi.object({
  token: Joi.string(),
});

module.exports = {
  payload: loginPayload,
  response: loginResponse
};
