var express = require('express');
var router = express.Router();
const auth = require('../middle/auth');
const dogPoo = require('../middle/dogPoo');
const alarm = require('../middle/alarm');

// Create
router.post(
  '/',
  auth.setCurrentUser,
  alarm.searchFcmKey,
  dogPoo.createPooData,
  function (req, res, next) {
    res.status(201).json({ message: 'create poo success' });
  }
);

// Read
router.get(
  '/',
  auth.setCurrentUser,
  dogPoo.readPooData,
  function (req, res, next) {
    res.status(201).json({ message: 'read poo success' });
  }
);

module.exports = router;
