'use strict';

const Joi = require('joi');

const response = Joi.alternatives().try(
  Joi.object()
);

module.exports = {
  response: response
};
