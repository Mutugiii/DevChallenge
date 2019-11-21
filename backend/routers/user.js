const express = require('express');

const router = express.Router();

const userCtrl = require('../controllers/user');
const adminCtrl = require('../controllers/admin');

router.post('/login', userCtrl.login);
router.post('/signup', adminCtrl.signup);
router.post('/adminlogin', adminCtrl.adminLogin);

module.exports = router;
