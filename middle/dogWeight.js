const db = require('../models');

const readWeightData = async (req, res, next) => {
  try {
    const result = await db.user_dog_info.findOne({
      where: { uid: req.currentUser.uid },
      attributes: ['dog_weight'],
    });
    req.currentUser = {
      dog_weight: result.dataValues.dog_weight,
    };
    next();
  } catch (e) {
    res.status(400).json({ message: 'database read error(Weight)' });
  }
};

const updateWeightData = async (req, res, next) => {
  const dogWeight = req.body.weight;

  try {
    const result = await db.user_dog_info.update(
      {
        dog_weight: dogWeight,
      },
      { where: { uid: req.currentUser.uid } }
    );
    next();
  } catch (e) {
    res.status(400).json({ message: 'database update error(Weight)' });
  }
};

module.exports = {
  readWeightData: readWeightData,
  updateWeightData: updateWeightData,
};
