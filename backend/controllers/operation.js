const {
  Pool,
} = require('pg');
const {
  pool,
} = require('../db/articles');

// View all articles
exports.viewAll = (req, res, next) => {
  pool.connect((err, client) => {
    const query = 'SELECT title, articleContent, TIMESTAMP FROM articles ORDER BY TIMESTAMP';

    client.query(query).then((result) => {
      res
        .status(200)
        .json({
          message: 'Articles Loaded',
          result: result.rows,
        })
        .catch((error) => {
          res.status(400).json({
            error,
            message: 'Article failed to load',
          });
        });
    }).catch((error) => {
      res.status(400).json({
        error,
        message: 'Request failed',
      });
    });
  });
};

// View only one article
exports.viewOne = (req, res, next) => {
  pool.connect((err, client) => {
    const query = 'SELECT title,article FROM articles WHERE id = $1';

    client.query(query, [req.params.id])
      .then((result) => {
        res.status(200)
          .json({
            message: 'Article Loaded',
            result: result.rows,
          })
          .catch((error) => {
            res.status(400).json({
              error,
            });
          }).catch((error) => {
            res.status(400).json({
              error,
            });
          });
      });
  });
};

// Create article
exports.createArticles = (req, res, next) => {
  const data = {
    title: req.body.title,
    articleContent: req.body.article,
  };

  pool.connect((err, client) => {
    const query = 'INSERT INTO articles(title, articleContent) VALUES($1, $2) RETURNING *';
    const values = [data.title, data.articleContent];

    pool.query(query, values).then((result) => {
      res.status(201)
        .json({
          message: 'Article successfuly created',
          result: result.rows,
        })
        .catch((error) => {
          res.status(400).json({
            error,
          });
        });
    }).catch((error) => {
      res.status(400).json({
        error,
      });
    });
  });
};

exports.modifyArticle = (req, res, next) => {
  const data = {
    id: req.params.id,
    title: req.body.title,
    articleContent: req.body.article,
  };

  pool.connect((err, client) => {
    const query = 'UPDATE articles SET title=$1, articleContent=$2 WHERE id=$3';
    const values = [data.title, data.articleContent, data.id];

    client.query(query, values).then((result) => {
      res.status(201)
        .json({
          message: 'Article successfuly updated',
          result: result.rows,
        })
        .catch((error) => {
          res.status(400).json({
            error,
          });
        });
    }).catch((error) => {
      res.status(400).json({
        error,
      });
    });
  });
};

exports.deleteArticle = (req, res, next) => {
  const data = {
    id: req.params.id,
    title: req.body.title,
    articleContent: req.body.article,
  };

  pool.connect((err, client) => {
    const query = 'DELETE FROM articles WHERE id=$1';
    const values = [data.id];

    client.query(query, values).then((result) => {
      res.status(200)
        .json({
          message: 'Article successfuly deleted',
          result: result.rows,
        })
        .catch((error) => {
          res.status(400).json({
            error,
          });
        });
    }).catch((error) => {
      res.status(400).json({
        error,
      });
    });
  });
};