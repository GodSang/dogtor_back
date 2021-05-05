const db = require('../models');
const Sequelize = require('sequelize');

const createIntakeData = async (req, res, next) => {
  const intakeData = req.body;
  try {
    const intakeInfo = await db.intake.create({
      amountOfMeal: intakeData.weight,
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
    console.log(e);
    res.status(400).json({ message: 'database insert error Intake' });
  }
};

module.exports = {
  createIntakeData: createIntakeData,
  readIntakeData: readIntakeData,
};
