'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'Toki',
      email: 'email@domain.com',
      token: null,
      bio: 'this is a bio',
      image: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      username: 'Boki',
      email: 'boki@mail.com',
      token: null,
      bio: 'Toki boki',
      image: 'url...',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
