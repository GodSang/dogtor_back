const db = require('../models');
const Sequelize = require('sequelize');

const calculatePooData = async (req, res, next) => {
  const statusFlag = req.query.dog_status;
  let weight = req.currentUser.dog_weight;
  let status = 0;
  let properWeight = 0;
  switch (statusFlag) {
    case '1':
      status = 5;
      break;
    case '2':
      status = 10;
      break;
    case '3':
      status = 20;
      break;
    case '4':
      status = 30;
      break;
    case '5':
      status = 40;
      break;
    default:
      res.status(400).json({ message: '잘못된 상태 입력' });
  }
  properWeight = (weight * (100 - status)) / 80;
  console.log(properWeight);
  res.status(200).json({ dog_fat: properWeight, dog_weight: weight });
};

module.exports = {
  calculatePooData: calculatePooData,
};
