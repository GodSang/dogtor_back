var express = require('express');
var router = express.Router();
const auth = require('../middle/auth');
const dogPee = require('../middle/dogPee');

// Create
router.post('/', auth.setCurrentUser, auth.checkPermission, dogPee.createPeeData,
  function(req, res, next) {
    res.status(201).json({message: "insert pee success"});
});

// Read
router.get('/', auth.setCurrentUser, auth.checkPermission, dogPee.readPeeData,
  function(req, res, next) {
    res.status(201).json({message: "read pee success"});
});

module.exports = router;