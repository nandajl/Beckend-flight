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
        category: "One way",
        desc: "Penerbangan dari bandara a ke b",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        flight_id: 1,
        return_flight_id: 2,
        type: "Economi",
        price: 1200000,
        category: "Round trip",
        desc: "Penerbangan pulang pergi dari bandara a ke b",
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
