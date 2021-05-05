const db = require('../models');

const createFcmKeyData = async (req, res, next) => {
  const fcmData = req.body;
  try {
    const result = await db.alarm.create({
      fcmKey: fcmData.key,
      user_id: req.currentUser.uid,
    });
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'database insert error(FcmKey)' });
  }
};

const searchFcmKey = async (req, res, next) => {
  //   console.log(currentUser.uid);
  try {
    const fcmKey = await db.alarm.findOne({
      where: {
        user_id: req.currentUser.uid,
      },
      attributes: ['fcmKey'],
    });
    req.currentUser = {
      fcmKey: fcmKey,
    };
    next();
  } catch (e) {
    // res.json(e);
    res.status(400).json({ message: 'fcmKey not found' });
  }
};

module.exports = {
  createFcmKeyData: createFcmKeyData,
  searchFcmKey: searchFcmKey,
};
