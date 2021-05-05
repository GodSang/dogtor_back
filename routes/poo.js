var express = require('express');
var router = express.Router();
const auth = require('../middle/auth');
const dogPoo = require('../middle/dogPoo');
const dogWeight = require('../middle/dogWeight');
const alarm = require('../middle/alarm');

// Create
router.post(
  '/',
  auth.setCurrentUser,
  auth.checkPermission,
  alarm.searchFcmKey,
  dogPoo.createPooData,
  dogWeight.updateWeightData,
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
