const { Pool, Client } = require('pg');

const connectionString = 'postgressql://devc:devc123@localhost:5432/devc';

const pool = new Pool({
  connectionString: connectionString
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

const client = new Client({
  connectionString: connectionString
});

client.connect();

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  client.end();
});
