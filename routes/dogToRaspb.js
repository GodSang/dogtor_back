var express = require('express');
var router = express.Router();
const db = require('../models/index');
const dogToRaspb = require('../middle/dogToRaspb');
const auth = require('../middle/auth');

/* GET users listing. */

// 식사량 데이터 insert
router.post('/intake', auth.setCurrentUser, auth.checkPermission, dogToRaspb.insertEatData,
  function(req, res, next){
    res.json({message: "insert intake success"});
});

router.post('/poo', auth.setCurrentUser, auth.checkPermission, dogToRaspb.insertPooData, 
  function(req, res, next) {
    res.json({message: "insert poo success"});
});

router.post('/pee', auth.setCurrentUser, auth.checkPermission, dogToRaspb.insertPeeData,
  function(req, res, next) {
    res.json({message: "insert pee success"});
});

module.exports = router;
