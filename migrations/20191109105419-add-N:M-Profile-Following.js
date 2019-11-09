'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Following',
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
        FollowingId: {
          type: Sequelize.INTEGER,
          primaryKey: true
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Following');
  }
};
