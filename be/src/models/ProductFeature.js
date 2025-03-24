"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductFeature extends Model {
    static associate(models) {
      ProductFeature.belongsTo(models.Features, {
        foreignKey: "feature_id",
        as: "feature",
      });
      ProductFeature.belongsTo(models.Products, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }

  ProductFeature.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      feature_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductFeature",
      tableName: "product_feature",
      timestamps: false,
    }
  );
  return ProductFeature;
};
