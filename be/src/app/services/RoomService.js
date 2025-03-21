// const env = require("../../config/environment");
// const { StatusCodes } = require("http-status-codes");
// const { Room, Cruise, CruiseCategory, ShipType } = require("../../models");
// const slugify = require("../../utils/slugify");
// const uploadToCloudinary = require("../../utils/cloudinary");
// const { Op } = require("sequelize");
// const ApiError = require("../../middleware/ApiError");

// class ShipService {
//   async getAllShip() {
//     try {
//       return await Ships.findAll({
//         attributes: ["id", "title", "address", "map_link", "map_iframe_link", "default_price", "slug", "num_reviews", "score_review", "schedule", "thumbnail", "images", "active"],
//         include: [
//         {
//           model: ShipType,
//           as: "product_type",
//           attributes: ["name"],
//         },
//         {
//           model: Cruise,
//           as: "cruise",
//           attributes: ["admin"],
//         }
//       ],
//       });
//     } catch (error) {
//       throw error;
//     }
//   }

//   async getShipById(id) {
//     try {
//       const ship = await Ships.findOne({
//         where: { id },
//         attributes: ["id", "title", "address", "map_link", "map_iframe_link", "default_price", "slug", "num_reviews", "score_review", "schedule", "thumbnail", "images", "active"],
//         include: [
//           {
//             model: ShipType,
//             as: "product_type",
//             attributes: ["id","name"],
//           },
//         ],
//       });
//     } catch (error) {
//       throw error;
//     }
//   }

//   async createShip(reqBody, reqFile) {
//     try {
//       const { title, address, map_link, map_iframe_link, default_price, schedule,num_reviews, score_review, active, type_product } = reqBody;
//       const data = {
//         title,
//         address,
//         map_link,
//         map_iframe_link,
//         default_price,
//         schedule,
//         num_reviews,
//         score_review,
//         active,
//         type_product,
//         slug: slugify(title),
//       };
//       if (reqFile) {
//         const uploadImage = await uploadToCloudinary(
//           reqFile.buffer,
//           "thumbnail",
//           "images"
//         )
//         data.thumbnail = uploadImage.url
//         data.images = uploadImage.url
//       }

//       return await Ships.create(data);
//     } catch (error) {
//       throw error;
//     }
//   }

//   async updateShip(reqBody, reqFile, id) {
//     try {
//       const { title, address, map_link, map_iframe_link, default_price, schedule,num_reviews, score_review, active, type_product } = reqBody;
//       const data = {
//         title,
//         address,
//         map_link,
//         map_iframe_link,
//         default_price,
//         schedule,
//         num_reviews,
//         score_review,
//         active,
//         type_product,
//       };
//       if (reqFile) {
//         const uploadImage = await uploadToCloudinary(
//           reqFile.buffer,
//           "thumbnail",
//           "images"
//         )
//         data.thumbnail = uploadImage.url
//         data.images = uploadImage.url
//       }
      
//       return await Ships.update(data, { where: { id } });
//     } catch (error) {
//       throw error;
//     }
//   }

//   async deleteShip(id) {
//     try {
//       return await Ships.destroy({ where: { id } });
//     } catch (error) {
//       throw error;
//     }
//   }
//   async getTypes() {
//     try {
//       return await ShipType.findAll({
//         attributes: ["id", "name"],
//       });
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// module.exports = new ShipService();