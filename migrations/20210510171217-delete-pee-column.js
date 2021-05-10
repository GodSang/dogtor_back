'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('dog_pees', 'size');
  },

  down: async (queryInterface, Sequelize) => {},
};
