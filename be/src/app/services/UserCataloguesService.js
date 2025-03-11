const { StatusCodes } = require("http-status-codes");
const ApiError = require("../../middleware/ApiError");
const { UserCatalogues, Users } = require("../../models");
const { Op } = require("sequelize");

class UserCataloguesService {
  async getAll() {
    try {
      return await UserCatalogues.findAll({
        attributes: ["id", "name", "description"],
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserCatalogueById(id) {
    try {
      return await UserCatalogues.findOne({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async create(reqBody) {
    try {
      const { name } = reqBody;
      const nameExist = await UserCatalogues.findOne({ where: { name } });
      if (nameExist) {
        throw new ApiError(StatusCodes.CONFLICT, "Tên vai trò đã tồn tại");
      }
      return await UserCatalogues.create(reqBody);
    } catch (error) {
      throw error;
    }
  }

  async update(id, reqBody) {
    try {
      const { name } = reqBody;
      const nameExist = await UserCatalogues.findOne({
        where: { name, id: { [Op.ne]: id } },
      });
      if (nameExist) {
        throw new ApiError(StatusCodes.CONFLICT, "Tên vai trò đã tồn tại");
      }

      return await UserCatalogues.update(reqBody, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const countUserOfUserCatalogue = await UserCatalogues.findOne({
        where: { id },
        include: [{ model: Users, as: "users" }],
      });

      if (countUserOfUserCatalogue.users.length > 0) {
        throw new ApiError(
          StatusCodes.BAD_REQUEST,
          "Tồn tại người dùng trong vai trò, không thể xóa!"
        );
      }
      return await UserCatalogues.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserCataloguesService();
