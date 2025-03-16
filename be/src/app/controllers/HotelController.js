const { StatusCodes } = require("http-status-codes");
const HotelService = require("../services/HotelService.js");
class HotelController {
  constructor() {
    this.HotelService = HotelService;
  }

  getCity = async (req, res, next) => {
    try {
      const city = await this.HotelService.getCity();
      res
        .status(StatusCodes.OK)
        .json({ statusCode: StatusCodes.OK, city });
    } catch (error) {
      next(error);
    }
  };

  index = async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const hotel = await this.HotelService.getHotelById(id);
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, hotel });
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const hotel = await this.HotelService.getAllHotel();
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, hotel });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const createHotel = await this.HotelService.createHotel(req.body, req.files);
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        message: "Tạo thông tin khách sạn thành công!",
        createHotel,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateHotel = await this.HotelService.updateHotel(
        id,
        req.body,
        req.files
      );
      res
        .status(StatusCodes.OK)
        .json({ statusCode: StatusCodes.OK, updateHotel });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteHotel = await this.HotelService.deleteHotel(id);
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        deleteHotel,
        message: "Xóa thành công!",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new HotelController();
