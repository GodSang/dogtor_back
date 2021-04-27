var express = require('express');
var router = express.Router();
const auth = require('../middle/auth');

/* GET home page. */

router.post(
  '/test',
  auth.getUserEmail,
  auth.checkPermission,
  function (req, res, next) {
    console.log(req.currentUser);
    res.json({ message: 'success' });
  }
);

module.exports = router;
