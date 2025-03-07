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
    const products = [
      {
        id: 1,
        title: "Du thuyền Heritage Bình Chuẩn Cát Bà",
        address: "Lux Cruises, Lô 28 Cảng Quốc Tế Tuần Châu",
        map_link: "https://goo.gl/maps/6mQDuQWa4Ybq6K5p8",
        map_iframe_link:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.7436108855272!2d106.98803167489945!3d20.922632380700293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a5ec6c1fba745%3A0xd8c824609119f9db!2zQ-G6o25nIHTDoHUga2jDoWNoIFF14buRYyB04bq_IFR14bqnbiBDaMOidQ!5e0!3m2!1svi!2s!4v1695975094490!5m2!1svi!2s",
        default_price: 3650000,
        slug: "du-thuyen-heritage-binh-chuan-cat-ba",
        num_reviews: 11,
        score_reviews: 4.5,
        schedule: "2 ngày 1 đêm.",
        thumbnail:
          "https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731339561/thumbnail/du-thuyen-heritage-binh-chuan-cat-ba.webp.webp",
        images:
          "https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382044/du-thuyen-heritage-binh-chuan-cat-ba/t2ui81o9nbdtf56v.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382046/du-thuyen-heritage-binh-chuan-cat-ba/v9cm918bgyzrrv8m.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382046/du-thuyen-heritage-binh-chuan-cat-ba/vxu71by7dd2tydgu.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382045/du-thuyen-heritage-binh-chuan-cat-ba/wuiuqcn674wv446n.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382044/du-thuyen-heritage-binh-chuan-cat-ba/wwd7tjmchxpz8akk.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382044/du-thuyen-heritage-binh-chuan-cat-ba/x0uu3pp6gtscg5y1.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382045/du-thuyen-heritage-binh-chuan-cat-ba/x236j5emtps9j78l.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382044/du-thuyen-heritage-binh-chuan-cat-ba/y4uhvicxsismrzp4.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382045/du-thuyen-heritage-binh-chuan-cat-ba/ysxrb9qqi67hdsbh.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731382044/du-thuyen-heritage-binh-chuan-cat-ba/zrpr1iamwfdt2q7l.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381977/du-thuyen-heritage-binh-chuan-cat-ba/nx36g4ggepatgx23.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381977/du-thuyen-heritage-binh-chuan-cat-ba/o2kogmctu1d9yxyk.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381979/du-thuyen-heritage-binh-chuan-cat-ba/o5mnoydzlclxgg3j.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381977/du-thuyen-heritage-binh-chuan-cat-ba/o7kiablbgtnjaxwf.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381977/du-thuyen-heritage-binh-chuan-cat-ba/omud7gtwhrw52pxq.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381981/du-thuyen-heritage-binh-chuan-cat-ba/qqg11wpx6n7o42hs.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381977/du-thuyen-heritage-binh-chuan-cat-ba/rbznq3vanovdsldr.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381984/du-thuyen-heritage-binh-chuan-cat-ba/rdnva04u7uooo4f7.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381977/du-thuyen-heritage-binh-chuan-cat-ba/rof0myc8lr63xbyg.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381978/du-thuyen-heritage-binh-chuan-cat-ba/sycbdvem9e1q4f5r.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381929/du-thuyen-heritage-binh-chuan-cat-ba/euev5a6jl8q9uvkw.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381929/du-thuyen-heritage-binh-chuan-cat-ba/f8nbp1mpdd7t4ft1.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381929/du-thuyen-heritage-binh-chuan-cat-ba/fpp5ify2bxb8t5dg.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381929/du-thuyen-heritage-binh-chuan-cat-ba/h3ytlsonnclzil7s.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381937/du-thuyen-heritage-binh-chuan-cat-ba/kx89g2bb7w09r69b.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381930/du-thuyen-heritage-binh-chuan-cat-ba/l0n037rg7wn2lye7.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381932/du-thuyen-heritage-binh-chuan-cat-ba/l4lc989kbn64eert.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381930/du-thuyen-heritage-binh-chuan-cat-ba/l505h63wwaqe3i5g.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381933/du-thuyen-heritage-binh-chuan-cat-ba/moigs880j904a4sk.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381931/du-thuyen-heritage-binh-chuan-cat-ba/npw4hyu51lsps442.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381890/du-thuyen-heritage-binh-chuan-cat-ba/1igusnttvx5r28wp.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381890/du-thuyen-heritage-binh-chuan-cat-ba/1uv1ixjc6mewk33i.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381890/du-thuyen-heritage-binh-chuan-cat-ba/2t1lcjvse4upz9mi.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381892/du-thuyen-heritage-binh-chuan-cat-ba/2u9iw3ntgvi6dlbl.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381892/du-thuyen-heritage-binh-chuan-cat-ba/6qfchkzd3lnydsf6.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381891/du-thuyen-heritage-binh-chuan-cat-ba/07rhax6sj7vsbwon.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381892/du-thuyen-heritage-binh-chuan-cat-ba/7r4st9dfrcrixv1v.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381892/du-thuyen-heritage-binh-chuan-cat-ba/27cexpxsjr3m0jt0.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381896/du-thuyen-heritage-binh-chuan-cat-ba/28ae4mmdc303htzb.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381891/du-thuyen-heritage-binh-chuan-cat-ba/35km4l3vbnhnofq6.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381892/du-thuyen-heritage-binh-chuan-cat-ba/41j0568ccdx4hks8.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381890/du-thuyen-heritage-binh-chuan-cat-ba/63ljiq0pp8y5szs8.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381892/du-thuyen-heritage-binh-chuan-cat-ba/68lij24f2j3bcgqg.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381891/du-thuyen-heritage-binh-chuan-cat-ba/93phxrlx90hkabst.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381894/du-thuyen-heritage-binh-chuan-cat-ba/2337qnaemnzod6x6.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381892/du-thuyen-heritage-binh-chuan-cat-ba/766189woio1utr6m.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381892/du-thuyen-heritage-binh-chuan-cat-ba/a3ti5kj9wpkbgzet.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381893/du-thuyen-heritage-binh-chuan-cat-ba/ba38zx8g66h90loq.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381890/du-thuyen-heritage-binh-chuan-cat-ba/cis9fi6wjlo6kejj.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731381891/du-thuyen-heritage-binh-chuan-cat-ba/ef7mmnjzqe3tip4m.webp.webp",
        type_product_id: 1,
        active: true,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "DeLaSea Phát Linh Hạ Long",
        address:
          "Lô 1, Đại Lộ Hạ Long Marine, Phường Bãi Cháy, TP. Hạ Long, Tỉnh Quảng Ninh",
        map_link: "https://maps.app.goo.gl/yxDCjgQvorHL43xX9",
        map_iframe_link:
          "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d119229.44557381053!2d106.935051132406!3d20.95572060962992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x314a596b84c08f2b%3A0x27b88eb3d16aa2e7!2zTMO0IDEgxJDhuqFpIGzhu5kgSOG6oSBMb25nIE1hcmluZSwgQsOjaSBDaMOheSwgVGjDoG5oIHBo4buRIEjhuqEgTG9uZywgUXXhuqNuZyBOaW5oIDIwMDAw!3m2!1d20.9557404!2d107.0174528!5e0!3m2!1svi!2s!4v1726040657186!5m2!1svi!2s",
        default_price: 1950000,
        slug: "delasea-phat-linh-ha-long",
        num_reviews: 23,
        score_reviews: 5,
        thumbnail:
          "https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731999071/thumbnail/o6obristc019rsh0.webp.webp",
        images:
          "https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731999074/delasea-phat-linh-ha-long/b4vep3nnds4hexog.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731999074/delasea-phat-linh-ha-long/7u5zyu8m9zalb8bt.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731999074/delasea-phat-linh-ha-long/r30fms3459aa11mp.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731999073/delasea-phat-linh-ha-long/qk319sheuldykucb.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731999074/delasea-phat-linh-ha-long/gbkdpz4xp6vl08y6.webp.webp,https://res.cloudinary.com/dhnp8ymxv/image/upload/v1731999074/delasea-phat-linh-ha-long/34gx2xu8u5wjgjb3.webp.webp",
        type_product_id: 2,
        active: true,
        createdAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("products", products, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("products", null, {});
  },
};
