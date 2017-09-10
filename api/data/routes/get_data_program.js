'use strict';
const validator = require('../schemas/validator_data');
const controller = require('../schemas/controller_get_data_program');
const decodeJWT = require('../../../tools/decodeJWT');

module.exports = {
  method: 'GET',
  path: '/data/program',
  config: {
    description: 'List program',
    tags: ['program'],
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
