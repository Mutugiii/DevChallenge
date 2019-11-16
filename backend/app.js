// Definition of dependencies
const {
  Pool,
  Client,
} = require('pg');
const express = require('express');

const app = express();

// Database connections with both pool and string
const connectionString = 'postgressql://devc:devc123@localhost:5432/devc';

const pool = new Pool({
  connectionString,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

const client = new Client({
  connectionString,
});

client.connect();

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  client.end();
});

module.exports = app;
