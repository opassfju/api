'use strict';
const validator = require('../schemas/validator_get_comment');
const controller = require('../schemas/controller_get_comment');
const decodeJWT = require('../../../tools/decodeJWT');

module.exports = {
  method: 'GET',
  path: '/comments/{id}',
  config: {
    description: 'List a comment',
    tags: ['comment'],
    validate: {
      params: {
        id: validator.param
      }
    },
    response: {
      schema: validator.responseSingle
    }
  },
  handler: (request, reply) => {
    decodeJWT.decode(request, false, null, controller, reply);
  }
};
