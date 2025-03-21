"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductFeature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
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
    }
    );
  return ProductFeature;
};
