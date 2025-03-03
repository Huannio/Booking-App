const { CruiseCategory } = require("../../models");

class CruiseCategoryService {
  async getAll() {
    try {
      return await CruiseCategory.findAll({
        attributes: ["id", "name", "image"],
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CruiseCategoryService();
