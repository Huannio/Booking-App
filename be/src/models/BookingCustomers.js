"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BookingCustomers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookingCustomers.belongsTo(models.Booking, {
        foreignKey: "booking_id",
        as: "booking",
      });
      BookingCustomers.belongsTo(models.Customers, {
        foreignKey: "customer_id",
        as: "customer",
      });
    }
  }
  BookingCustomers.init(
    {
      booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "BookingCustomers",
      tableName: "booking_customers",
      timestamps: false,
    }
  );
  return BookingCustomers;
};
