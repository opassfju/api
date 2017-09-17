'use strict';
const util = require('../../../tools/util');

const postKeys = [ 
  { name:'fudaer_id', type:'int'},
  { name:'class_name', type:'str'},
  { name:'study_time', type:'int'},
  { name:'class_teacher', type:'str'},
  { name:'class_open', type:'str'},
  { name:'section_id', type:'str'},
  { name:'if_history', type:'int'},
  { name:'lv_learned', type:'int'},
  { name:'lv_fun', type:'int'},
  { name:'lv_work', type:'int'},
  { name:'if_greport', type:'int'},
  { name:'if_preport', type:'int'},
  { name:'other_work', type:'str'},
  { name:'lv_test_mount', type:'int'},
  { name:'if_test_small', type:'int'},
  { name:'if_test_mid', type:'int'},
  { name:'if_test_end', type:'int'},
  { name:'if_test_openbook', type:'int'},
  { name:'other_test', type:'str'},
  { name:'lv_teacher_clear', type:'int'},
  { name:'lv_teacher_ask', type:'int'},
  { name:'lv_recommend', type:'int'},
  { name:'other_thing', type:'str'},
];

const GetSingle = (whereStr) => {
  return (`SELECT * FROM Comments ${whereStr}`
  );
};

const GetList = (whereStr,pageStr) => {
  return (`SELECT * FROM Comments ORDER BY create_date DESC ${whereStr} ${pageStr}`
  );
};

const Post = (payload) => {
  return (util.postSQLString('Comments', null,postKeys, payload));
};

module.exports = {
  GetSingle:GetSingle,
  GetList:GetList,
  Post:Post,
  postKeys:postKeys
};
