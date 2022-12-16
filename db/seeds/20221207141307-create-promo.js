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
     return queryInterface.bulkInsert('Promos', [
      {
        name: '12.12',
        code: 'FLY12',
        discount: 100000,
        description: 'Terbang lebih murah di tanggal cantik',
        photo: 'https://res.cloudinary.com/doqt4lhc6/image/upload/v1671177870/image/2_wji0k1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Christmas day',
        code: 'CRM22',
        discount: 50000,
        description: 'Rayakan natal bersama kami',
        photo: 'https://res.cloudinary.com/doqt4lhc6/image/upload/v1671177870/image/4_d01rre.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Akhir Tahun Ceria',
        code: 'NWY22',
        discount: 75000,
        description: 'Terbang seru di tahun baru',
        photo: 'https://res.cloudinary.com/doqt4lhc6/image/upload/v1671177870/image/3_nqayfd.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Special Destination',
        code: 'SYD22',
        discount: 99000,
        description: 'Destinasi spesial, harga spesial',
        photo: 'https://res.cloudinary.com/doqt4lhc6/image/upload/v1671177870/image/1_ynud9g.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    
  ]);
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
