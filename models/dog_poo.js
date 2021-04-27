'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dog_poo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dog_poo.init(
    {
      size: DataTypes.FLOAT,
      RGB: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'dog_poo',
    }
  );

  dog_poo.associate = (models) => {
    dog_poo.belongsTo(models.user_dog_info, {
      foreignKey: 'user_dog_id',
    });
  };
  return dog_poo;
};
