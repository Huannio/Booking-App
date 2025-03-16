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
      Rooms.belongsTo(models.Hotel, {
        foreignKey: "id",
        as: "hotel",
      });

      Rooms.hasMany(models.Products, {
        foreignKey: "id",
        as: "product",
      });
    }
  }
  Rooms.init(
    {
      id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    product_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    size: DataTypes.INTEGER,
    max_persons: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
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
