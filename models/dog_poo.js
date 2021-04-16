'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('dog_poo', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    uid: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    size: {
      type: DataTypes.FLOAT
    },
    R: {
      type: DataTypes.INTEGER
    },
    G: {
      type: DataTypes.INTEGER
    },
    B: {
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    tableName: 'dog_poo'
  });
};