var express = require('express');
var router = express.Router();
const auth = require('../middle/auth');
const dogIntake = require('../middle/dogIntake');

// Create
router.post(
  '/',
  auth.setCurrentUser,
  auth.checkPermission,
  dogIntake.createIntakeData,
  function (req, res, next) {
    res.status(201).json({ message: 'create intake success' });
  }
);

// Read
router.get(
  '/',
  auth.setCurrentUser,
  auth.checkPermission,
  dogIntake.readIntakeData,
  function (req, res, next) {
    res.status(201).json({ message: 'read intake success' });
  }
);

module.exports = router;
