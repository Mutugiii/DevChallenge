/* eslint-disable no-shadow */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  pool,
} = require('../db/user');

exports.login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;

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
              const userData = {
                userId,
              };
              const token = jwt.sign({
                userData,
              },
              'RANDOM_TOKEN_SECRET', {
                expiresIn: '24h',
              });
              res.status(200).json({
                status: 'Success',
                data: {
                  token,
                  userId: userData,
                },
              });
            })
            .catch((error) => {
              res.status(500).json({
                error,
              });
            });
        }
      },
    );
  });
};
