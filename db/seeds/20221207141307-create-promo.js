'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('Promos', [{
      name: '12.12',
      code: 'FLY12',
      discount: 100000,
      description: 'Terbang lebih murah di tanggal cantik',
      photo: 'https://res.cloudinary.com/doqt4lhc6/image/upload/v1670329626/image/fezu2wme4sum2sv7knxl.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
