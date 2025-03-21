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
  
  getFeatureShip = async (req, res, next) => {
    try {
      const { product_id  } = req.params; 
      const feature = await this.ShipService.getFeatureShip(
        product_id,
        req.body,
        req.files
       );
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, feature });
    } catch (error) {
      next(error);
    }
  };

  createFeature = async (req, res, next) => {
    try {
      const { product_id, feature_id } = req.body;
      const result = await this.ShipService.addFeatureToProduct(product_id, feature_id);
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Thêm đặc trưng cho sản phẩm thành công!",
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  updateFeature = async (req, res, next) => {
    try {
      const { product_id, feature_id } = req.params;
      const result = await this.ShipService.removeFeatureFromProduct(product_id, feature_id);
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Xóa đặc trưng khỏi sản phẩm thành công!",
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  index = async (req, res, next) => {
    try {
      const { slug } = req.params;
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
