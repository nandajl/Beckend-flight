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
    await queryInterface.bulkInsert('Planes', [
      {
        name: 'Air Asia',
        capacity: 100,
        status: 'Ready',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Garuda',
        capacity: 150,
        status: 'Ready',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Citylink',
        capacity: 100,
        status: 'Ready',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lion',
        capacity: 150,
        status: 'Ready',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Batik',
        capacity: 200,
        status: 'Ready',
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
