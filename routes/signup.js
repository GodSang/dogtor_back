var express = require('express');
const db = require('../models');
var router = express.Router();

router.post('/', async function (req, res, next) {
  const userInfo = req.body;

  try {
    const result = await db.user_dog_info.create({
      uid: userInfo.uid,
      dog_name: userInfo.dog_name,
      dog_birth: userInfo.dog_birth,
      dog_type: userInfo.dog_type,
      dog_gender: userInfo.dog_gender,
      dog_weight: userInfo.dog_weight,
    });
    res.status(200).json({ message: '가입 성공' });
  } catch (e) {
    res.status(401).json({ message: '중복되는 정보라 실패' });
  }
});

module.exports = router;
