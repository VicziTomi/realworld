'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Profiles', [{
      username: 'Toki',
      bio: 'this is a bio',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 1
    },{
      username: 'Boki',
      bio: 'Toki boki',
      image: 'url...',
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: 2
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Profiles', null, {});
  }
};
