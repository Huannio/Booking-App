const ApiError = require("../../middleware/ApiError");
const { StatusCodes } = require("http-status-codes");
const { UserCatalogues, Permissions } = require("../../models");
const { Op } = require("sequelize");

class PermissionManagementService {
  async getOnePermission(id) {
    try {
      return await Permissions.findOne({
        where: { id },
        attributes: ["id", "name", "canonical", "module"],
      });
    } catch (error) {
      throw error;
    }
  }
  async getAllPermission() {
    try {
      return await Permissions.findAll({
        attributes: ["id", "name", "canonical", "module"],
      });
    } catch (error) {
      throw error;
    }
  }

  async create(reqBody) {
    try {
      const { canonical } = reqBody;
      const module = canonical.split(".")[0];
      reqBody.module = module;
      const existCanonical = await Permissions.findOne({
        where: { canonical },
      });

      if (existCanonical) {
        throw new ApiError(StatusCodes.CONFLICT, "Đường dẫn đã tồn tại!");
      }

      return await Permissions.create(reqBody);
    } catch (error) {
      throw error;
    }
  }

  async update(reqBody, id) {
    try {
      const { canonical } = reqBody;
      const module = canonical.split(".")[0];
      reqBody.module = module;
      const existingPermission = await Permissions.findOne({
        where: { canonical, id: { [Op.ne]: id } },
      });

      if (existingPermission) {
        throw new ApiError(StatusCodes.CONFLICT, "Đường dẫn đã tồn tại!");
      }

      return await Permissions.update(reqBody, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      return await Permissions.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async getAllUserCataloguePermission() {
    try {
      const data = await UserCatalogues.findAll({
        attributes: ["id", "name", "description"],
        include: {
          model: Permissions,
          as: "permissions",
          attributes: ["id", "name", "canonical"],
          through: { attributes: [] }, // ẩn bảng trung gian
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getPermissionsByUserCatalogueId(id) {
    try {
      const data = await UserCatalogues.findOne({
        where: { id },
        attributes: ["id", "name", "description"],
        include: {
          model: Permissions,
          as: "permissions",
          attributes: ["id", "name", "canonical"],
          through: { attributes: [] },
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  getPermissionSearch = async (reqQuery, limit, offset) => {
    try {
      const { name } = reqQuery;

      let where = {};
      if (name != null) {
        where = {
          name: {
            [Op.like]: `%${name}%`,
          },
        };
      }

      const total = await Permissions.count({ where });

      const permissions = await Permissions.findAndCountAll({
        limit,
        offset,
        attributes: ["id", "name", "canonical", "module"],
        where,
        order: [["name", "ASC"]],
      });

      return {
        total: total,
        data: permissions.rows,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new PermissionManagementService();
