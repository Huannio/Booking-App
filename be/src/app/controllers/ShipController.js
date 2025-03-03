const { StatusCodes } = require("http-status-codes");
const ShipService = require("../services/ShipService");

class ShipController {
  constructor() {
    this.shipService = ShipService; // Sử dụng biến viết thường để tuân thủ quy ước
  }

  // Lấy thông tin một du thuyền cụ thể
  index = async (req, res, next) => {
    try {
      const { id } = req.params;
      const ship = await this.shipService.getShipById(id);
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, ship });
    } catch (error) {
      next(error);
    }
  };

  // Lấy danh sách tất cả các du thuyền
  show = async (req, res, next) => {
    try {
      const { page = 1, limit = 5, keyword = '' } = req.query;
      const offset = (page - 1) * limit;

      const ships = await this.shipService.getAllShips(offset, limit, keyword);
      const totalShips = await this.shipService.countAllShips(keyword);
      const totalPages = Math.ceil(totalShips / limit);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        ships,
        totalShips,
        totalPages,
        currentPage: parseInt(page),
      });
    } catch (error) {
      next(error);
    }
  };

  // Tạo mới một du thuyền
  create = async (req, res, next) => {
    try {
      const shipData = req.body;

      // Xử lý file upload nếu có
      if (req.file) {
        shipData.thumbnail = `/uploads/${req.file.filename}`;
      }

      const newShip = await this.shipService.createShip(shipData);

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED, // Sửa thành CREATED để phản ánh đúng mã trạng thái
        newShip,
      });
    } catch (error) {
      next(error);
    }
  };

  // Cập nhật thông tin một du thuyền
  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedShip = await this.shipService.updateShip(id, updateData);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        updatedShip,
      });
    } catch (error) {
      next(error);
    }
  };

  // Xóa một du thuyền
  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteResult = await this.shipService.deleteShip(id);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        deleteResult,
        message: "Xóa thành công!",
      });
    } catch (error) {
      next(error);
    }
  };

  // Cập nhật tính năng của du thuyền
  updateFeatures = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { features } = req.body;

      const updateResult = await this.shipService.updateShipFeatures(id, features);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        updateResult,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ShipController();