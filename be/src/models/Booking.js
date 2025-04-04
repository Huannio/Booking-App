"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.hasMany(models.BookingRooms, {
        foreignKey: "booking_id",
        as: "bookingRooms",
      });

      Booking.hasOne(models.BookingCustomers, {
        foreignKey: "booking_id",
        as: "bookingCustomers",
      });
    }
  }
  Booking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      code: DataTypes.STRING,
      checkin_date: DataTypes.DATE,
      checkout_date: DataTypes.DATE,
      status: DataTypes.STRING,
      total_price: DataTypes.DECIMAL,
      guests_number: DataTypes.STRING,
      request: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Booking",
      tableName: "booking",
    }
  );
  return Booking;
};
