'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ships', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER, 
        allowNull: true,
      },
      cabin: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      admin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      map_link: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      map_iframe_link: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      shell: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      schedule: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      active: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      trip: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      type_product: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "product_type", 
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      thumbnail: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      images: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      default_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Ships");
  },
};
