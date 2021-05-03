const db = require('../models');

const readWeightData = async (req, res, next) => {};

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
