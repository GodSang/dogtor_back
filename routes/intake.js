var express = require('express');
var router = express.Router();
const db = require('../models/index');
const dogIntake = require('../middle/dogIntake');
const auth = require('../middle/auth');

// Create
router.post('/', auth.setCurrentUser, auth.checkPermission, dogIntake.createEatData,
  function(req, res, next){
    res.status(201).json({message: "create intake success"});
});

// Read
router.get('/', auth.setCurrentUser, auth.checkPermission, dogIntake.readIntakeData,
  function(req, res, next) {
    res.status(201).json({message: "read intake success"});
});

module.exports = router;