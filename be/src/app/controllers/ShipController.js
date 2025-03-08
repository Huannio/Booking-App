const { StatusCodes } = require("http-status-codes");
const cloudinary = require("../../config/cloudinary");
const ShipService = require("../services/ShipService");
const uploadToCloudinary = require("../../utils/cloudinary");

class ShipController {
  constructor() {
    this.shipService = ShipService; 
  }

  index = async (req, res, next) => {
    try {
      const data = await this.shipService.getShipById(req.params.id);
      res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const data = await this.shipService.getAllShip();
      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.shipService.createShip(req.body, req.file);
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Tạo du thuyền mới thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.shipService.updateShip(
        req.body,
        req.file,
        req.params.id
      );
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Cập nhật du thuyền thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const data = await this.shipService.deleteShip(req.params.id);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Xóa thành công!",
        data,
      });
    } catch (error) {
      next(error);
    }
  };
  
  getTypes = async (req, res, next) => {
    try {
      const shipTypes = await this.shipService.getTypes();
      return res.status(StatusCodes.OK).json(shipTypes);
    } catch (error) {
      next(error);
    }
  };

  // updateFeatures = async (req, res, next) => {
  //   try {
  //     const updateFeatures = await this.shipService.updateFeatures(
  //       req.body,
  //       req.files
  //     );
  //     return res.status(StatusCodes.OK).json({
  //       statusCode: StatusCodes.OK,
  //       message: "Cập nhật chức năng thành công",
  //       updateFeatures,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

module.exports = new ShipController();