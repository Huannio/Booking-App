const env = require("../../config/environment");
const { StatusCodes } = require("http-status-codes");
const { Ships, ShipType } = require("../../models");
const { Op } = require("sequelize");
const ApiError = require("../../middleware/ApiError");

class ShipService {
  async getAllShips() {
    try {
      return await Ships.findAll({
        attributes: ["id", "title", "address", "map_link", "map_iframe_link", "default_price", "slug", "num_reviews", "score_review", "schedule", "thumbnail", "images", "type_product", "active"],
        include: [{ model: ShipType, as: "ship_type", attributes: ["name", "id"] }],
      });
    } catch (error) {
      throw error;
    }
  }

  async getShipById(id) {
    try {
      return await Ships.findOne(id, {
        attributes: ["id", "title", "address", "map_link", "map_iframe_link", "default_price", "slug", "num_reviews", "score_review", "schedule", "thumbnail", "images", "type_product", "active"],
        where: { id },
        include: [{ model: ShipType, as: "ship_type", attributes: ["name", "id"] }],
      });
    } catch (error) {
      throw error;
    }
  }

  async createShip(data) {
    try {
      const shipExists = await Ships.findOne({ where: { slug: data.slug } });
      if (shipExists) {
        throw new ApiError(StatusCodes.CONFLICT, "Slug đã tồn tại!");
      }

      return await Ships.create(data);
    } catch (error) {
      throw error;
    }
  }

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

      return await ship.update(data);
    } catch (error) {
      throw error;
    }
  }

  async deleteShip(id) {
    try {
      const ship = await this.getShipById(id);
      return await ship.destroy();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ShipService();
