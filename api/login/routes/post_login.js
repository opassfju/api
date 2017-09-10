'use strict';
const validator = require('../schemas/validator_post_login');
const controller = require('../schemas/controller_post_login');

module.exports = {
  method: 'POST',
  path: '/login',
  config: {
    description: 'Login',
    notes: 'User should post email and password to login',
    tags: ['login'],
    response: {
      schema: validator.loginResponse
    },
    validate: {
      payload: validator.loginPayload
    },
    auth: false
  },
  handler: (request, reply) => {
    let actionPayload = {
      request:request,
      reply:reply
    };

    controller.action(actionPayload);
  }
};
