'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    static associate(models) {
      // Quan hệ nhiều-1 với Products
      Rooms.belongsTo(models.Ships, {
        foreignKey: 'ship_id',
        as: 'ship',
      });

      // Quan hệ nhiều-nhiều với Features thông qua RoomsFeature
      Rooms.belongsToMany(models.Features, {
        through: 'RoomsFeature',
        foreignKey: 'room_id',
        as: 'features',
      });
    }
  }

  Rooms.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ship_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      max_persons: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      sale_prices: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      bed_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      view: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      images: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Rooms',
      tableName: 'rooms',
      timestamps: false,
    }
  );

  return Rooms;
};