const db = require('../models');
const admin = require('firebase-admin');

const createOrUpdateFcmKeyData = async (req, res, next) => {
  const fcmData = req.body;
  try {
    const result = await db.alarm.findOne({
      where: { user_id: req.currentUser.uid },
    });
    if (!result) {
      await db.alarm.create({
        fcmKey: fcmData.key,
        user_id: req.currentUser.uid,
      });
    }
    await db.alarm.update(
      { fcmKey: fcmData.key },
      {
        where: {
          user_id: req.currentUser.uid,
        },
      }
    );
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'database insert error(FcmKey)' });
  }
};

const searchFcmKey = async (req, res, next) => {
  if (!req.shouldRunFcm) {
    return next();
  }
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
    res.status(400).json({ message: 'fcmKey not found' });
  }
};

const updateAlarmOption = async (req, res, next) => {
  const optionFlag = req.body.optionFlag;

  try {
    const result = await db.alarm.update(
      { alarmOption: optionFlag },
      {
        where: {
          user_id: req.currentUser.uid,
        },
      }
    );
    next();
  } catch (e) {
    res.status(400).json({ message: 'Alarm option failed' });
  }
};

const createPushAlarm = async (req, res, next) => {
  if (!req.shouldRunFcm) {
    return next();
  }
  var target_fcm = req.currentUser.fcmKey;

  var message = {
    notification: {
      title: '테스트 데이터 발송',
      body: '데이터가 잘 가나요?',
    },
    fcmToken: target_fcm,
  };

  admin
    .messaging()
    .send(message)
    .then(function (response) {
      console.log('Successfully sent message : ', response);
    })
    .catch(function (err) {
      console.log('Error Sending message!!! : ', err);
    });
};

module.exports = {
  createOrUpdateFcmKeyData: createOrUpdateFcmKeyData,
  searchFcmKey: searchFcmKey,
  updateAlarmOption: updateAlarmOption,
  createPushAlarm: createPushAlarm,
};
