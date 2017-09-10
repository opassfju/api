'use strict';
const validator = require('../schemas/validator_get_comments');
const controller = require('../schemas/controller_get_comments');

module.exports = {
  method: 'GET',
  path: '/comments',
  config: {
    description: 'List all comments',
    tags: ['comment'],
    response: {
      schema: validator.response
    },
    auth: false
  },
  handler: (request, reply) => {
    controller.action(reply);
  }
};
