const db = require('../models');
const Sequelize = require('sequelize');

const createPooData = async (req, res, next) => {
  const pooData = req.body;
  req.shouldRunFcm = req.body.flag;

  try {
    await db.dog_poo.create({
      RGB: pooData.RGB,
      HSV: pooData.HSV,
      user_dog_id: req.currentUser.uid,
    });
    next();
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'database insert error(Poo)' });
  }
};

const readPooData = async (req, res, next) => {
  const pooData = req.query;
  const Op = Sequelize.Op;
  var startDate = new Date(pooData.date);
  var endDate = new Date(pooData.date);
  endDate.setDate(endDate.getDate() + 1);

  try {
    const result = await db.dog_poo.findAndCountAll({
      attributes: ['RGB', 'createdAt'],
      where: {
        user_dog_id: req.currentUser.uid,
        createdAt: {
          [Op.gt]: startDate,
          [Op.lt]: endDate,
        },
      },
      order: [['createdAt', 'DESC']],
      limit: pooData.limit * 1,
      offset: pooData.page * (pooData.limit * 1),
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ message: 'database insert error(Poo)' });
  }
};

const pooColorClassfication = async (req, res, next) => {
  if (!req.shouldRunFcm) {
    return next();
  }
  let pooColor;
  switch (req.body.color) {
    case 'gray':
      pooColor = '회색 대변';
      symptom = '소화 장애가 의심됩니다';
      break;
    case 'black':
      pooColor = '검은색 대변';
      symptom = '위장질환이 의심됩니다';
      break;
    case 'red':
      pooColor = '빨간색 대변';
      symptom = '소화기관에 출혈이 의심됩니다';
      break;
    case 'green':
      pooColor = '초록색 대변';
      symptom = '담낭 문제가 의심됩니다';
      break;
    case 'yellow':
      pooColor = '노란색 대변';
      symptom = '소화불량이 의심됩니다';
      break;
    case 'orange':
      pooColor = '주황색 대변';
      symptom = '소화불량이 의심됩니다';
      break;
    case 'purple':
      pooColor = '보라색 대변';
      symptom = '출혈성 위장염이 의심됩니다';
      break;
    default:
      req.shouldRunFcm = 0;
  }
  req.currentDog = {
    color: pooColor,
    symptom: symptom,
  };
  next();
};
module.exports = {
  createPooData: createPooData,
  readPooData: readPooData,
  pooColorClassfication: pooColorClassfication,
};
