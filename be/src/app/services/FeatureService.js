// const env = require("../../config/environment");
// const { StatusCodes } = require("http-status-codes");
// const { Features, FeatureType } = require("../../models");
// const ApiError = require("../../middleware/ApiError");

// class FeatureService {
//   async getAllFeature() {
//     try {
//       return await Features.findAll({
//         attributes: ["id", "icon", "text", "type"],
//         include: [{ model: FeatureType, as: "feature_types", attributes: ["name", "id"] }],
//       });
//     } catch (error) {
//       throw error;
//     }
//   }

//   async getFeatureById(id) {
//     try {
//       return await Features.findOne({
//         attributes: ["id", "icon", "text", "type"],
//         where: { id },
//         include: [{ model: FeatureType, as: "feature_types", attributes: ["name", "id"] }],
//       });
//     } catch (error) {
//       throw error;
//     }
//   }

//   async createFeature(reqBody, reqFile) {
//     try {
//       const { icon, text, type } = reqBody;
//       const data = {
//         icon,
//         text,
//         type,
//       };

//       return await Features.create(data);
//     } catch (error) {
//       throw error;
//     }
//   }

//   async updateBlog(reqBody, reqFile, id) {
//     try {
//        const { icon, text, type } = reqBody;
//       const data = {
//         icon,
//         text,
//         type,
//       };

//       return await Features.update(data, { where: { id } });
//     } catch (error) {
//       throw error;
//     }
//   }

//   async deleteFeature(id) {
//     try {
//       return await Features.destroy({ where: { id } });
//     } catch (error) {
//       throw error;
//     }
//   }

//   async getTypes() {
//     try {
//       return await FeatureType.findAll({
//         attributes: ["id", "name"],
//       });
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// module.exports = new FeatureService();
