'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dog_pee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dog_pee.init(
    {
      size: DataTypes.FLOAT,
      RGB: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'dog_pee',
    }
  );

  dog_pee.associate = (models) => {
    dog_pee.belongsTo(models.user_dog_info, {
      foreignKey: 'user_dog_id',
    });
  };
  return dog_pee;
};
