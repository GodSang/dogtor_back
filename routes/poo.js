var express = require('express');
var router = express.Router();
const auth = require('../middle/auth');
const dogPoo = require('../middle/dogPoo');

// Create
router.post(
  '/',
  auth.setCurrentUser,
  auth.checkPermission,
  dogPoo.createPooData,
  function (req, res, next) {
    res.status(201).json({ message: 'create poo success' });
  }
);

// Read
router.get(
  '/',
  auth.setCurrentUser,
  auth.checkPermission,
  dogPoo.readPooData,
  function (req, res, next) {
    res.status(201).json({ message: 'read poo success' });
  }
);

module.exports = router;
