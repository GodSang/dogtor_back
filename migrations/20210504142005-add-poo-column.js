'use strict';

const { sequelize } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('dog_poos', 'HSV', {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('dog_poos', 'HSV');
  },
};
