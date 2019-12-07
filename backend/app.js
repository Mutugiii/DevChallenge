// Definition of dependencies
const {
  Pool,
} = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routers/user');
const contentRoutes = require('./routers/operation');

const connectionString = 'postgressql://devc:devc123@localhost:5432/devc';

const pool = new Pool({
  connectionString,
});
pool.on('connect', () => {
  console.log('Connected to the db');
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/content', contentRoutes);

module.exports = app;
