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
      res
        .status(StatusCodes.OK)
        .json({
          statusCode: StatusCodes.OK,
          deleteUser,
          message: "Xóa thành công!",
        });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserController();
