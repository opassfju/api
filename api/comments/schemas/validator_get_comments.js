'use strict';

const Joi = require('joi');

const parameterList = Joi.alternatives().try(
  Joi.object({
    page: Joi.number().integer().allow(null).notes('1'),
    class: Joi.string().allow(null).notes('人文科學概論'),
    teacher: Joi.string().allow(null).notes('蔡振興'),
  }),
  Joi.object({
    all: Joi.any(),
    class: Joi.string().allow(null).notes('人文科學概論'),
    teacher: Joi.string().allow(null).notes('蔡振興'),
  })
);


const responseList = Joi.alternatives().try(
  Joi.object({
    rows: Joi.array(),
    totalRowCount: Joi.number().integer(),
    paging:  {
      page: Joi.number().integer(),
      pages: Joi.number().integer(),
      pageSize: Joi.number().integer(),
      previous:  Joi.string().allow(null),
      next:  Joi.string().allow(null),
    }
  }).allow(null)
);
module.exports = {
  parameterList: parameterList,
  responseList: responseList
};
