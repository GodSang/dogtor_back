'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alarm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  alarm.init(
    {
      fcmKey: DataTypes.STRING,
      alarmOption: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'alarm',
    }
  );

  alarm.associate = (models) => {
    alarm.belongsTo(models.user_dog_info, {
      foreignKey: 'user_id',
    });
  };
  return alarm;
};
