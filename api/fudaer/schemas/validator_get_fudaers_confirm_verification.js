'use strict';

const Joi = require('joi');

const response = Joi.alternatives().try(
  Joi.any()
);

module.exports = {
  response: response
};
