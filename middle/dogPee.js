const db = require('../models');
const Sequelize = require('sequelize');

const createPeeData = async (req, res, next) => {
  const peeData = req.body;

  try {
    await db.dog_pee.create({
      size: peeData.size,
      RGB: peeData.RGB,
      HSV: peeData.HSV,
      user_dog_id: req.currentUser.uid,
    });
    next();
  } catch (e) {
    console.log(e);
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
      offset: peeData.page * 2,
    });
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'database insert error(Pee)' });
  }
};

module.exports = {
  createPeeData: createPeeData,
  readPeeData: readPeeData,
};
