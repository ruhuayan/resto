const mysql = require('mysql2');
const config = require('./config');

const db = mysql.createConnection({
  host: 'localhost',
  user: config.db_user,
  password: config.db_password,
  database: config.db_name
});

module.exports = db;
