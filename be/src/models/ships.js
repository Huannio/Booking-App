'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ships extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Nếu không có quan hệ với models khác, bạn có thể bỏ qua phần này
      Ships.belongsTo(models.ShipType, {
        foreignKey: "type_product",
        as: "ship_type",
      });
    }
  }
  
  Ships.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    title: DataTypes.STRING,
    address:  DataTypes.STRING,
    shell:  DataTypes.STRING,
    year:  DataTypes.INTEGER,
    cabin:  DataTypes.INTEGER,
    admin:  DataTypes.STRING,
    map_link:  DataTypes.TEXT ,
    map_iframe_link:  DataTypes.TEXT,
    schedule:  DataTypes.STRING,
    trip:  DataTypes.STRING,
    slug:  DataTypes.STRING,
    type_product:  DataTypes.INTEGER, 
    active:  DataTypes.TINYINT,
    default_price:  DataTypes.DECIMAL,
    num_reviews:  DataTypes.INTEGER,
    score_review:  DataTypes.FLOAT,
    thumbnail:  DataTypes.TEXT,
    images:  DataTypes.TEXT,
  }, 
  {
    sequelize,
    modelName: 'Ships',  
  });

  return Ships;
};
