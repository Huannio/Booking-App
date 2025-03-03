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
    const blog_types = [
      {
        type: "Ship",
        createdAt: new Date(),
      },
      {
        type: "Travel",
        createdAt: new Date(),
      },
      {
        type: "Hotel",
        createdAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("blog_type", blog_types, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("blog_type", null, {});
  },
};
