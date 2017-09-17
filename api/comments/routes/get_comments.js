'use strict';
const validator = require('../schemas/validator_get_comments');
const controller = require('../schemas/controller_get_comments');
const decodeJWT = require('../../../tools/decodeJWT');

module.exports = {
  method: 'GET',
  path: '/comments',
  config: {
    description: 'List all comments',
    tags: ['comment'],
    response: {
      schema: validator.responseList
    }
  },
  handler: (request, reply) => {
    decodeJWT.decode(request, false, null, controller, reply);
  }
};
