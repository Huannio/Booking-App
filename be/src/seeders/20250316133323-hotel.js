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
   const hotel = [
    {
      id: 329,
      admin: 'CÔNG TY CỔ PHẦN ĐẦU TƯ TÂN HOA LƯ',
      city_id: 1,
      createdAt: new Date(),
    },
    {
      id: 332,
      admin: 'Sea Stars Group',
      city_id: 1,
      createdAt: new Date(),
    },
    {
      id: 333,
      admin: 'CÔNG TY CỔ PHẦN DU LỊCH DỊCH VỤ SAO HẠ LONG',
      city_id: 1,
      createdAt: new Date(),
    },
    {
      id: 334,
      admin: 'Geleximco Group',
      city_id: 1,
      createdAt: new Date(),
    },
    {
      id: 335,
      admin: 'CÔNG TY TNHH VINH QUANG HẠ LONG',
      city_id: 1,
      createdAt: new Date(),
    },
    {
      id: 336,
      admin: 'CÔNG TY CỔ PHẦN ĐẦU TƯ MINH ĐĂNG',
      city_id: 1,
      createdAt: new Date(),
    },
    {
      id: 337,
      admin: 'Boss Hotel Nha Trang',
      city_id: 5,
      createdAt: new Date(),
    },
    {
      id: 338,
      admin: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN MƯỜNG THANH',
      city_id: 6,
      createdAt: new Date(),
    },
    {
      id: 339,
      admin: 'CÔNG TY TNHH LIÊN DOANH HẠ LONG PLAZA',
      city_id: 6,
      createdAt: new Date(),
    }
   ];

   await queryInterface.bulkInsert("hotel", hotel, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("hotel", null, {});
  }
};
