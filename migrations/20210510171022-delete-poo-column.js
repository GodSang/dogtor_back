'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('dog_poos', 'size');
  },

  down: async (queryInterface, Sequelize) => {},
};
