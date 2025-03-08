// const {Cruise, CruiseCategory } = require("../../models");

// class CruiseCataloguesService {
//     async getAllCruise() {
//     try {
//         return await Cruise.findAll({
//         attributes: ["id", "year", "cabin", "shell", "trip", "admin", "category_id"],
//         include: [
//         {
//             model: CruiseCategory,
//             as: "cruise_category",
//             attributes: ["name"],
//         },
//         ],
//         });
//     } catch (error) {
//         throw error;
//     }
//     }

//     async getCruiseById(id) {
//     try {
//         const Cruise = await Cruise.findOne({
//         where: { id },
//         attributes: ["id", "year", "cabin", "shell", "trip", "admin", "category_id"],
//         include: [
//             {
//             model: CruiseCategory,
//             as: "cruise_category",
//             attributes: ["name", "id"],
//             },
//         ],
//     });
//     } catch (error) {
//         throw error;
//     }
//     }
    
//     async getCategory() {
//         try {
//           return await CruiseCategory.findAll({
//             attributes: ["id", "name", "image"],
//           });
//         } catch (error) {
//           throw error;
//         }
//       }
// }

// module.exports = new CruiseCataloguesService();
