'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_dog_infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uid: {
        type: Sequelize.STRING,
        unique: true
      },
      dog_name: {
        type: Sequelize.STRING
      },
      dog_birth: {
        type: Sequelize.INTEGER
      },
      dog_type: {
        type: Sequelize.STRING
      },
      dog_gender: {
        type: Sequelize.STRING
      },
      dog_weight: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_dog_infos');
  }
};