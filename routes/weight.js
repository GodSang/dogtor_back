var express = require('express');
var router = express.Router();
const auth = require('../middle/auth');
const dogWeight = require('../middle/dogWeight');
const dogFat = require('../middle/fatCalc');

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

// 체지방량 Read
router.get(
  '/fat',
  auth.setCurrentUser,
  dogWeight.readWeightData,
  dogFat.calculatePooData,
  function (req, res, next) {
    res.status(201).json({ message: 'read fat success' });
  }
);

module.exports = router;
