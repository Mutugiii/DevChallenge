/* eslint-disable no-shadow */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  pool,
} = require('../db/user');

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const data = {
        employeeId: req.body.employeeId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        gender: req.body.gender,
        jobRole: req.body.jobRole,
        department: req.body.department,
        address: req.body.address,
      };
      pool.connect((err, client) => {
        const query = 'INSERT INTO users(employeeId, firstName, lastName, email, password, gender, jobRole, department, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
        const values = [data.employeeId, data.firstName, data.lastName,
          data.email, data.password, data.gender, data.jobRole, data.department, data.address,
        ];

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

exports.adminLogin = (req, res, next) => {
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
                const token = jwt.sign({
                  data,
                },
                'RANDOM_TOKEN_SECRET', {
                  expiresIn: '24h',
                });
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
