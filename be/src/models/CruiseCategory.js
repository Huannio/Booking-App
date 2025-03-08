'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CruiseCategory extends Model {
    static associate(models) {
      CruiseCategory.hasMany(models.Cruise, {
        foreignKey: 'category_id',
        as: 'cruise',
      });
    }
  }

  CruiseCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name:DataTypes.STRING,
      image:DataTypes.TEXT, 
    },
    {
      sequelize,
      modelName: 'CruiseCategory',
      tableName: 'cruise_category',
    }
  );

  return CruiseCategory;
};