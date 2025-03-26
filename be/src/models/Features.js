"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Features extends Model {
    static associate(models) {
      Features.belongsTo(models.FeatureTypes, {
        foreignKey: "type",
        as: "types",
      });

      Features.belongsToMany(models.Products, {
        through: models.ProductFeature,
        foreignKey: "feature_id",
        otherKey: "product_id",
        as: "products",
      });
    }
  }

  Features.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      icon: DataTypes.TEXT,
      text: DataTypes.STRING,
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "feature_types",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Features",
      tableName: "features",
    }
  );
  
  return Features;
};
