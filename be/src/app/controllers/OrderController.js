const { StatusCodes } = require("http-status-codes");
const OrderService = require("../services/OrderService");
class OrderController {
  constructor() {
    this.orderService = OrderService;
  }

  index = async (req, res, next) => {
    try {
      const data = await this.orderService.getOne(req.params.id);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const data = await this.orderService.getAll();
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  order = async (req, res, next) => {
    try {
      await this.orderService.order(req.body);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Đặt phòng thành công",
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      await this.orderService.update(req.body, req.params.id);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Cập nhật thành công",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new OrderController();
