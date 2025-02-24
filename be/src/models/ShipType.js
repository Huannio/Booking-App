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
      // Định nghĩa quan hệ nếu có
      ShipType.hasMany(models.Ships, {
        foreignKey: "ship_type_id",
        as: "ships",
      });
    }
  }

  ShipType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,

    },
    {
      sequelize,
      modelName: 'ShipType', 
      tableName: 'ship_type',
    }
  );

  return ShipType;
};