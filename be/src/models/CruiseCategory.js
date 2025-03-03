'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CruiseCategory extends Model {
    static associate(models) {
      // Quan hệ 1-nhiều với Cruise
      // CruiseCategory.hasMany(models.Cruise, {
      //   foreignKey: 'category_id',
      //   as: 'cruise',
      // });
    }
  }

  CruiseCategory.init(
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
      image: {
        type: DataTypes.TEXT,
        allowNull: false, 
      },
    },
    {
      sequelize,
      modelName: 'CruiseCategory',
      tableName: 'cruise_category',
    }
  );

  return CruiseCategory;
};