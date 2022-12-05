const { Pool } = require('pg');
const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}?ssl=true`;
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const pool = new Pool({
  // user: 'yohan',
  // host: 'localhost',
  // database: 'my_store',
  // password: 'admin123',
  // port: 5432,
  connectionString: URI,
});

module.exports = pool;
