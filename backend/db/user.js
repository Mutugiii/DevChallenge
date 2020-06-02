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
    employeeId VARCHAR(30) PRIMARY KEY,
    firstName VARCHAR(30) NOT NULL,
    LastName VARCHAR(30) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL,
    gender TEXT NOT NULL DEFAULT('Male'),
    jobRole TEXT NOT NULL DEFAULT('Employee'),
    department TEXT NOT NULL DEFAULT('General'),
    address VARCHAR(30) NOT NULL
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
