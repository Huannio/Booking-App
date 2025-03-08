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

    const cruise_categories = [
      {
        name: "Vịnh Hạ Long",
        image:
          "https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731337566/ship-category/vinh_ha_long.jpg.jpg",
        createdAt: new Date(),
      },
      {
        name: "Vịnh Lan Hạ",
        image:
          "https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731337582/ship-category/vinh_lan_ha.jpg.jpg",
        createdAt: new Date(),
      },
      {
        name: "Đảo Cát Bà",
        image:
          "https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731337591/ship-category/dao_cat_ba.jpg.jpg",
        createdAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("cruise_category", cruise_categories, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("cruise_category", null, {});
  },
};
