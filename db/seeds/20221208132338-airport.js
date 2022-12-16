'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Airports', [
      {
        name: 'Kertajati',
        city: 'Majalengka',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sultan Syarif Kasim II',
        city: 'Pekanbaru',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Minangkabau Internasional Airport',
        city: 'Padang',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Soekarno-Hatta',
        city: 'Jakarta',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Haluoleo',
        city: 'Kendari',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Juanda International Airport',
        city: 'Surabaya',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
