const { StatusCodes } = require("http-status-codes");
const ShipTypeService = require("../services/ShipTypeService");

class ShipTypeController {
  constructor() {
    this.ShipTypeService = ShipTypeService;
  }

  show = async (req, res, next) => {
    try {
      const ShipType = await this.ShipTypeService.getAll();
      res.status(StatusCodes.OK).json({ ShipType });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ShipTypeController();
