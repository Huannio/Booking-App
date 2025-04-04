"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShortDescProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShortDescProducts.belongsTo(models.Products, {
        foreignKey: "product_id",
        // targetKey: "id",
        as: "product",
      });
    }
  }
  ShortDescProducts.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      product_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ShortDescProducts",
      tableName: "short_desc_products",
    }
  );
  return ShortDescProducts;
};
