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
      D.name department,
      N.name nickname,
      S.name section,
      SD.name sec_major,
      SM.name miner,
      P.name program 
    FROM 
      Fudaer  F,
      Nickname N,
      Department D,
      Department SD,
      Department SM,
      Section S,
      Program  P

    WHERE 
      N.id = F.nickname_id AND
      D.id = F.department_id AND
      SD.id = F.sec_major_id AND
      SM.id = F.miner_id AND
      S.id = F.section_id AND
      P.id = F.program_id AND
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
