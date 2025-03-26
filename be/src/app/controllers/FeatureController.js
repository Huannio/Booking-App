const { StatusCodes } = require("http-status-codes");
const cloudinary = require("../../config/cloudinary");
const FeatureService = require("../services/FeatureService");
const uploadToCloudinary = require("../../utils/cloudinary");

class FeatureController {
  constructor() {
    this.FeatureService = FeatureService; 
  }

  index = async (req, res, next) => {
    try {
      const { id } = req.params;
      const feature = await this.FeatureService.getFeatureById(id);
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, feature });
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const features = await this.FeatureService.getAllFeature();
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, features });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.FeatureService.createFeature(req.body, req.file);
      return res
        .status(StatusCodes.CREATED)
        .json({ statusCode: StatusCodes.CREATED, message: "Tạo thông tin đặc trưng", data });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.FeatureService.updateFeature(
        req.body,
        req.file,
        req.params.id
      );
      return res.status(StatusCodes.OK).json({ 
        statusCode: StatusCodes.OK,
        message: "Cập nhật đặc trưng thành công!", 
        data,
       });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const data = await this.FeatureService.deleteFeature(req.params.id);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Xóa thành công!",
        data,
      });
    } catch (error) {
      next(error);
    }
  };
  
  getTypes = async (req, res, next) => {
    try {
      const featureTypes = await this.FeatureService.getTypes();
      return res.status(StatusCodes.OK).json(featureTypes);
    } catch (error) {
      next(error);
    }
  };

}

module.exports = new FeatureController();