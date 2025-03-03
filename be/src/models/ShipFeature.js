'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ShipFeature extends Model {
    static associate(models) {
      // Quan hệ với Ships và Features
    }
  }

  ShipFeature.init(
    {
      ship_id: {
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
      modelName: 'ShipFeature',
      tableName: 'ship_feature',
      timestamps: false,
    }
  );

  return ShipFeature;
};