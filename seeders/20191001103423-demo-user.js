'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'Toki',
      password: 'jelszo',
      email: 'email@domain.com',
      token: null,
      bio: 'this is a bio',
      image: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'Boki',
      password: 'pwd',
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
