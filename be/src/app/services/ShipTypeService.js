const { ShipType } = require("../../models");

class ShipTypeService {
  async getAll() {
    try {
      return await ShipType.findAll({
        attributes: ["id", "name"],
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ShipTypeService();
