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
        arrival_date: "2023-01-08",
        arrival_time: "23:00",
        departure_date: "2023-01-08",
        departure_time: "22:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plane_id: 2,
        from_airport_id: 2,
        to_airport_id: 1,
        arrival_date: "2023-01-09",
        arrival_time: "23:00",
        departure_date: "2023-01-09",
        departure_time: "22:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plane_id: 3,
        from_airport_id: 1,
        to_airport_id: 3,
        arrival_date: "2023-01-10",
        arrival_time: "23:00",
        departure_date: "2023-01-10",
        departure_time: "22:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plane_id: 4,
        from_airport_id: 1,
        to_airport_id: 4,
        arrival_date: "2023-01-11",
        arrival_time: "23:00",
        departure_date: "2023-01-11",
        departure_time: "22:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        plane_id: 5,
        from_airport_id: 1,
        to_airport_id: 5,
        arrival_date: "2023-01-12",
        arrival_time: "23:00",
        departure_date: "2023-01-12",
        departure_time: "22:00",
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
