'use strict';

const Joi = require('joi');

const response = Joi.alternatives().try(
  Joi.object({
    statusCode: Joi.number().integer().required(),
    rows: Joi.array(),
    totalRowCount: Joi.number().integer()
  })
);

module.exports = {
  response: response
};
