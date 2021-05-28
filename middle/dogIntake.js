const db = require('../models');
const Sequelize = require('sequelize');

const createIntakeData = async (req, res, next) => {
  const intakeData = req.body;
  try {
    const intakeInfo = await db.intake.create({
      amountOfMeal: intakeData.amountOfMeal,
      user_dog_id: req.currentUser.uid,
    });
    next();
  } catch (e) {
    res.status(400).json({ message: 'database insert error(Intake)' });
  }
};

const readIntakeData = async (req, res, next) => {
  const intakeData = req.query;
  const Op = Sequelize.Op;
  var startDate = new Date(intakeData.date);
  var endDate = new Date(intakeData.date);
  endDate.setDate(endDate.getDate() + 1);

  try {
    const result = await db.intake.findAndCountAll({
      attributes: ['amountOfMeal', 'createdAt'],
      where: {
        user_dog_id: req.currentUser.uid,
        createdAt: {
          [Op.gt]: startDate,
          [Op.lt]: endDate,
        },
      },
      order: [['createdAt', 'DESC']],
      limit: intakeData.limit * 1,
      offset: intakeData.page * (intakeData.limit * 1),
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ message: 'database insert error Intake' });
  }
};

const calcIntakeSum = async (req, res, next) => {
  const intakeData = req.query;
  const Op = Sequelize.Op;
  const recommendAmount = req.currentData.reAmount;

  var startDate = new Date(intakeData.date);
  var endDate = new Date(intakeData.date);
  endDate.setDate(endDate.getDate() + 1);
  const mealData = await db.intake.findAndCountAll({
    attributes: ['amountOfMeal'],
    where: {
      user_dog_id: req.currentUser.uid,
      createdAt: {
        [Op.gte]: startDate,
        [Op.lt]: endDate,
      },
    },
  });
  let amountOfMeal = mealData.rows;
  let sumOfMeal = 0;

  amountOfMeal.forEach(function (e) {
    sumOfMeal += e.amountOfMeal;
  });

  sumOfMeal *= 4.2;
  let recomMeal = { sumMeal: sumOfMeal, recommendMeal: recommendAmount };
  res.status(201).json(recomMeal);
};

const calcRecommendIntake = async (req, res, next) => {
  const weightData = await db.user_dog_info.findOne({
    attributes: ['dog_weight', 'dog_gender'],
    where: {
      uid: req.currentUser.uid,
    },
  });
  const dogGender = weightData.dog_gender;
  const dogWeight = weightData.dog_weight;
  let rer = 70 * Math.pow(dogWeight, 0.75);
  let der;
  if (dogGender == 'NONE') {
    der = 1.6 * rer;
  } else {
    der = 1.8 * rer;
  }

  req.currentData = {
    reAmount: der,
  };

  next();
};

module.exports = {
  createIntakeData: createIntakeData,
  readIntakeData: readIntakeData,
  calcIntakeSum: calcIntakeSum,
  calcRecommendIntake: calcRecommendIntake,
};
