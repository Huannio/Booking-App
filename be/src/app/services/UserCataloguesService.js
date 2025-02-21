const { UserCatalogues } = require("../../models");

class UserCataloguesService {
  async getAll() {
    try {
      return await UserCatalogues.findAll({
        attributes: ["id", "name"],
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserCataloguesService();
