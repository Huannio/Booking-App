'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomsFeature extends Model {
    static associate(models) {
      // Quan hệ với Rooms và Features
    }
  }

  RoomsFeature.init(
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
      modelName: 'RoomsFeature',
      tableName: 'rooms_feature',
      timestamps: false,
    }
  );

  return RoomsFeature;
};