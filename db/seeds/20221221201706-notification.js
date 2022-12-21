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
    return queryInterface.bulkInsert('Notifications', [
      {
        transaction_id : 1,
        user_id: 2, 
        message: "Booking Success",
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        transaction_id : 1,
        user_id: 1, 
        message: "There are new transaction",
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
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
