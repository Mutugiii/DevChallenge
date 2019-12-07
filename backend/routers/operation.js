// Routing file for the database manipulations
const express = require('express');

const router = express.Router();


const auth = require('../middleware/auth');
// const otherAuth = require('../middleware/otherAuth');
// const multer = require('../middleware/multer-config');

const articleCtrl = require('../controllers/operation');
const otherCtrl = require('../controllers/otherOps');


router.get('/viewAll', articleCtrl.viewAll);
router.get('/:id', articleCtrl.viewOne);
router.post('/createArticles', articleCtrl.createArticles);
router.put('/:id', articleCtrl.modifyArticle);
router.delete('/:id', articleCtrl.deleteArticle);
router.post('/', otherCtrl.createGif);
router.delete('/:id', otherCtrl.deleteGif);
router.post('/', otherCtrl.commentArticle);
router.post('/', otherCtrl.commentGif);

module.exports = router;