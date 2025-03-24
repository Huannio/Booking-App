"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.belongsTo(models.Cities, {
        foreignKey: "city_id",
        as: "cities",
      });

      Hotel.hasMany(models.Rooms, {
        foreignKey: "hotel_id",
        as: "rooms",
      });
    }
  }
  Hotel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cities",
          key: "id",
        },
      },
      admin: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Hotel",
      tableName: "hotel",
    }
  );
  return Hotel;
};
