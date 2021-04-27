var express = require('express');
var router = express.Router();
const db = require('../models/index');
const auth = require('../middle/auth');
const dogPee = require('../middle/dogPoo');

// Create
router.post('/', auth.setCurrentUser, auth.checkPermission, dogPee.insertPeeData,
  function(req, res, next) {
    res.status(201).json({message: "insert pee success"});
});

router.get('/', auth.setCurrentUser, auth.checkPermission, dogPee.readPooData,
  function(req, res, next) {
    res.status(201).json({message: "read poo success"});
});

module.exports = router;