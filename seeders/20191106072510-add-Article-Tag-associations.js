'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ArticleTags', [{
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: 1,
      tagId: 1
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: 1,
      tagId: 3
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: 1,
      tagId: 4
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: 1,
      tagId: 5
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: 2,
      tagId: 2
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: 2,
      tagId: 6
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: 2,
      tagId: 7
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: 2,
      tagId: 8
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: 3,
      tagId: 1
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: 3,
      tagId: 2
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: 3,
      tagId: 3
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: 3,
      tagId: 4
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: 3,
      tagId: 6
    }, {
      createdAt: new Date(),
      updatedAt: new Date(),
      articleId: 3,
      tagId: 7
    }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
