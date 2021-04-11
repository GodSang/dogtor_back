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

  db.Users.create({
    email: userEmail,
    uid: uid,
    nickname: nickname
  })
  .then(result => {
    res.status(200).json({message: "가입 성공"});
  })
  .catch(err => {
      res.status(401).json({message:"이미 가입된 정보입니다."});
  })
});

module.exports = router;
