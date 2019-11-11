'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'Toki',
      password: 'jelszo',
      email: 'toki@mail.com',
      bio: 'this is a bio',
      image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      username: 'Boki',
      password: 'pwd',
      email: 'boki@mail.com',
      bio: 'Toki boki',
      image: 'url...',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
