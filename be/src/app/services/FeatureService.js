const { Features } = require("../../models");
const { Op } = require("sequelize");
const ApiError = require("../../middleware/ApiError");

class FeatureService {
  // Tìm kiếm tính năng với phân trang
  async searchFeatures(keyword, offset, limit) {
    try {
      const whereClause = keyword ? { text: { [Op.like]: `%${keyword}%` } } : {};

      const features = await Features.findAll({
        where: whereClause,
        limit: limit,
        offset: offset,
      });

      const totalRecords = await Features.count({ where: whereClause });

      return { features, totalRecords };
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách tất cả các tính năng
  async getAllFeatures(offset, limit) {
    try {
      const features = await Features.findAll({
        limit: limit,
        offset: offset,
      });

      const totalRecords = await Features.count();

      return { features, totalRecords };
    } catch (error) {
      throw error;
    }
  }

  // Tạo mới một tính năng
  async createFeature(data) {
    try {
      const featureExists = await Features.findOne({ where: { text: data.text } });
      if (featureExists) {
        throw new ApiError(StatusCodes.CONFLICT, "Tính năng đã tồn tại!");
      }

      const newFeature = await Features.create(data);
      return newFeature;
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin một tính năng
  async updateFeature(id, data) {
    try {
      const feature = await Features.findByPk(id);
      if (!feature) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Tính năng không tồn tại!");
      }

      const updatedFeature = await feature.update(data);
      return updatedFeature;
    } catch (error) {
      throw error;
    }
  }

  // Xóa một tính năng
  async deleteFeature(id) {
    try {
      const feature = await Features.findByPk(id);
      if (!feature) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Tính năng không tồn tại!");
      }

      await feature.destroy();
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new FeatureService();