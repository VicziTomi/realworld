'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Followers',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        ProfileId: {
          type: Sequelize.INTEGER,
          primaryKey: true
        },
        FollowerId: {
          type: Sequelize.INTEGER,
          primaryKey: true
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Followers');
  }
};
