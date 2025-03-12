const { StatusCodes } = require("http-status-codes");
const UserCataloguesService = require("../services/UserCataloguesService");

class UserCataloguesController {
  constructor() {
    this.userCataloguesService = UserCataloguesService;
  }

  index = async (req, res, next) => {
    try {
      const userCatalogue =
        await this.userCataloguesService.getUserCatalogueById(req.params.id);
      res.status(StatusCodes.OK).json({ userCatalogue });
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const userCatalogues = await this.userCataloguesService.getAll();
      res.status(StatusCodes.OK).json({ userCatalogues });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const userCatalogues = await this.userCataloguesService.create(req.body);
      res
        .status(StatusCodes.CREATED)
        .json({
          statusCode: StatusCodes.CREATED,
          userCatalogues,
          message: "Tạo thành công!",
        });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const update = await this.userCataloguesService.update(
        req.params.id,
        req.body
      );
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        update,
        message: "Cập nhật thành công!",
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const deleted = await this.userCataloguesService.delete(req.params.id);
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        deleted,
        message: "Xóa thành công!",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserCataloguesController();
