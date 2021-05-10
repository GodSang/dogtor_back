var jwt = require('jsonwebtoken');
var secretObj = require('../config/jwt');

const setCurrentUser = async (req, res, next) => {
  // 토큰 디코드 후 email 추출
  const token = req.header('Authorization');
  try {
    const decoded = jwt.verify(token, secretObj.secret);
    if (!decoded) {
      res.status(403);
      res.json({ message: '토큰이 비정상적임' });
      return;
    }
    req.currentUser = {
      uid: decoded.email,
    };
    next();
  } catch (e) {
    res.status(500);
    res.json({ message: 'auth 서버 문제 발생' });
  }
};

module.exports = {
  setCurrentUser: setCurrentUser,
};
