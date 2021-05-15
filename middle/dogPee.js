const db = require('../models');
const Sequelize = require('sequelize');

const createPeeData = async (req, res, next) => {
  const peeData = req.body;
  req.shouldRunFcm = req.body.flag;

  try {
    await db.dog_pee.create({
      RGB: peeData.RGB,
      HSV: peeData.HSV,
      user_dog_id: req.currentUser.uid,
    });
    next();
  } catch (e) {
    res.status(400).json({ message: 'database insert error(Pee)' });
  }
};

const readPeeData = async (req, res, next) => {
  const peeData = req.query;
  const Op = Sequelize.Op;
  var startDate = new Date(peeData.date);
  var endDate = new Date(peeData.date);
  endDate.setDate(endDate.getDate() + 1);

  try {
    const result = await db.dog_pee.findAndCountAll({
      attributes: ['RGB', 'createdAt'],
      where: {
        user_dog_id: req.currentUser.uid,
        createdAt: {
          [Op.gt]: startDate,
          [Op.lt]: endDate,
        },
      },
      order: [['createdAt', 'DESC']],
      limit: peeData.limit * 1,
      offset: peeData.page * (peeData.limit * 1),
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ message: 'database insert error(Pee)' });
  }
};

const peeColorClassfication = async (req, res, next) => {
  if (!req.shouldRunFcm) {
    return next();
  }
  let peeColor;
  switch (req.body.color) {
    case 'black':
      peeColor = '검은색 소변';
      symptom = '근육 손상 혹은 독소 중독이 의심됩니다.';
      break;
    case 'brown':
      peeColor = '갈색 소변';
      symptom = '근육 손상 혹은 독소 중독이 의심됩니다.';
      break;
    case 'red':
      peeColor = '빨간색 소변';
      symptom = '요로 감염 혹은 염증이 의심됩니다';
      break;
    case 'pink':
      peeColor = '분홍색 소변';
      symptom = '요로 감염 혹은 염증이 의심됩니다';
      break;
    case 'orange':
      peeColor = '주황색 소변';
      symptom = '황달 혹은 소화 기관 문제가 의심됩니다.';
      break;
    default:
      req.shouldRunFcm = 0;
  }
  req.currentDog = {
    color: peeColor,
    symptom: symptom,
  };
  next();
};

module.exports = {
  createPeeData: createPeeData,
  readPeeData: readPeeData,
  peeColorClassfication: peeColorClassfication,
};
