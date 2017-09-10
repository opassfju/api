'use strict';
const config = require('config');
const mysql = require('mysql');

const initiate = () => {
  let connection = mysql.createConnection({
    host     : config.db.host,
    user     : config.db.user,
    password : config.db.password,
    database : config.db.database,
    port     : 5506
  });

  connection.connect();
  return connection;
};

const terminate = (connection) => {
  connection.end();
};

module.exports = {
  initiate: initiate,
  terminate: terminate
};
