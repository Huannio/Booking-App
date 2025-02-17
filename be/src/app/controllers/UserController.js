const UserService = require("../services/UserService");

class UserController {
  constructor() {
    this.userService = UserService;
  }

  index = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.userService.getUserById(id);
      res.success({ data });
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.success({ users });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const userData = req.body;
      const newUser = await this.userService.createUser(userData);
      res.success({ user: newUser, message: "Tạo người dùng thành công!" });
    } catch (error) {
      next(error);
    }
  };

  search = async (req, res, next) => {
    try {
      const { q } = req.query;
      const users = await this.userService.searchUser(q);
      res.success({ users, message: "Tìm kiếm thành công!" });
    } catch (error) {
      next(error);
    }
  };
  
  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateUser = await this.userService.updateUser(id, req.body);
      res.success({
        user: updateUser,
        message: "Cập nhật người dùng thành công!",
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.userService.deleteUser(id);
      res.success({ user: result, message: "Xóa người dùng thành công!" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserController();
