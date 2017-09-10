'use strict';
const validator = require('../schemas/validator_data');
const controller = require('../schemas/controller_get_data_section');
const decodeJWT = require('../../../tools/decodeJWT');


module.exports = {
  method: 'GET',
  path: '/data/section',
  config: {
    description: 'List section',
    tags: ['section'],
    response: {
      schema: validator.responseList
    }
  },
  handler: (request, reply) => {
    decodeJWT.decode(request, false, null, controller, reply);
  }
};
