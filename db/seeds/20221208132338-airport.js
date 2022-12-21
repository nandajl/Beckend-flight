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
        city_code: 'MJK',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sultan Syarif Kasim II',
        city: 'Pekanbaru',
        city_code: 'PKU',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Minangkabau Internasional Airport',
        city: 'Padang',
        city_code: 'PDG',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Soekarno-Hatta',
        city: 'Jakarta',
        city_code: 'JKT',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Haluoleo',
        city: 'Kendari',
        city_code: 'KDI',
        country: 'Indonesia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Juanda International Airport',
        city: 'Surabaya',
        city_code: 'SBY',
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
