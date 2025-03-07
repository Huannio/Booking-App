const { StatusCodes } = require("http-status-codes");
const ShipService = require("../services/ShipService");
class ShipController {
  constructor() {
    this.ShipService = ShipService;
  }

  getCruiseCategory = async (req, res, next) => {
    try {
      const cruiseCategory = await this.ShipService.getCruiseCategory();
      res
        .status(StatusCodes.OK)
        .json({ statusCode: StatusCodes.OK, cruiseCategory });
    } catch (error) {
      next(error);
    }
  };

  index = async (req, res, next) => {
    try {
      const { slug } = req.params;
      console.log(slug);
      const ship = await this.ShipService.getShipBySlug(slug);
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, ship });
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const ships = await this.ShipService.getAllShips();
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, ships });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const createShip = await this.ShipService.createShip(req.body, req.files);
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Tạo thông tin du thuyền thành công!",
        createShip,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const updateShip = await this.ShipService.updateShip(
        slug,
        req.body,
        req.files
      );
      res
        .status(StatusCodes.OK)
        .json({ statusCode: StatusCodes.OK, updateShip });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const deleteShip = await this.ShipService.deleteShip(slug);
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        deleteShip,
        message: "Xóa thành công!",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ShipController();
