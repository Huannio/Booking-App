"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LongDescProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LongDescProducts.belongsTo(models.Products, {
        foreignKey: "product_id",
        // targetKey: "id",
        as: "product",
      });
      LongDescProducts.belongsTo(models.LongDescType, {
        foreignKey: "type_id",
        as: "type",
      });
    }
  }
  LongDescProducts.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      product_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      image_url: DataTypes.TEXT,
      caption: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "LongDescProducts",
      tableName: "long_desc_products",
    }
  );
  return LongDescProducts;
};
