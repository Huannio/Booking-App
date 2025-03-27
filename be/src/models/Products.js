"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsTo(models.ProductType, {
        foreignKey: "type_product_id",
        as: "type",
      });

      Products.belongsToMany(models.Features, {
        through: {
          model: models.ProductFeature,
          attributes: [],
        },
        foreignKey: "product_id",
        otherKey: "feature_id",
        as: "features",
      });

      Products.hasMany(models.LongDescProducts, {
        foreignKey: "product_id",
        as: "long_desc_products",
      });

      Products.hasOne(models.Cruise, { foreignKey: "id", as: "cruise" });
      Products.hasOne(models.Hotel, { foreignKey: "id", as: "hotel" });
      Products.hasOne(models.Rooms, { foreignKey: "id", as: "rooms" });
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
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Products",
      tableName: "products",
      defaultScope: {
        attributes: { exclude: ["product_id"] },
      },
    }
  );
  return Products;
};
