"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ships", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      shell: {
        type: Sequelize.STRING,
        allowNull: true,
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
        allowNull: true,
      },
      map_link: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      map_iframe_link: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      schedule: {
        type: Sequelize.STRING,
        allowNull: true,
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
          model: "ship_type", 
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      active: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },
      default_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      num_reviews: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      score_review: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      thumbnail: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      images: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ships");
  },
};
