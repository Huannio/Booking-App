"use strict";

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

    const product_types = [
      {
        name: "Ship",
        createdAt: new Date(),
      },
      {
        name: "Hotel",
        createdAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("product_type", product_types, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("product_type", null, {});
  },
};
