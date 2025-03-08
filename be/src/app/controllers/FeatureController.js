// const { StatusCodes } = require("http-status-codes");
// const cloudinary = require("../../config/cloudinary");
// const FeatureService = require("../services/FeatureService");
// const uploadToCloudinary = require("../../utils/cloudinary");

// class FeatureController {
//   constructor() {
//     this.featureService = FeatureService; 
//   }

//   index = async (req, res, next) => {
//     try {
//       const data = await this.featureService.getFeatureById(req.params.id);
//       res.status(StatusCodes.OK).json(data);
//     } catch (error) {
//       next(error);
//     }
//   };

//   show = async (req, res, next) => {
//     try {
//       const data = await this.featureService.getAllFeature();
//       return res.status(StatusCodes.OK).json(data);
//     } catch (error) {
//       next(error);
//     }
//   };

//   create = async (req, res, next) => {
//     try {
//       const data = await this.shipService.createFeature(req.body, req.file);
//       return res.status(StatusCodes.CREATED).json({
//         statusCode: StatusCodes.CREATED,
//         message: "Tạo đặc trưng thành công",
//         data,
//       });
//     } catch (error) {
//       next(error);
//     }
//   };

//   update = async (req, res, next) => {
//     try {
//       const data = await this.featureService.updateShip(
//         req.body,
//         req.file,
//         req.params.id
//       );
//       return res.status(StatusCodes.OK).json({
//         statusCode: StatusCodes.OK,
//         message: "Cập nhật đặc trưng thành công",
//         data,
//       });
//     } catch (error) {
//       next(error);
//     }
//   };

//   delete = async (req, res, next) => {
//     try {
//       const data = await this.shipService.deleteFeature(req.params.id);
//       return res.status(StatusCodes.OK).json({
//         statusCode: StatusCodes.OK,
//         message: "Xóa thành công!",
//         data,
//       });
//     } catch (error) {
//       next(error);
//     }
//   };
  
//   getTypes = async (req, res, next) => {
//     try {
//       const featureTypes = await this.featureService.getTypes();
//       return res.status(StatusCodes.OK).json(featureTypes);
//     } catch (error) {
//       next(error);
//     }
//   };

// }

// module.exports = new FeatureController();