var express = require('express');
var router = express.Router();
const auth = require('../middle/auth');
const dogIntake = require('../middle/dogIntake');
const alarm = require('../middle/alarm');

// Create
router.post(
  '/',
  auth.setCurrentUser,
  dogIntake.createIntakeData,
  dogIntake.calcIntake,
  alarm.searchFcmKey,
  alarm.updateAlarmOption,
  function (req, res, next) {
    res.status(201).json({ message: 'create intake success' });
  }
);

// Read
router.get(
  '/',
  auth.setCurrentUser,
  dogIntake.readIntakeData,
  function (req, res, next) {
    res.status(201).json({ message: 'read intake success' });
  }
);

module.exports = router;
