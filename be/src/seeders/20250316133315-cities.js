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
   const cities = [
    {
      name: "Hạ Long",
      image: "https://minio.fares.vn/mixivivu-dev/hotel/location/hotel/qon6fo1lgky50tcy.webp",
      createdAt: new Date(),
    },
    {
      name: "Bà Rịa - Vũng Tàu",
      image: "https://minio.fares.vn/mixivivu-dev/hotel/location/hotel/kb00x3gqu3jvg574.webp",
      createdAt: new Date(),
    },
    {
      name: "Bình Thuận",
      image: "https://minio.fares.vn/mixivivu-dev/hotel/location/hotel/st0yrxsvr338xn91.webp",
      createdAt: new Date(),
    },
    {
      name: "Nha Trang",
      image: "https://minio.fares.vn/mixivivu-dev/tour/location/images/m24xg4lftaykx77i.webp",
      createdAt: new Date(),
    },
    {
      name: "Đà Nẵng",
      image: "https://minio.fares.vn/mixivivu-dev/hotel/location/hotel/2johsh9rc8z1p9f1.webp",
      createdAt: new Date(),
    },
    {
      name: "Quảng Ninh",
      image: "https://minio.fares.vn/mixivivu-dev/hotel/location/hotel/2johsh9rc8z1p9f1.webp",
      createdAt: new Date(),
    }
   ];

   await queryInterface.bulkInsert("cities", cities, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("cities", null, {});
  }
};
