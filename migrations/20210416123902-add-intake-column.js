'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {

     return queryInterface.addColumn('intakes', 'user_dog_id', {
      type: Sequelize.STRING,
      references: {
        model: 'user_dog_infos',
        key: 'uid'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.removeColumn('intakes', 'user_dog_id')
  }
};

