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
    const products = [
      {
        id: 1,
        title: 'Du thuyền Heritage Bình Chuẩn Cát Bà',
        address: 'Lux Cruises, Lô 28 Cảng Quốc Tế Tuần Châu',
        map_link: 'https://goo.gl/maps/6mQDuQWa4Ybq6K5p8',
        map_iframe_link: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.7436108855272!2d106.98803167489945!3d20.922632380700293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a5ec6c1fba745%3A0xd8c824609119f9db!2zQ-G6o25nIHTDoHUga2jDoWNoIFF14buRYyB04bq_IFR14bqnbiBDaMOidQ!5e0!3m2!1svi!2s!4v1695975094490!5m2!1svi!2s',
        default_price: 3650000,
        slug: 'du-thuyen-heritage-binh-chuan-cat-ba',
        num_reviews: 11,
        score_review: 4.9,
        schedule: '2 ngày 1 đêm.',
        thumbnail: 'https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731339561/thumbnail/du-thuyen-heritage-binh-chuan-cat-ba.webp.webp',
        images: JSON.stringify([
          'https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382044/du-thuyen-heritage-binh-chuan-cat-ba/t2ui81o9nbdtf56v.webp.webp',
          'https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382046/du-thuyen-heritage-binh-chuan-cat-ba/v9cm918bgyzrrv8m.webp.webp',
          'https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382046/du-thuyen-heritage-binh-chuan-cat-ba/vxu71by7dd2tydgu.webp.webp',
          'https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382045/du-thuyen-heritage-binh-chuan-cat-ba/wuiuqcn674wv446n.webp.webp',
          'https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382044/du-thuyen-heritage-binh-chuan-cat-ba/wwd7tjmchxpz8akk.webp.webp'
        ]),
        type_product: 1,
        active: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];

    await queryInterface.bulkInsert("products", products, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("products", null, {});
  }
};
