
const mysql = require('mysql2/promise');
const config = require('config');

const USERNAME = config.get('db.username');
const HOST = config.get('db.host');
const PASSWORD = config.get('db.passwd');
const DATABASE = config.get('db.database');
const PORT = config.get('db.port');
const CONNECTION_LIMIT = config.get('db.connection-limit');

const pool = mysql.createPool({
  connectionLimit: CONNECTION_LIMIT,
  host: HOST,
  user: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  port: PORT
});

module.exports = {
  pool,
  createDbConnection: () => {},
};