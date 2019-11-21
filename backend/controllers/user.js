const bcrypt = require('bcrypt');
const {
  pool,
} = require('../db/user');

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      role: req.body.role,
    };
    pool.connect((err, client) => {
      const query = 'INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *';
      const values = [data.name, data.email, data.password, data.role];

      client.query(query, values)
        .then((result) => {
          res.status(201).json({
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
  }).catch((error) => {
    res.status(500).json({
      error,
    });
  });
};

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
          bcrypt.compare(password, hash).then((valid) => {
            if (!valid) {
              res.status(401).json({
                error: new Error('Invalid password Entered'),
              });
            }
          }).catch((error) => {
            res.status(500).json({
              error,
            });
          });
          res.status(201).json({
            message: 'Successful login',
            result: result.rows[0],
          });
        }
      },
    );
  });
};
