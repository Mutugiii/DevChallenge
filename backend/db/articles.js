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

const createArticleTable = () => {
  const articleTable = `
  CREATE TABLE IF NOT EXISTS
  articles(
    title VARCHAR(30) PRIMARY KEY,
    articleContent VARCHAR(30) NOT NULL,
    context TEXT NOT NULL DEFAULT('General')
  )`;

  pool
    .query(articleTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropArticleTable = () => {
  const articleTable = 'DROP TABLE IF EXISTS articles';
  pool
    .query(articleTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

module.exports = {
  createArticleTable,
  dropArticleTable,
  pool,
};

require('make-runnable');
