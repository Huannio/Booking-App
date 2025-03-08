'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ships extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ships.belongsTo(models.ShipType, {
        foreignKey: "type_product",
        as: "product_type",
      });
      Ships.belongsTo(models.Cruise, {
        foreignKey: "id",
        as: "cruise",
      });
      // Ships.belongsToMany(models.Features, {
      //   through: 'ShipFeature',
      //   foreignKey: 'ship_id',
      //   as: 'features',
      // });
      // Ships.hasMany(models.Rooms, {
      //   foreignKey: 'ship_id',
      //   as: 'rooms',
      // });
    }
  }

  Ships.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      title:DataTypes.STRING,
      address:DataTypes.STRING,
      map_link:DataTypes.TEXT,
      map_iframe_link:DataTypes.TEXT,
      default_price:DataTypes.DECIMAL,
      slug:DataTypes.STRING,
      num_reviews:DataTypes.INTEGER,
      score_review:DataTypes.FLOAT,
      schedule:DataTypes.STRING,
      thumbnail:DataTypes.TEXT,
      images:DataTypes.TEXT,
      type_product:DataTypes.INTEGER,
      active:DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "Ships",
      tableName: "products",
    }
  );

  return Ships;
};