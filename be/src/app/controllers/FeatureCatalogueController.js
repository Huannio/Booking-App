const { StatusCodes } = require("http-status-codes");
const FeatureCatalogueService = require("../services/FeatureCatalogueService");
const ApiError = require("../../middleware/ApiError");

class FeatureCatalogueController {
  constructor() {
    this.featureCatalogueService = FeatureCatalogueService;
  }

  // Tìm kiếm nhóm đặc trưng với phân trang
  search = async (req, res, next) => {
    try {
      const { page = 1, limit = 5, keyword = "" } = req.query;
      const offset = (page - 1) * limit;

      const { featureCatalogues, totalRecords } = await this.featureCatalogueService.searchFeatureCatalogues(
        keyword,
        offset,
        limit
      );

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        featureCatalogues,
        totalRecords,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalRecords / limit),
      });
    } catch (error) {
      next(error);
    }
  };

  // Lấy danh sách tất cả các nhóm đặc trưng
  index = async (req, res, next) => {
    try {
      const { page = 1, limit = 5 } = req.query;
      const offset = (page - 1) * limit;

      const { featureCatalogues, totalRecords } = await this.featureCatalogueService.getAllFeatureCatalogues(
        offset,
        limit
      );

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        featureCatalogues,
        totalRecords,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalRecords / limit),
      });
    } catch (error) {
      next(error);
    }
  };

  // Tạo mới một nhóm đặc trưng
  create = async (req, res, next) => {
    try {
      const { name } = req.body;
      const newFeatureCatalogue = await this.featureCatalogueService.createFeatureCatalogue({ name });

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Tạo nhóm đặc trưng thành công!",
        featureCatalogue: newFeatureCatalogue,
      });
    } catch (error) {
      next(error);
    }
  };

  // Cập nhật thông tin một nhóm đặc trưng
  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const updatedFeatureCatalogue = await this.featureCatalogueService.updateFeatureCatalogue(id, { name });

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Cập nhật nhóm đặc trưng thành công!",
        featureCatalogue: updatedFeatureCatalogue,
      });
    } catch (error) {
      next(error);
    }
  };

  // Xóa một nhóm đặc trưng
  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.featureCatalogueService.deleteFeatureCatalogue(id);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Xóa nhóm đặc trưng thành công!",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new FeatureCatalogueController();