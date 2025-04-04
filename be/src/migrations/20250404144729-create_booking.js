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
    await queryInterface.createTable("booking", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      checkin_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      checkout_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      guests_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
          "Đã đặt phòng",
          "Đã thanh toán",
          "Hoàn thành",
          "Đã huỷ"
        ),
        allowNull: false,
      },
      total_price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      request: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable("booking");
  },
};
