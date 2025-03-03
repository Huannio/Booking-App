const { StatusCodes } = require("http-status-codes");
const FeatureService = require("../services/FeatureService");
const ApiError = require("../../middleware/ApiError");

class FeatureController {
  constructor() {
    this.featureService = FeatureService;
  }

  // Tìm kiếm tính năng với phân trang
  search = async (req, res, next) => {
    try {
      const { page = 1, limit = 5, keyword = "" } = req.query;
      const offset = (page - 1) * limit;

      const { features, totalRecords } = await this.featureService.searchFeatures(keyword, offset, limit);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        features,
        totalRecords,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalRecords / limit),
      });
    } catch (error) {
      next(error);
    }
  };

  // Lấy danh sách tất cả các tính năng
  index = async (req, res, next) => {
    try {
      const { page = 1, limit = 5 } = req.query;
      const offset = (page - 1) * limit;

      const { features, totalRecords } = await this.featureService.getAllFeatures(offset, limit);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        features,
        totalRecords,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalRecords / limit),
      });
    } catch (error) {
      next(error);
    }
  };

  // Tạo mới một tính năng
  create = async (req, res, next) => {
    try {
      const { text, type } = req.body;
      const newFeature = await this.featureService.createFeature({ text, type });

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Tạo tính năng thành công!",
        feature: newFeature,
      });
    } catch (error) {
      next(error);
    }
  };

  // Cập nhật thông tin một tính năng
  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { text, type } = req.body;

      const updatedFeature = await this.featureService.updateFeature(id, { text, type });

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Cập nhật tính năng thành công!",
        feature: updatedFeature,
      });
    } catch (error) {
      next(error);
    }
  };

  // Xóa một tính năng
  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.featureService.deleteFeature(id);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Xóa tính năng thành công!",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new FeatureController();