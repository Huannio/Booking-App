const env = require("../../config/environment");
const { StatusCodes } = require("http-status-codes");
const { Ships, Cruise } = require("../../models");
const { Op } = require("sequelize");
const ApiError = require("../../middleware/ApiError");

class ShipService {
  // Lấy danh sách tất cả các du thuyền
  async getAllShips() {
    try {
      return await Ships.findAll({
        attributes: ["id", "title", "address", "admin", "slug"],
      });
    } catch (error) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Lỗi khi lấy danh sách du thuyền");
    }
  }

  // Lấy thông tin một du thuyền cụ thể
  async getShipById(id) {
    try {
      const ship = await Ships.findOne({
        attributes: ["id", "title", "address", "admin", "slug"],
      });

      if (!ship) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Du thuyền không tồn tại!");
      }

      return ship;
    } catch (error) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Lỗi khi lấy thông tin du thuyền");
    }
  }

  // Tạo mới một du thuyền
  async createShip(data) {
    try {
      const shipExists = await Ships.findOne({ where: { slug: data.slug } });
      if (shipExists) {
        throw new ApiError(StatusCodes.CONFLICT, "Slug đã tồn tại!");
      }

      const shipData = {
        ...data,
        type_product: env.TYPE_PRODUCT.SHIP, 
      };

      const newShip = await Ships.create(shipData);
      return newShip;
    } catch (error) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Lỗi khi tạo du thuyền");
    }
  }

  // Cập nhật thông tin một du thuyền
  async updateShip(id, data) {
    try {
      const ship = await this.getShipById(id);

      if (data.slug) {
        const checkSlug = await Ships.findOne({
          where: { slug: data.slug, id: { [Op.ne]: id } },
        });
        if (checkSlug) {
          throw new ApiError(StatusCodes.CONFLICT, "Slug đã tồn tại!");
        }
      }

      const updatedShip = await ship.update(data);
      return updatedShip;
    } catch (error) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Lỗi khi cập nhật du thuyền");
    }
  }

  // Xóa một du thuyền
  async deleteShip(id) {
    try {
      const ship = await this.getShipById(id);
      await ship.destroy();
      return true;
    } catch (error) {
      throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Lỗi khi xóa du thuyền");
    }
  }
}

module.exports = new ShipService();