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
    
    const userCatalogues = [
      {
        name: "Quản trị viên",
        description: "Quản lý toàn bộ website",
        publish: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cộng tác viên",
        description: "Quản lý đơn hàng, sản phẩm của cộng tác viên",
        publish: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("user_catalogues", userCatalogues, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("user_catalogues", null, {});
  },
};
