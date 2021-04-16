var express = require('express');
var admin = require('../middle/index');
const db = require('../models');
var router = express.Router();



router.get('/', async function(req, res, next) {
    
    db.user_dog_info.findAll()
    .then( result => {
      db.user_dog_info.findOne({
        include: {
          model: db.dog_poo,
          where: {id: 1}
        }
      })
      .then( result2 => {
        res.status(200).json({result2});
      })
    })
    .catch(function(err){
      console.log(err);
    });

});

module.exports = router;
