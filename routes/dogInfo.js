var express = require('express');
var router = express.Router();
const db = require('../models/index');

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

router.get('/input', async function(req, res, next) {
      const info = await db.Test.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
      attributes: ['eat', 'color'],
      limit: 1,
    });
    res.status(200).json(info)
    console.log(info);
  });

module.exports = router;
