'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [{
      name: 'backend'
    }, {
      name: 'frontend'
    }, {
      name: 'node'
    }, {
      name: 'express'
    }, {
      name: 'sequelize'
    }, {
      name: 'angular'
    }, {
      name: 'react'
    }, {
      name: 'css'
    }
  ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};
