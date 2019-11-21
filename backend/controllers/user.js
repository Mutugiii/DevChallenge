/* eslint-disable no-shadow */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../db/user');

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      };
      pool.connect((err, client) => {
        const query = 'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *';
        const values = [data.name, data.email, data.password];

        client.query(query, values).then((result) => {
          res
            .status(201)
            .json({
              message: 'User successfuly created',
              result: result.rows[0],
            })
            .catch((error) => {
              res.status(500).json({
                error,
              });
            });
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        error,
      });
    });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  pool.connect((err, client, done) => {
    client.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
      (error, result) => {
        done();
        if (result.rows < '1') {
          res.status(500).json({
            message: 'User not found',
          });
        } else {
          const userRole = result.rows[0].role;
          if (userRole !== 'Admin') {
            res.status(400).json({
              message: 'Forbidden Request',
            });
          } else {
            const hash = result.rows[0].password;
            const userId = result.rows[0].id;
            const userEmail = result.rows[0].email;
            bcrypt
              .compare(password, hash)
              .then((valid) => {
                if (!valid) {
                  res.status(401).json({
                    error: new Error('Invalid password Entered'),
                  });
                }
                const data = {
                  userEmail,
                  userId,
                };
                const token = jwt.sign(
                  {
                    data,
                  },
                  'RANDOM_TOKEN_SECRET',
                  {
                    expiresIn: '24h',
                  },
                );
                res.status(200).json({
                  userId: data,
                  token,
                  message: 'Successful Authentication',
                });
              })
              .catch((error) => {
                res.status(500).json({
                  error,
                });
              });
          }
        }
      },
    );
  });
};
