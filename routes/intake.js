var express = require('express');
var router = express.Router();
const db = require('../models/index');
const dogToRaspb = require('../middle/dogToRaspb');
const auth = require('../middle/auth');

// Create
router.post('/', auth.setCurrentUser, auth.checkPermission, dogToRaspb.insertEatData,
  function(req, res, next){
    res.status(201).json({message: "insert intake success"});
});

// Read
router.get('/', )

module.exports = router;