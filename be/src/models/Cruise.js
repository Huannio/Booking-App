'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cruise extends Model {
    static associate(models) {
      Cruise.hasMany(models.Ships, {
        foreignKey: 'cruise_id',
        as: 'products',
      });

      Cruise.belongsTo(models.CruiseCategory, {
        foreignKey: 'category_id',
        as: 'cruise_category',
      });
    }
  }

  Cruise.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      year:DataTypes.INTEGER,
      cabin:DataTypes.INTEGER,
      shell:DataTypes.STRING,
      trip:DataTypes.STRING,
      admin:DataTypes.STRING,
      category_id:DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cruise',
      tableName: 'cruise',
    }
  );

  return Cruise;
};