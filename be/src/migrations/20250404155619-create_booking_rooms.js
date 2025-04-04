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
    await queryInterface.createTable("booking_rooms", {
      booking_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "booking",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      room_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "rooms",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
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
  },
};
