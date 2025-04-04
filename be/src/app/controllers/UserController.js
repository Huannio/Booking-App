const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/UserService");
class UserController {
  constructor() {
    this.userService = UserService;
  }

  index = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, user });
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, users });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const userData = req.body;
      const createUser = await this.userService.createUser(userData);
      res
        .status(StatusCodes.CREATED)
        .json({ statusCode: StatusCodes.OK, createUser });
    } catch (error) {
      next(error);
    }
  };

  verifyAccount = async (req, res, next) => {
    try {
      const verifyAccount = await this.userService.verifyAccount(req.body);
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        verifyAccount,
        message: "Kích hoạt tài khoản thành công!",
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateUser = await this.userService.updateUser(id, req.body);
      res
        .status(StatusCodes.OK)
        .json({ statusCode: StatusCodes.OK, updateUser });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteUser = await this.userService.deleteUser(id);
      res.status(StatusCodes.OK).json({
        statusCode: StatusCodes.OK,
        deleteUser,
        message: "Xóa thành công!",
      });
    } catch (error) {
      next(error);
    }
  };

  search = async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 0;
      const limit = req.query.limit ? parseInt(req.query.limit) : null;
      const offset = page * limit;

      const { total, data, totalPages } = await this.userService.searchUser(
        req.query,
        limit,
        offset
      );

      res
        .status(StatusCodes.OK)
        .json({
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
}

module.exports = new UserController();
