const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    // user: 'yohan',
    // host: 'localhost',
    // database: 'my_store',
    // password: 'admin123',
    // port: 5432,
    connectionString: 'postgres://yohan:admin123@localhost:5432/my_store',
  });

  await client.connect();
  return client;
}

module.exports = getConnection;
