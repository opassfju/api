'use strict';

const Joi = require('joi');

const param = Joi.alternatives().try(
   Joi.number().integer().notes('1')
);


const parameters = Joi.alternatives().try(
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

const responseSingle = Joi.alternatives().try(
  Joi.object().allow(null)
);

const payload = Joi.alternatives().try(
  Joi.object({
    class_name: Joi.string().required().notes('人文科學概論'),
    study_time: Joi.number().integer().required().notes('1031'),
    class_teacher: Joi.string().required().notes('人文科學概論'),
    class_open: Joi.string().required().notes('全人'),
    section_id: Joi.string().required().notes('C'),
    if_history: Joi.valid(0,1).required().notes('0,1'),
    lv_learned: Joi.valid(1,2,3,4,5).required().notes('1,2,3,4,5'),
    lv_fun: Joi.valid(1,2,3,4,5).required().notes('1,2,3,4,5'),
    lv_work: Joi.valid(1,2,3,4,5).required().notes('1,2,3,4,5'),
    if_greport: Joi.valid(0,1).required().notes('0,1'),
    if_preport: Joi.valid(0,1).required().notes('0,1'),
    other_work: Joi.string().allow(null).notes('xxxxxxxx'),
    lv_test_mount: Joi.valid(1,2,3,4,5).required().notes('1,2,3,4,5'),
    if_test_small: Joi.valid(0,1).required().notes('0,1'),
    if_test_mid: Joi.valid(0,1).required().notes('0,1'),
    if_test_end: Joi.valid(0,1).required().notes('0,1'),
    if_test_openbook: Joi.valid(0,1).required().notes('0,1'),
    other_test: Joi.string().allow(null).notes('xxxxxxxx'),
    lv_teacher_clear: Joi.valid(1,2,3,4,5).required().notes('1,2,3,4,5'),
    lv_teacher_ask: Joi.valid(1,2,3,4,5).required().notes('1,2,3,4,5'),
    lv_recommend: Joi.valid(1,2,3,4,5).required().notes('1,2,3,4,5'),
    other_thing: Joi.string().allow(null).notes('xxxxxxxx')
  })

);

module.exports = {
  param:param,
  parameters: parameters,
  responseSingle: responseSingle,
  responseList: responseList,
  payload: payload
};
