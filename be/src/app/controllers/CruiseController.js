const { StatusCodes } = require("http-status-codes");
const CruiseService = require("../services/CruiseService");

class CruiseController {
  constructor() {
    this.cruiseService = CruiseService;
  }

  show = async (req, res, next) => {
    try {
      const cruises = await this.cruiseService.getAll();
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, cruises });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CruiseController();
