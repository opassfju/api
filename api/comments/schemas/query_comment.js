'use strict';
//const util = require('../../../../../tools/util');


const GetListRepString = (whereStr,pageStr) => {
  return (`
    SELECT SQL_CALC_FOUND_ROWS
      R.id,
      R.name,
      (	CONCAT("[",
        GROUP_CONCAT(
          JSON_OBJECT(
            "term",RT.term_index,
            "change_type",RT.change_type,
            "district",( 
              JSON_OBJECT(
                "name",TD.district_name,
                "abbreviation",TD.abbreviation,
                "zone_name",TD.zone_name,
                "index",TD.index)
            ),
            "party",( 
              JSON_OBJECT(
                "id",P.id,
                "name",P.name,
                "abbreviation",P.abbreviation,
                "emblem",P.emblem,
                "color",P.color)
            )
        )
        SEPARATOR ","),
        "]")
      )AS "history"
        
    FROM Rep R 
    LEFT JOIN Rep_Term RT ON 
    R.id = RT.rep_id
    LEFT JOIN 
    Term_District TD ON 
        (TD.term_index = RT.term_index AND TD.district_name = RT.district_name )
    LEFT JOIN 
      Rep_Party RP ON 
          (RP.rep_id = R.id AND RP.term_index = RT.term_index )
    LEFT JOIN 
      Party P ON 
          (P.id = RP.party_id )
    ` + whereStr + `
    GROUP BY R.id
    ORDER BY R.id `  + pageStr
  );
};

module.exports = {
  GetListRepString:GetListRepString
};
