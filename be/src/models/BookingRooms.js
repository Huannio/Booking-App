"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookingRooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookingRooms.belongsTo(models.Booking, {
        foreignKey: "booking_id",
        as: "booking",
      });
      BookingRooms.belongsTo(models.Rooms, {
        foreignKey: "room_id",
        as: "room",
      });
    }
  }
  BookingRooms.init(
    {
      booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BookingRooms",
      tableName: "booking_rooms",
      timestamps: false,
    }
  );
  return BookingRooms;
};
