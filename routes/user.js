var express = require('express');
var router = express.Router();
const userInfo = require('../middle/userInfo');
const auth = require('../middle/auth');

// Create
router.post('/', userInfo.createUserInfo);

// Read
router.get('/', auth.setCurrentUser, userInfo.readUserInfo);

router.post('/update', auth.setCurrentUser, userInfo.updateUserInfo);

module.exports = router;
