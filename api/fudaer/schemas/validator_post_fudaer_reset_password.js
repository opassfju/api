'use strict';

const Joi = require('joi');

const payload = Joi.alternatives().try(
  Joi.object({
    new_password: Joi.string().required()
  })
);

const response = Joi.alternatives().try(
  Joi.object()
);

module.exports = {
  payload: payload,
  response: response
};
