const {Cruise, CruiseCategory, Products,} = require("../../models");

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
          {
            model: Products, 
            as: "product",
            attributes: ["id", "title", "slug", "thumbnail", "default_price", "num_reviews", "score_reviews"],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CruiseCataloguesService();
