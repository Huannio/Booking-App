const { StatusCodes } = require("http-status-codes");
const RoomService = require("../services/RoomService");
const ApiError = require("../../middleware/ApiError");

class RoomController {
  constructor() {
    this.roomService = RoomService;
  }

  // Tìm kiếm phòng với phân trang
  search = async (req, res, next) => {
    try {
      const { page = 1, limit = 5, keyword = "" } = req.query;
      const offset = (page - 1) * limit;

      const { rooms, totalRecords } = await this.roomService.searchRooms(
        keyword,
        offset,
        limit
      );

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        rooms,
        totalRecords,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalRecords / limit),
      });
    } catch (error) {
      next(error);
    }
  };

  // Lấy danh sách tất cả các phòng
  index = async (req, res, next) => {
    try {
      const { page = 1, limit = 5 } = req.query;
      const offset = (page - 1) * limit;

      const { rooms, totalRecords } = await this.roomService.getAllRooms(
        offset,
        limit
      );

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        rooms,
        totalRecords,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalRecords / limit),
      });
    } catch (error) {
      next(error);
    }
  };

  // Tạo mới một phòng
  create = async (req, res, next) => {
    try {
      const {
        ship_id,
        title,
        size,
        max_persons,
        price,
        sale_prices,
        bed_type,
        view,
      } = req.body;

      const newRoom = await this.roomService.createRoom({
        ship_id,
        title,
        size,
        max_persons,
        price,
        sale_prices,
        bed_type,
        view,
      });

      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Tạo phòng thành công!",
        room: newRoom,
      });
    } catch (error) {
      next(error);
    }
  };

  // Cập nhật thông tin một phòng
  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const {
        ship_id,
        title,
        size,
        max_persons,
        price,
        sale_prices,
        bed_type,
        view,
      } = req.body;

      const updatedRoom = await this.roomService.updateRoom(id, {
        ship_id,
        title,
        size,
        max_persons,
        price,
        sale_prices,
        bed_type,
        view,
      });

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Cập nhật phòng thành công!",
        room: updatedRoom,
      });
    } catch (error) {
      next(error);
    }
  };

  // Xóa một phòng
  deleteRoomDetails = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.roomService.deleteOneRoom(id);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Xóa phòng thành công!",
      });
    } catch (error) {
      next(error);
    }
  };

  // Xóa tất cả các phòng của một sản phẩm
  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.roomService.deleteAllRooms(id);

      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Xóa tất cả các phòng thành công!",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new RoomController();