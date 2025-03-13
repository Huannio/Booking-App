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
   const feature_types = [
    {
      name: "room",
      createdAt: new Date(),
    },
    {
      name: "ship",
      createdAt: new Date(),
    },
    {
      name: "hotel",
      createdAt: new Date(),
    },
    {
      name: "aromhotel",
      createdAt: new Date(),
    },
   ];

   await queryInterface.bulkInsert("feature_types", feature_types, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("feature_types", null, {});
  }
};
