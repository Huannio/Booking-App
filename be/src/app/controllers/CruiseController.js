const { StatusCodes } = require("http-status-codes");
const CruiseService = require("../services/CruiseService");

class CruiseController {
  constructor() {
    this.cruiseService = CruiseService;
  }

  show = async (req, res, next) => {
    try {
      const cruises = await this.cruiseService.getAllCruise();
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, cruises });
    } catch (error) {
      next(error);
    }
  };

  getCategory = async (req, res, next) => {
    try {
      const cruiseCategory = await this.cruiseService.getCategory();
      return res.status(StatusCodes.OK).json(cruiseCategory);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CruiseController();
