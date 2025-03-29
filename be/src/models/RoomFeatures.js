"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RoomFeatures extends Model {
    static associate(models) {
      // Quan hệ với Rooms và Features
      RoomFeatures.belongsTo(models.Rooms, {
        foreignKey: "room_id",
      });
      RoomFeatures.belongsTo(models.Features, {
        foreignKey: "feature_id",
      });
    }
  }

  RoomFeatures.init(
    {
      room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      feature_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "RoomFeatures",
      tableName: "room_features",
      timestamps: false,
    }
  );

  return RoomFeatures;
};
