"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductType.hasMany(models.Products, {
        foreignKey: "type_product_id",
        as: "product",
      });
    }
  }
  ProductType.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductType",
      tableName: "product_type",
    }
  );
  return ProductType;
};
