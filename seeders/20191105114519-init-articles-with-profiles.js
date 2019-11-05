'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articles', [ {
      title: 'first',
      slug: 'slug',
      description: 'desc...',
      body: 'very very long body',
      createdAt: new Date(),
      updatedAt: new Date(),
      ProfileId: 1
    }, {
      title: 'second',
      slug: 'slugggy',
      description: 'none',
      body: 'short body',
      favorited: true,
      favoritesCount: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      ProfileId: 1      
    }
  ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {});
  }
};
