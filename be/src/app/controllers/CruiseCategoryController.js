const { StatusCodes } = require("http-status-codes");
const CruiseCategoryService = require("../services/CruiseCategoryService");

class CruiseCategoryController {
  constructor() {
    this.CruiseCategoryService = CruiseCategoryService;
  }

  show = async (req, res, next) => {
    try {
      const CruiseCategory = await this.CruiseCategoryService.getAll();
      res.status(StatusCodes.OK).json({ CruiseCategory });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CruiseCategoryController();
