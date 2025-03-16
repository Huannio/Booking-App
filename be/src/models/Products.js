"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.ProductType, {
        foreignKey: "type_product_id",
        as: "type",
      });

      Products.hasOne(models.Cruise, { foreignKey: "id", as: "cruise" });
      Products.hasOne(models.Hotel, { foreignKey: "id", as: "hotel" });
    }
  }
  Products.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      address: DataTypes.STRING,
      map_link: DataTypes.TEXT,
      map_iframe_link: DataTypes.TEXT,
      default_price: DataTypes.DECIMAL,
      num_reviews: DataTypes.INTEGER,
      score_reviews: DataTypes.DECIMAL,
      schedule: DataTypes.STRING,
      thumbnail: DataTypes.TEXT,
      images: DataTypes.TEXT,
      active: DataTypes.BOOLEAN,
      type_product_id: DataTypes.INTEGER,
      slug: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Products",
      tableName: "products",
    }
  );
  return Products;
};
