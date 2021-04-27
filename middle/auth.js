const db = require('../models');

const setCurrentUser = async (req, res, next) => {
  // request의 header에 Authorization란 이름으로 uid를 보내줘야 함
  const uid = req.header('Authorization');

  if (!uid) {
    res.status(403);
    res.json({ message: '토큰이 비정상적임' });
    return;
  }

  try {
    req.currentUser = {
      uid: uid,
    };
    next();
  } catch (e) {
    res.status(500);
    res.json({ message: 'auth 서버 문제 발생' });
  }
};

const checkPermission = async (req, res, next) => {
  const currentUser = req.currentUser;
  if (!currentUser) {
    res.status(403);
    res.json({ message: 'forbidden' });
    return;
  }

  try {
    const result = await db.user_dog_info.findOne({
      where: {
        uid: currentUser.uid,
      },
    });

    if (!result) {
      res.status(403);
      res.json({ message: 'forbidden' });
      return;
    }

    next();
  } catch (e) {
    res.status(500);
  }
};

module.exports = {
  setCurrentUser: setCurrentUser,
  checkPermission: checkPermission,
};
