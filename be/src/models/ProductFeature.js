"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductFeature extends Model {
    static associate(models) {
      ProductFeature.belongsTo(models.Features, {
        foreignKey: 'product_id',
        as: 'product'
      });
      
      ProductFeature.belongsTo(models.Products, {
        foreignKey: 'feature_id',
        as: 'feature'
      });
    }
  }

  ProductFeature.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { 
          model: 'products', 
          key: 'id',
        }
      },
      feature_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'features', key: 'id' }
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
