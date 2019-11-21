// Definition of dependencies
const {
  Pool,
} = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routers/user');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use('/api/v1', userRoutes);

module.exports = app;
