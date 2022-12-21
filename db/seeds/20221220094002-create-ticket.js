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
    return queryInterface.bulkInsert('Tickets', [
      {
        flight_id: 1,
        type: "Economi",
        price: 600000,
        cabin_baggage: "7 KG",
        baggage: "20 KG",
        desc: "Penerbangan dari bandara Kertajati ke Sultan Syarif Kasim II",
        photo: "https://res.cloudinary.com/doqt4lhc6/image/upload/v1671652332/image/2L_rznltj.webp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        flight_id:2,
        type: "Economi",
        price: 600000,
        cabin_baggage: "7 KG",
        baggage: "20 KG",
        desc: "Penerbangan dari bandara Sultan Syarif Kasim II ke Kertajati",
        photo: "https://res.cloudinary.com/doqt4lhc6/image/upload/v1671652332/image/2L_rznltj.webp",
        createdAt: new Date(),
        updatedAt: new Date(),
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
