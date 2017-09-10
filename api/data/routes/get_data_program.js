'use strict';
const validator = require('../schemas/validator_get_data_program');
const controller = require('../schemas/controller_get_data_program');

module.exports = {
  method: 'GET',
  path: '/data/program',
  config: {
    description: 'List program',
    tags: ['program'],
    response: {
      schema: validator.response
    },
    auth: false
  },
  handler: (request, reply) => {
    controller.action(reply);
  }
};
