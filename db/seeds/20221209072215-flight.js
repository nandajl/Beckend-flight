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
    await queryInterface.bulkInsert('Flights', [
      {
        plane_id: 1,
        from_airport_id: 1,
        to_airport_id: 2,
        arrival_time: new Date(),
        depature: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plane_id: 2,
        from_airport_id: 2,
        to_airport_id: 1,
        arrival_time: new Date(),
        depature: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plane_id: 3,
        from_airport_id: 1,
        to_airport_id: 3,
        arrival_time: new Date(),
        depature: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plane_id: 4,
        from_airport_id: 1,
        to_airport_id: 4,
        arrival_time: new Date(),
        depature: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plane_id: 5,
        from_airport_id: 1,
        to_airport_id: 5,
        arrival_time: new Date(),
        depature: new Date(),
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
