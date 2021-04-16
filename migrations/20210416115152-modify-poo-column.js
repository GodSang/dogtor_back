'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn('dog_poos', 'R');
     await queryInterface.removeColumn('dog_poos', 'G');
     await queryInterface.removeColumn('dog_poos', 'B');
     await queryInterface.addColumn('dog_poos', 'RGB', {
        type: Sequelize.STRING(7),
        allowNull: false,
     });

  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn('dog_poos', 'R');
     await queryInterface.addColumn('dog_poos', 'G');
     await queryInterface.addColumn('dog_poos', 'B');
     await queryInterface.removeColumn('dog_poos', 'RGB');
  }
};
