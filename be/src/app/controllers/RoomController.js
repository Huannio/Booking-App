const { StatusCodes } = require("http-status-codes");
const RoomService = require("../services/RoomService");

class RoomController {
  constructor() {
    this.roomService = RoomService;
  }

  index = async (req, res, next) => {
    try {
      console.log(req.params.id);
      const data = await this.roomService.getRoomById(req.params.id);
      res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const data = await this.roomService.getAllRoom(slug);
      return res.status(StatusCodes.OK).json(data);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const data = await this.roomService.createRoom(slug, req.body, req.files);
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
        req.files,
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

  updateFeature = async (req, res, next) => {
    try {
      const data = await this.roomService.updateFeature(req.body, req.params.id);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Cập nhật thành công",
        data,
      })
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new RoomController();
