'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ShipType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShipType.hasMany(models.Ships, {
        foreignKey: "type_product",
        as: "products",
      });
    }
  }

  ShipType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ShipType', 
      tableName: 'product_type', 
    }
  );

  return ShipType;
};