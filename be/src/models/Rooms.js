"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rooms.belongsTo(models.Products, {
        foreignKey: "product_id",
        as: "product",
      });

      Rooms.belongsToMany(models.Features, {
        through: {
          model: models.RoomFeatures,
          attributes: [],
        },
        foreignKey: "room_id",
        as: "features",
      });

      Rooms.hasMany(models.BookingRooms, {
        foreignKey: "room_id",
        as: "bookingRooms",
      });
    }
  }
  Rooms.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      title: DataTypes.STRING,
      size: DataTypes.INTEGER,
      max_persons: DataTypes.INTEGER,
      default_price: DataTypes.INTEGER,
      images: DataTypes.TEXT,
      sale_prices: DataTypes.INTEGER,
      bed_type: DataTypes.STRING,
      view: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rooms",
      tableName: "rooms",
    }
  );
  return Rooms;
};
