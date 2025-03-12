const { StatusCodes } = require("http-status-codes");
const PermissionManagementService = require("../services/PermissionManagementService");
class PermissionManagementController {
  constructor() {
    this.permissionManagementService = PermissionManagementService;
  }

  index = async (req, res, next) => {
    try {
      const data = await this.permissionManagementService.getOnePermission(
        req.params.id
      );
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, data });
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const data = await this.permissionManagementService.getAllPermission();
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, data });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await this.permissionManagementService.create(
        req.body,
        req.params.id
      );
      res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data,
        message: "Tạo quyền thành công!",
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const data = await this.permissionManagementService.update(
        req.body,
        req.params.id
      );
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data,
        message: "Cập nhật quyền thành công!",
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const data = await this.permissionManagementService.delete(req.params.id);
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data,
        message: "Xóa quyền thành công!",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllUserCataloguePermission = async (req, res, next) => {
    try {
      const data =
        await this.permissionManagementService.getAllUserCataloguePermission();
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, data });
    } catch (error) {
      next(error);
    }
  };

  getPermissionsByUserCatalogueId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data =
        await this.permissionManagementService.getPermissionsByUserCatalogueId(
          id
        );
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, data });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new PermissionManagementController();
