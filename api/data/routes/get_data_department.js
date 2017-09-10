'use strict';
const validator = require('../schemas/validator_data');
const controller = require('../schemas/controller_get_data_department');
const decodeJWT = require('../../../tools/decodeJWT');

module.exports = {
  method: 'GET',
  path: '/data/department',
  config: {
    description: 'List department',
    tags: ['department'],
    validate: {
      query: validator.parametersName
    },
    response: {
      schema: validator.responseList
    }
  },
  handler: (request, reply) => {
    decodeJWT.decode(request, false, null, controller, reply);
  }
};
