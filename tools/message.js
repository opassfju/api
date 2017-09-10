'use strict';

/*  Message List 
500 system_internal_error
500 system_db_bad_query
500 system_db_operation_failed
554 system_email_delivery_failed

401 system_invalid_token
400 system_db_dup_entry
403 system_forbidden
404 system_not_found

400 core_citizen_email_in_used
400 core_citizen_email_not_verified
400 core_citizen_login_failed 草民代號、Email或密碼錯誤


*/
const boom = require('boom');
const config = require('config');
const ErrorBadImplementation = (msg, reply) => {reply(boom.badImplementation(msg));};
const ErrorCustomBadRequest= (msg, reply) => {reply(boom.badRequest(msg));};
const ErrorForbidden = (reply) => {reply(boom.forbidden('system_forbidden'));};
const ErrorSendEmailFailed = (email, reply) => {
  let errormsg = {
    statusCode : 554,
    message: 'system_email_delivery_failed',
    email: email
  };
  reply(errormsg).code(554);
};
const ErrorObjectNotFound = (reply) => {reply(boom.notFound('system_not_found'));};
const ErrorPasswordWrong = (reply) => {reply(boom.badRequest('密碼錯誤'));};
const ErrorInvalidToken = (reply) => {
  let errormsg = {
    statusCode : 401,
    message: 'system_invalid_token',
  };
  reply(errormsg).code(401);
};

const ErrorCitizenEmailNotVerified = (id,reply) => {
  let errormsg = {
    statusCode : 401,
    message: 'core_citizen_email_not_verified',
    link: `${config.commons.serverURL}/fudaers/${id}/request_verification`
  };
  reply(errormsg).code(401);
};



/*   =============== Message =============== */

const MsgOK = (reply) => {
  let msg = {
    message: 'OK'
  };
  reply(msg).code(200);
};

const MsgNoContent = (reply) => {
  reply().code(204);
};

const MsgObject = (Obj, reply) => {

  if ( Object.keys(Obj).length === 0) {
    reply().code(204);
  }
  else {
    reply(Obj).code(200);
  }
};


const MsgListArray =  (arrObj, pageObj ,reply) => {
  /*
    arrObj = {
      arr : [],
      totalRowCount : 0
    }
    pageObj = {
      paging : 2,
      pages : 3,
      previous : 1,
      next :3
    }
  */
  let msg = '';
  
  if (pageObj == null){
    msg = {
      rows: arrObj.arr,
      totalRowCount: arrObj.totalRowCount
    };
  }
  else {
    msg = {
      rows: arrObj.arr,
      totalRowCount: arrObj.totalRowCount,
      paging: {
        page: pageObj.paging,
        pages: pageObj.pages,
        pageSize: config.db.pageLimit,
        previous: pageObj.previous,
        next: pageObj.next,
      }
    };
  }
  reply(msg).code(200);
};

const MsgEmailVerifyTokenExpired = (requestURL, reply) => {
  let errormsg = `<p style="font-family:sans-serif;">認證失敗，點選<a href="${requestURL}" style="text-decoration:none;">連結</a>重發認證信</p>`;
  reply(errormsg).code(200);
};

const MsgCitizenEmailConfirmed = (reply) => {
  let msg = `
    <p style="font-family:sans-serif;">
      Email認證成功，點選<a href="http://127.0.0.1:8000" style="color:blue;text-decoration:none;">連結</a>登入OPASS-FJU。
    </p>`;
  reply(msg).code(200);
};

const MsgCitizenEmailAdded =  (emailID, reply) => {
  let msg = {
    message: '信箱新增成功',
    emailID: emailID
  };
  reply(msg).code(200);
};

const MsgCitizenEmailSetPrimary =  (reply) => {
  let msg = {
    message: '主要信箱更新成功',
  };
  reply(msg).code(200);
};

const MsgCitizenEamilVisibillty =  (res, reply) => {
  let msg = {
    visibility: res,
  };
  reply(msg).code(200);
};

const MsgGetCitizen = (citizen, reply) =>{
  let msg = {
    data:citizen
  };
  reply(msg).code(200);
};

const MsgLogin = (token,role, reply) => {
  let msg = {
    token: token,
    roles: role
  };
  reply(msg).code(200);
};

const MsgChangePassword = (reply) => {
  let msg = {
    message: '密碼更新成功',
  };
  reply(msg).code(200);
};

const MsgEveryOne = (arr, reply) => {
  let msg = {
    data: arr
  };
  reply(msg).code(200);
};


module.exports = {
  ErrorBadImplementation:ErrorBadImplementation,
  ErrorCustomBadRequest:ErrorCustomBadRequest,
  ErrorPasswordWrong:ErrorPasswordWrong,
  ErrorForbidden:ErrorForbidden,
  ErrorSendEmailFailed:ErrorSendEmailFailed,
  ErrorCitizenEmailNotVerified:ErrorCitizenEmailNotVerified,
  ErrorInvalidToken:ErrorInvalidToken,
  ErrorObjectNotFound:ErrorObjectNotFound,

  MsgNoContent:MsgNoContent,
  MsgOK:MsgOK,
  MsgObject:MsgObject,
  MsgListArray:MsgListArray,
  MsgEmailVerifyTokenExpired:MsgEmailVerifyTokenExpired,
  MsgGetCitizen:MsgGetCitizen,
  MsgCitizenEmailAdded:MsgCitizenEmailAdded,
  MsgCitizenEmailSetPrimary:MsgCitizenEmailSetPrimary,
  MsgCitizenEamilVisibillty:MsgCitizenEamilVisibillty,
  MsgCitizenEmailConfirmed:MsgCitizenEmailConfirmed,
  MsgLogin:MsgLogin,
  MsgChangePassword:MsgChangePassword,
  MsgEveryOne:MsgEveryOne
};
