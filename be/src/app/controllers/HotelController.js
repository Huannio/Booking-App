const { StatusCodes } = require("http-status-codes");
const HotelService = require("../services/HotelService.js");
class HotelController {
  constructor() {
    this.HotelService = HotelService;
  }

  getCity = async (req, res, next) => {
    try {
      const data = await this.HotelService.getCity();
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, data });
    } catch (error) {
      next(error);
    }
  };

  index = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const data = await this.HotelService.getHotelBySlug(slug);
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, data });
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const data = await this.HotelService.getAllHotel();
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, data });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const createHotel = await this.HotelService.createHotel(
        req.body,
        req.files
      );
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
      const updateHotel = await this.HotelService.updateHotel(
        req.params.slug,
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
      const { slug } = req.params;
      const deleteHotel = await this.HotelService.deleteHotel(slug);
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        deleteHotel,
        message: "Xóa thành công!",
      });
    } catch (error) {
      next(error);
    }
  };

  search = async (req, res, next) => {
    try {
      const { title, greaterDefaultPrice, lowerDefaultPrice } = req.query;
      const page = parseInt(req.query.page) || 0;
      const limit = req.query.limit ? parseInt(req.query.limit) : null;
      const offset = page * limit;
      const cityId = req.query.cityId || null;
      const { total, data, totalPages } =
        await this.HotelService.getHotelSearch(
          limit,
          offset,
          cityId,
          title,
          greaterDefaultPrice,
          lowerDefaultPrice
        );
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data,
        total,
        totalPages,
        records: data.length,
      });
    } catch (error) {
      next(error);
    }
  };

  getActive = async (req, res, next) => {
    try {
      const data = await this.HotelService.getActiveHotel();
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, data });
    } catch (error) {
      next(error);
    }
  };

  createDetail = async (req, res, next) => {
    try {
      const { slug } = req.params;

      const createDetail = await this.HotelService.createDetail(
        slug,
        req.body,
        req.files
      );
      res
        .status(StatusCodes.CREATED)
        .json({ statusCode: StatusCodes.CREATED, createDetail });
    } catch (error) {
      next(error);
    }
  }

  updateDetail = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const updateDetail = await this.HotelService.updateDetail(
        slug,
        req.body,
        req.files
      );
      res
        .status(StatusCodes.OK)
        .json({ statusCode: StatusCodes.OK, updateDetail });
    } catch (error) {
      next(error);
    }
  }

  updateFeature = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const updateFeature = await this.HotelService.updateFeature(
        slug,
        req.body
      );
      res
        .status(StatusCodes.OK)
        .json({ statusCode: StatusCodes.OK, updateFeature });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HotelController();
