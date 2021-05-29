'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_dog_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_dog_info.init(
    {
      uid: DataTypes.STRING,
      dog_name: DataTypes.STRING,
      dog_birth: DataTypes.INTEGER,
      dog_type: DataTypes.STRING,
      dog_gender: DataTypes.STRING,
      dog_weight: DataTypes.FLOAT,
      dog_image: DataTypes.INTEGER,
      dog_kcal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'user_dog_info',
    },
    { charset: 'utf8', collate: 'utf8_unicode_ci' }
  );

  user_dog_info.associate = (models) => {
    user_dog_info.hasMany(models.dog_poo, {
      foreignKey: 'user_dog_id',
      as: 'poos',
    });
    user_dog_info.hasMany(models.dog_pee, {
      foreignKey: 'user_dog_id',
      as: 'pees',
    });
    user_dog_info.hasMany(models.intake, {
      foreignKey: 'user_dog_id',
      as: 'intakes',
    });
  };
  return user_dog_info;
};
