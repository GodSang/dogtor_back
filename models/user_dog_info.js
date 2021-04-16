const db = require('../models');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
 return sequelize.define('user_dog_info', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  uid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dog_name: {
    type: DataTypes.STRING
  },
  dog_birth: {
    type: DataTypes.INTEGER
  },
  dog_type: {
    type: DataTypes.STRING
  },
  dog_gender: {
    type: DataTypes.STRING
  },
  dog_weight: {
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
    tableName: 'user_dog_info'
  });

};