'use strict';

const Joi = require('joi');

const payload = Joi.alternatives().try(
  Joi.object({
    department: Joi.string(),
    miner: Joi.string(),
    section: Joi.string(),
    sec_major: Joi.string(),
    program: Joi.string()
  })
);

const response = Joi.alternatives().try(
  Joi.object()
);

module.exports = {
  payload: payload,
  response: response
};
