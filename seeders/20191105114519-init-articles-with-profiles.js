'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articles', [{
      title: 'first',
      slug: 'slug',
      description: 'backendish content',
      body: 'very very long body',
      createdAt: new Date(),
      updatedAt: new Date(),
      ProfileId: 1
    }, {
      title: 'second',
      slug: 'slugggy',
      description: 'frontendish content',
      body: 'short body',
      favorited: true,
      favoritesCount: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      ProfileId: 1
    }, {
      title: 'third',
      slug: 'has no slug',
      description: 'content covers eeeeverything',
      body: 'full',
      favorited: false,
      favoritesCount: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      ProfileId: 2
    }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {});
  }
};
