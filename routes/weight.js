var express = require('express');
var router = express.Router();
const auth = require('../middle/auth');
const dogWeight = require('../middle/dogWeight');

// Create
router.post(
  '/',
  auth.setCurrentUser,
  dogWeight.updateWeightData,
  function (req, res, next) {
    res.status(201).json({ message: 'update weight success' });
  }
);

// Read
router.get('/', auth.setCurrentUser, function (req, res, next) {
  res.status(201).json({ message: 'read poo success' });
});

module.exports = router;
