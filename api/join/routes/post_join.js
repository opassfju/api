'use strict';
const validator = require('../schemas/validator_post_join');
const controller = require('../schemas/controller_post_join');

module.exports = {
  method: 'POST',
  path: '/join',
  config: {
    description: 'Sign up api',
    notes: 'join new fudaer and send certification mail',
    tags: ['join'],
    response: {
      schema: validator.response
    },
    validate: {
      payload: validator.payload
    },
    auth: false
  },
  handler: (request, reply) => {
    controller.action(request.payload,reply);
  }
};
