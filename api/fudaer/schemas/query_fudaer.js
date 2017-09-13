'use strict';
const util = require('../../../tools/util');

const payloadKeys = [ 
  { name:'department_id', type:'str'},
  { name:'miner_id', type:'str'},
  { name:'section_id', type:'str'},
  { name:'sec_major_id', type:'str'},
  { name:'program_id', type:'str'}
];

const GetSingleString = () => {
  return (`
  SELECT
    F.email,
    N.name nickname,
    (
      SELECT D.name
      FROM Department D
      WHERE D.id = F.department_id
    ) department,
    (
      SELECT S.name
      FROM Section S
      WHERE S.id = F.section_id
    ) section,
    (
      SELECT SD.name
      FROM Department SD
      WHERE SD.id = F.sec_major_id
    ) sec_major,
    (
      SELECT SM.name
      FROM Department SM
      WHERE SM.id = F.miner_id
    ) miner,
    (
      SELECT P.name
      FROM  Program  P
      WHERE P.id = F.program_id
    ) program
  FROM 
    Fudaer F,
    Nickname N
  WHERE 
    N.id = F.nickname_id AND
    F.id = ?
  `);
};

const GetListString = () => {
  return ('');
};


const PatchString = (target,payload) => {

  let whereStr = util.getWhereStr(
    [ {key:'id',param:target, type:'int', match:'exact'}
    ],
    true);

  let pack = {
    table: 'Fudaer',
    editor: null,
    keyArr: payloadKeys,
    payload: payload,
    whereStr: whereStr
  };

  return (util.patchSQLString(pack));
};

module.exports = {
  payloadKeys: payloadKeys,
  GetSingleString:GetSingleString,
  GetListString: GetListString,
  PatchString: PatchString
};
