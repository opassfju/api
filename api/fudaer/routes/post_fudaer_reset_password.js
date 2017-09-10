
'use strict';
const validator = require('../schemas/validator_post_fudaer_reset_password');
const controller = require('../schemas/controller_post_fudaer_reset_password');
const decodeJWT = require('../../../tools/decodeJWT');

module.exports = {
  method: 'POST',
  path: '/fudaer/reset_password',
  config: {
    description: 'reset fudaer\'s password',
    notes: 'It will return successed or failed message',
    tags: ['auth','fudaer'],
    response: {
      schema: validator.response
    },
    validate: {
      payload: validator.payload
    },
    auth: false
  },
  handler: (request, reply) => {
    decodeJWT.resetPassword(request, controller, reply);
  }
};
