const {
  Pool,
} = require('pg');

const connectionString = 'postgressql://devc:devc123@localhost:5432/devc';

const pool = new Pool({
  connectionString,
});

// process.env.DATABASE_URL,
// dotenv.config();

pool.on('connect', () => {
  console.log('Connected to the db');
});

const createUserTable = () => {
  const userTable = `
  CREATE TABLE IF NOT EXISTS
  users(
    name VARCHAR(30) PRIMARY KEY,
    email VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    role TEXT NOT NULL DEFAULT('Employee')
  )`;

  pool
    .query(userTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUserTable = () => {
  const userTable = 'DROP TABLE IF EXISTS users';
  pool
    .query(userTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// pool.on('remove', () => {
//   console.log('Client Removed');
//   process.exit(0);
// });

module.exports = {
  createUserTable,
  dropUserTable,
  pool,
};

require('make-runnable');
