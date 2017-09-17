'use strict';
const validator = require('../schemas/validator_get_comment');
const controller = require('../schemas/controller_post_comment');
const decodeJWT = require('../../../tools/decodeJWT');

module.exports = {
  method: 'POST',
  path: '/comments',
  config: {
    description: 'post a comment',
    tags: ['comment'],
    validate: {
      payload: validator.payload
    },
    response: {
      schema: validator.responseSingle
    }
  },
  handler: (request, reply) => {
    decodeJWT.decode(request, false, null, controller, reply);
  }
};
