'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [{
      name: 'backend',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'frontend',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'node',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'express',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'sequelize',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'angular',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'react',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'css',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
