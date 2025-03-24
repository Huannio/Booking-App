const { StatusCodes } = require("http-status-codes");
const cloudinary = require("../../config/cloudinary");
const RoomService = require("../services/RoomService");
const uploadToCloudinary = require("../../utils/cloudinary");

class RoomController {
  constructor() {
    this.roomService = RoomService; 
  }

  index = async (req, res, next) => {
    try {
      const data = await this.roomService.getRoomById(req.params.id);
      res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const data = await this.roomService.getAllRoom();
      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.roomService.createRoom(req.body, req.file);
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Tạo phòng thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.roomService.updateRoom(
        req.body,
        req.file,
        req.params.id
      );
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Cập nhật phòng thành công",
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const data = await this.roomService.deleteRoom(req.params.id);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Xóa thành công!",
        data,
      });
    } catch (error) {
      next(error);
    }
  };
  
  getFeature = async (req, res, next) => {
    try {
      const roomFeature = await this.roomService.getFeature();
      return res.status(StatusCodes.OK).json(roomFeature);
    } catch (error) {
      next(error);
    }
  };

}

module.exports = new RoomController();