var express = require('express');
var router = express.Router();
const auth = require('../middle/auth');
const dogPee = require('../middle/dogPee');

// Create
router.post(
  '/',
  auth.setCurrentUser,
  dogPee.createPeeData,
  function (req, res, next) {
    res.status(201).json({ message: 'insert pee success' });
  }
);

// Read
router.get(
  '/',
  auth.setCurrentUser,
  dogPee.readPeeData,
  function (req, res, next) {
    res.status(201).json({ message: 'read pee success' });
  }
);

module.exports = router;
