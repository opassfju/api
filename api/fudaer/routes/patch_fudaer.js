'use strict';
const validator = require('../schemas/validator_patch_fudaer');
const controller = require('../schemas/controller_patch_fudaer');
const decodeJWT = require('../../../tools/decodeJWT');

module.exports = {
  method: 'PATCH',
  path: '/fudaer',
  config: {
    description: 'Update fudaer\'s information',
    tags: ['auth','fudaer'],
    response: {
      schema: validator.response
    },
    validate: {
      payload: validator.payload
    }
  },
  handler: (request, reply) => {
    decodeJWT.decode(request, false, null, controller, reply);
  }
};
