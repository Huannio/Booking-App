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
   const cruises = [
    {
      id: 1,
      year: 2019,
      cabin: 20,
      shell: 'Kim loại',
      trip: 'Vịnh Lan Hạ - Bãi tắm Ba Trái Đào - Hang Sáng Tối',
      admin: 'Công ty cổ phần Heritage Cruises',
      category_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
   ];
   await queryInterface.bulkInsert('Cruise', cruises);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Cruise', null, {});
  }
};
