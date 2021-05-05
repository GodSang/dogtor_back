const db = require('../models');
const Sequelize = require('sequelize');
const admin = require('firebase-admin');

const createPooData = async (req, res, next) => {
  const pooData = req.body;
  const target_token = req.currentUser.uid;

  // const message = {
  //   notification: {
  //     title: '테스트 데이터 발송',
  //     body: '데이터가 잘 가나요?',
  //   },
  //   token: target_token,
  // };

  // admin
  //   .messaging()
  //   .send(message)
  //   .then(function (response) {
  //     console.log('Successfully sent message : ', response);
  //   })
  //   .catch(function (err) {
  //     console.log('Error Sending message!!! : ', err);
  //   });
  try {
    await db.dog_poo.create({
      size: pooData.size,
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
      offset: pooData.page * 2,
    });
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'database insert error(Poo)' });
  }
};

module.exports = {
  createPooData: createPooData,
  readPooData: readPooData,
};
