'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FeatureCatalogue extends Model {
    static associate(models) {
      // Quan hệ 1-nhiều với Features (một nhóm đặc trưng có nhiều đặc trưng)
      FeatureCatalogue.hasMany(models.Features, {
        foreignKey: 'catalogue_id',
        as: 'features',
      });
    }
  }

  FeatureCatalogue.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: 'FeatureCatalogue',
      tableName: 'feature_catalogue',
      timestamps: false,
    }
  );

  return FeatureCatalogue;
};