"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ships", [
      {
        title: "Du thuyền Hoàng Gia",
        address: "Hạ Long, Việt Nam",
        shell: "Kim loại",
        year: 2020,
        cabin: 50,
        admin: "admin1",
        map_link: "https://maps.google.com/example",
        map_iframe_link: "<iframe src='https://maps.google.com/example'></iframe>",
        schedule: "Lịch trình 3 ngày 2 đêm",
        trip: "Hạ Long - Cát Bà",
        slug: "du-thuyen-hoang-gia",
        type_product: 1,  // Giả sử 1 là du thuyền
        active: 1,
        default_price: 5000000.00,
        num_reviews: 100,
        score_review: 4.8,
        thumbnail: "https://example.com/image1.jpg",
        images: "https://example.com/image2.jpg, https://example.com/image3.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "Du thuyền Sapphire",
        address: "Nha Trang, Việt Nam",
        shell: "Gỗ",
        year: 2018,
        cabin: 30,
        admin: "admin2",
        map_link: "https://maps.google.com/example2",
        map_iframe_link: "<iframe src='https://maps.google.com/example2'></iframe>",
        schedule: "Lịch trình 2 ngày 1 đêm",
        trip: "Nha Trang - Đảo Bình Ba",
        slug: "du-thuyen-sapphire",
        type_product: 1,
        active: 1,
        default_price: 4500000.00,
        num_reviews: 80,
        score_review: 4.5,
        thumbnail: "https://example.com/image4.jpg",
        images: "https://example.com/image5.jpg, https://example.com/image6.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ships", null, {});
  },
};
