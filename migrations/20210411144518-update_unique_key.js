'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.changeColumn('Users', 'email', { 
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
      });
      await queryInterface.changeColumn('Users', 'uid', { 
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, 
       });
       await queryInterface.changeColumn('Users', 'nickname', { 
        type: Sequelize.STRING,
        allowNull: false,
       });
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.dropTable('Users');
     
  }
};
