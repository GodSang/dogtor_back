const db = require('../models');
var admin = require('firebase-admin');
var jwt = require('jsonwebtoken');
var secretObj = require('../config/jwt');

const createUserInfo = async (req, res, next) => {
  const userInfo = req.body;
  const decodeToken = await admin.auth().getUser(userInfo.uid);
  const userEmail = decodeToken.email;

  var token = jwt.sign(
    {
      email: userEmail,
    },
    secretObj.secret,
    {
      expiresIn: '720 days',
    }
  );
  try {
    const result = await db.user_dog_info.create({
      uid: userEmail,
      dog_name: userInfo.dog_name,
      dog_birth: userInfo.dog_birth,
      dog_type: userInfo.dog_type,
      dog_gender: userInfo.dog_gender,
      dog_weight: userInfo.dog_weight,
      dog_image: userInfo.dog_image,
      dog_kcal: userInfo.dog_kcal,
    });
    res.status(201).json({ token: token });
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: '회원 가입 실패' });
  }
};

const readUserInfo = async (req, res, next) => {
  try {
    const result = await db.user_dog_info.findOne({
      attributes: [
        'dog_name',
        'dog_birth',
        'dog_type',
        'dog_gender',
        'dog_weight',
        'dog_image',
        'dog_kcal',
      ],
      where: {
        uid: req.currentUser.uid,
      },
    });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'database insert error(Poo)' });
  }
};

const updateUserInfo = async (req, res, next) => {
  const userInfo = req.body;
  const userEmail = req.currentUser.uid;

  try {
    const result = await db.user_dog_info.update(
      {
        uid: userEmail,
        dog_name: userInfo.dog_name,
        dog_birth: userInfo.dog_birth,
        dog_type: userInfo.dog_type,
        dog_gender: userInfo.dog_gender,
        dog_weight: userInfo.dog_weight,
        dog_image: userInfo.dog_image,
        dog_kcal: userInfo.dog_kcal,
      },
      { where: { uid: userEmail } }
    );
    res.status(201).json({ message: 'update 성공' });
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: '회원 가입 실패' });
  }
};
module.exports = {
  createUserInfo: createUserInfo,
  readUserInfo: readUserInfo,
  updateUserInfo: updateUserInfo,
};
