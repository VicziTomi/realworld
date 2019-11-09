'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Comments',
      'ProfileId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Profiles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Comments',
      'ProfileId'
    );
  }
};
