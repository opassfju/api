'use strict';
const validator = require('../schemas/validator_get_data_section');
const controller = require('../schemas/controller_get_data_section');

module.exports = {
  method: 'GET',
  path: '/data/section',
  config: {
    description: 'List section',
    tags: ['section'],
    response: {
      schema: validator.response
    },
    auth: false
  },
  handler: (request, reply) => {
    controller.action(reply);
  }
};
