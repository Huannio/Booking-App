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
   const features = [
    {
      id: 8,
      icon: 'https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731391184/icon/star-3.svg.svg',
      text: 'Phòng gia đình',
      type: 2,
      createdAt: new Date(),
    },
   ];

   await queryInterface.bulkInsert("features", features, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("features", null, {});
  }
};
