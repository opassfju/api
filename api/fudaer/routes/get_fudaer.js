'use strict';
const validator = require('../schemas/validator_get_fudaer');
const controller = require('../schemas/controller_get_fudaer');
const decodeJWT = require('../../../tools/decodeJWT');

module.exports = {
  method: 'GET',
  path: '/fudaer',
  config: {
    description: 'fudaer\'s info',
    tags: ['auth','fudaer'],
    response: {
      schema: validator.response
    }
  },
  handler: (request, reply) => {
    decodeJWT.decode(request, false, null, controller, reply);
  }
};
