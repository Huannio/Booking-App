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
    const permissions = [
      {
        name: "Xem danh sách người dùng",
        canonical: "users.index",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Tạo mới người dùng",
        canonical: "users.create",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cập nhật thông tin người dùng",
        canonical: "users.update",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Xoá người dùng",
        canonical: "users.delete",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("permissions", permissions, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
