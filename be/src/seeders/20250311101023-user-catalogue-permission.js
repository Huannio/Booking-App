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
    const user_catalogue_permission = [
      {
        user_catalogue_id: 1,
        permission_id: 1,
      },
      {
        user_catalogue_id: 1,
        permission_id: 2,
      },
      {
        user_catalogue_id: 1,
        permission_id: 3,
      },
      {
        user_catalogue_id: 1,
        permission_id: 4,
      },
      {
        user_catalogue_id: 2,
        permission_id: 1,
      },
    ];
    await queryInterface.bulkInsert(
      "user_catalogue_permission",
      user_catalogue_permission,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("user_catalogue_permission", null, {});
  },
};
