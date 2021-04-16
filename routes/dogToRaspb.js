var express = require('express');
var router = express.Router();
const db = require('../models/index');
const dogToRaspb = require('../middle/dogToRaspb');

/* GET users listing. */
router.post('/', function(req, res, next) {
  var paramId = req.body.eat || req.query.eat;
  var paramPassword = req.body.color || req.query.color;
  console.log("debug code");
  db.Test.create({
    eat: paramId,
    color: paramPassword
  })
  res.status(200).json({"eat": "success", "color": "success"});
});

// 강아지 식사량 데이터 INSERT 라우터
router.post('/eat', function(req, res, next) {
  const eatData = req.body;

  db.eat.create({
    amountOfMeal: eatData.weight,
    uid: eatData.uid
  })
  res.status(200).json({"message":"eat data insert success"});
});

// 
router.post('/feces', dogToRaspb.getPooPeeFlag, dogToRaspb.insertPooPeeData, function(req, res, next){

})

router.get('/input', async function(req, res, next) {
      const info = await db.Test.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      attributes: ['eat', 'color'],
      limit: 1,b
    });
    res.status(200).json(info)
    console.log(info);
  });

module.exports = router;
