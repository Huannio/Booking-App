const { StatusCodes } = require("http-status-codes");
const UserPermissionService = require("../services/UserPermissionService");
class UserPermissionController {
  constructor() {
    this.userPermissionService = UserPermissionService;
  }

  index = async (req, res, next) => {
    try {
      const { permissions } = await this.userPermissionService.getPermissionId(
        req.params.id
      );
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data: permissions,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const data = this.userPermissionService.update(req.body);
      return res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        data,
        message: "Cập nhật thành công!",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserPermissionController();
