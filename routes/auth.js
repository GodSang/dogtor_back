var express = require('express');
var admin = require('../middle/index');
const db = require('../models');
var router = express.Router();

/* GET users listing. */
// app에서 uid 보내줬을 때
router.post('/', async function(req, res, next) {
  const uid = req.body.uid;

  // 미들웨어 호출부 (디코드)
  userInfo = await admin.auth().getUser(uid);
  userEmail = userInfo.email;

  // 디비 조회 후 없는 값이면
  try {
    const result = await db.Users.findAll({
        where: {
            email: userEmail
        }
    })

    if (result.length) {
      res.status(200).json({"next": "login"});
    } else {
      res.status(200).json({"next": "signup"});
    }
  
  } catch (e) {
    res.status(401);
  }
});

module.exports = router;
