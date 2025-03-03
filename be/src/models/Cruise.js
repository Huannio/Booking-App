// 'use strict';
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Cruise extends Model {
//     static associate(models) {
      
//       Cruise.belongsTo(models.Ships, {
//         foreignKey: 'ships_id',
//         as: 'ships',
//       });

//       // Quan hệ nhiều-1 với CruiseCategory
//       Cruise.belongsTo(models.CruiseCategory, {
//         foreignKey: 'cruise_category_id',
//         as: 'cruise_category',
//       });
//     }
//   }

//   Cruise.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       year: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       cabin: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       shell: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       trip: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       admin: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       category_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'Cruise',
//     }
//   );

//   return Cruise;
// };