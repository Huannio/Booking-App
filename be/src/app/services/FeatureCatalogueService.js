const { FeatureTypes } = require("../../models");
const { Op } = require("sequelize");
const ApiError = require("../../middleware/ApiError");

class FeatureCatalogueService {
  // Tìm kiếm nhóm đặc trưng với phân trang
  async searchFeatureCatalogues(keyword, offset, limit) {
    try {
      const whereClause = keyword ? { name: { [Op.like]: `%${keyword}%` } } : {};

      const featureCatalogues = await FeatureTypes.findAll({
        where: whereClause,
        limit: limit,
        offset: offset,
      });

      const totalRecords = await FeatureTypes.count({ where: whereClause });

      return { featureCatalogues, totalRecords };
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các nhóm đặc trưng
  async getAllFeatureCatalogues(offset, limit) {
    try {
      const featureCatalogues = await FeatureTypes.findAll({
        limit: limit,
        offset: offset,
      });

      const totalRecords = await FeatureTypes.count();

      return { featureCatalogues, totalRecords };
    } catch (error) {
      throw error;
    }
  }

  // Tạo mới một nhóm đặc trưng
  async createFeatureCatalogue(data) {
    try {
      const featureCatalogueExists = await FeatureTypes.findOne({ where: { name: data.name } });
      if (featureCatalogueExists) {
        throw new ApiError(StatusCodes.CONFLICT, "Nhóm đặc trưng đã tồn tại!");
      }

      const newFeatureCatalogue = await FeatureTypes.create(data);
      return newFeatureCatalogue;
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin một nhóm đặc trưng
  async updateFeatureCatalogue(id, data) {
    try {
      const featureCatalogue = await FeatureTypes.findByPk(id);
      if (!featureCatalogue) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Nhóm đặc trưng không tồn tại!");
      }

      const updatedFeatureCatalogue = await featureCatalogue.update(data);
      return updatedFeatureCatalogue;
    } catch (error) {
      throw error;
    }
  }

  // Xóa một nhóm đặc trưng
  async deleteFeatureCatalogue(id) {
    try {
      const featureCatalogue = await FeatureTypes.findByPk(id);
      if (!featureCatalogue) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Nhóm đặc trưng không tồn tại!");
      }

      await featureCatalogue.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new FeatureCatalogueService();