'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Nếu không có quan hệ với models khác, bạn có thể bỏ qua phần này
    }
  }
  
  Ship.init({
    title: DataTypes.STRING,
    address:  DataTypes.STRING,
    map_link:  DataTypes.TEXT ,
    map_iframe_link:  DataTypes.TEXT,
    default_price:  DataTypes.DECIMAL,
    slug:  DataTypes.STRING,
    num_reviews:  DataTypes.INTEGER,
    score_review:  DataTypes.FLOAT,
    schedule:  DataTypes.STRING,
    thumbnail:  DataTypes.TEXT,
    images:  DataTypes.TEXT,
    type_product:  DataTypes.INTEGER, 
    active:  DataTypes.TINYINT,
  }, {
    sequelize,
    modelName: 'Ship',  
    tableName: 'products', 
  });

  return Ship;
};
