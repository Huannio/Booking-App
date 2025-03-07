"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("products", {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      map_link: {
        allowNull: true,
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      map_iframe_link: {
        allowNull: true,
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      default_price: {
        allowNull: false,
        type: Sequelize.DECIMAL,
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      num_reviews: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      score_reviews: {
        allowNull: false,
        type: Sequelize.DECIMAL,
        defaultValue: 0,
      },
      schedule: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      thumbnail: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      images: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      type_product_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "product_type",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("products");
  },
};
