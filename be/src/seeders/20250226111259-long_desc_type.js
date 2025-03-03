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
    const long_desc_types = [
      {
        type: "Header",
        createdAt: new Date(),
      },
      {
        type: "Paragraph",
        createdAt: new Date(),
      },
      {
        type: "Image",
        createdAt: new Date(),
      },
      {
        type: "List",
        createdAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("long_desc_type", long_desc_types, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("long_desc_type", null, {});
  },
};
