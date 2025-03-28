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
  
  getShipFeatures = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const features = await this.ShipService.getShipFeatures(slug);
      res.status(StatusCodes.OK).json({ 
        statusCode: StatusCodes.OK, 
        features 
      });
    } catch (error) {
      next(error);
    }
  };

  updateFeatures = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { feature_ids } = req.body;
      
      const features = await this.ShipService.updateShipFeatures(slug, feature_ids);
      
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Cập nhật đặc trưng du thuyền thành công!",
        features
      });
    } catch (error) {
      next(error);
    }
  };

  createDetail = async (req, res, next) => {
    try {
      const { slug } = req.params;

      const createDetail = await this.ShipService.createDetail(
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
  };

  updateDetail = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const updateDetail = await this.ShipService.updateDetail(
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
  };

  getFeatureShip = async (req, res, next) => {
    try {
      const { product_id } = req.params;
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

  updateFeature = async (req, res, next) => {
    try {
      const { slug } = req.params;
      const result = await this.ShipService.updateProductFeature(
        slug,
        req.body,
      );
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        message: "Cập nhật thành công!",
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

  search = async (req, res, next) => {
    try {
      const { title, greaterDefaultPrice, lowerDefaultPrice } = req.query;
      const page = parseInt(req.query.page) || 0;
      const limit = req.query.limit ? parseInt(req.query.limit) : null;
      const offset = page * limit;
      const categoryId = parseInt(req.query.categoryId) || null;
      const { total, data, totalPages } = await this.ShipService.getShipSearch(
        limit,
        offset,
        categoryId,
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
      const data = await this.ShipService.getActiveShip();
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, data });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ShipController();
