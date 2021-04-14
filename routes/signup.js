var express = require('express');
var admin = require('../middle/index');
const db = require('../models');
var router = express.Router();


router.post('/', async function(req, res, next) {
  const userInfo = req.body;

  nickname = userInfo.nickname;
  uid = userInfo.uid;
  token = await admin.auth().getUser(uid);
  userEmail = token.email;

  try {
    const result = await db.Users.create({
          email: userEmail,
          uid: uid,
          nickname: nickname
    })
      res.status(200).json({"message": "가입 성공"});

  } catch (e) {
    res.status(401).json({"message": "중복되는 정보라 실패"});
  }
});

module.exports = router;
