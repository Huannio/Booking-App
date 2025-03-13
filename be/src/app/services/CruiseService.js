const {Cruise, CruiseCategory, products,} = require("../../models");

class CruiseCataloguesService {
   async getAll() {
    try {
      return await Cruise.findAll({
        attributes: ["id", "year", "cabin", "shell", "admin", "trip"],
        include: [
          {
            model: CruiseCategory,
            as: "cruise_category",
            attributes: ["id", "name"],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CruiseCataloguesService();
