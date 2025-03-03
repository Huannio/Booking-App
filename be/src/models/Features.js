'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Features extends Model {
    static associate(models) {
      // Quan hệ nhiều-1 với FeatureCatalogue (một đặc trưng thuộc về một nhóm đặc trưng)
      Features.belongsTo(models.FeatureCatalogue, {
        foreignKey: 'catalogue_id',
        as: 'catalogue',
      });

      // Quan hệ nhiều-nhiều với Products thông qua ProductFeature
      Features.belongsToMany(models.Ships, {
        through: 'ShipFeature',
        foreignKey: 'feature_id',
        as: 'ships',
      });

      // Quan hệ nhiều-nhiều với Rooms thông qua RoomsFeature
      Features.belongsToMany(models.Rooms, {
        through: 'RoomsFeature',
        foreignKey: 'feature_id',
        as: 'rooms',
      });
    }
  }

  Features.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      catalogue_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Cho phép null nếu đặc trưng không thuộc nhóm nào
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
      modelName: 'Features',
      tableName: 'features',
      timestamps: false,
    }
  );

  return Features;
};