require("dotenv").config();

const { Users, Roles } = require("../../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

class UserService {
  async getAllUsers() {
    const users = await Users.findAll({
      attributes: ["id", "name", "email", "role_id"],
      include: [{ model: Roles, as: "roles", attributes: ["name"] }],
    });

    if (!users)
      throw {
        statusCode: 404,
        message: "Không tìm thấy người dùng!",
      };

    return users;
  }

  async getUserById(id) {
    const user = await Users.findOne({
      attributes: ["id", "name", "email"],
      where: { id },
      include: [{ model: Roles, as: "roles", attributes: ["name", "id"] }],
    });
    if (!user)
      throw {
        statusCode: 404,
        message: "Không tìm thấy người dùng!",
      };
    return user;
  }

  async createUser(data) {
    const { name, email, role_id } = data;

    if (!name || !email || !role_id) {
      throw {
        statusCode: 400,
        message: "Vui lòng nhập đủ thông tin!",
      };
    }

    const userExists = await Users.findOne({ where: { email } });
    if (userExists) {
      throw {
        statusCode: 400,
        message: "Email đã tồn tại!",
      };
    }

    const roleExists = await Roles.findByPk(role_id);
    if (!roleExists) {
      throw {
        statusCode: 400,
        message: "Vai trò không tồn tại!",
      };
    }

    const defaultPassword = "admin";
    const password = await bcrypt.hash(defaultPassword, saltRounds);

    const user = await Users.create({
      name,
      email,
      role_id,
      password,
    });

    if (!user) {
      throw {
        statusCode: 400,
        message: "Có lỗi xảy ra, vui lòng thử lại sau!",
      };
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role_id: user.role_id,
    };
  }

  async searchUser(keyword) {
    const users = await Users.findAll({
      attributes: ["id", "name", "email", "role_id"],
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${keyword}%` } },
          { email: { [Op.like]: `%${keyword}%` } },
        ],
      },
      include: [{ model: Roles, as: "roles", attributes: ["name"] }],
    });

    if (!users)
      throw {
        statusCode: 404,
        message: "Không tìm thấy người dùng!",
      };

    return users;
  }
  
  async updateUser(id, data) {
    const user = await this.getUserById(id);

    const { name, email, role_id } = data;
    const checkEmail = await Users.findOne({
      where: { email, id: { [Op.ne]: id } },
    });

    if (checkEmail) {
      throw {
        statusCode: 400,
        message: "Email đã tồn tại!",
      };
    }

    const roleExists = await Roles.findByPk(role_id);
    if (!roleExists) {
      throw {
        statusCode: 400,
        message: "Vai trò không tồn tại!",
      };
    }

    const updateUser = await user.update({
      name: name,
      email: email,
      role_id: role_id,
    });

    if (!updateUser) {
      throw {
        statusCode: 400,
        message: "Có lỗi xảy ra, vui lòng thử lại sau!",
      };
    }

    return {
      id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      role_id: updateUser.role_id,
    };
  }

  async deleteUser(id) {
    const user = await this.getUserById(id);
    const deletedUser = await user.destroy();
    if (!deletedUser) {
      throw {
        statusCode: 404,
        message: "Có lỗi!",
      };
    }
    return deletedUser;
  }
}

module.exports = new UserService();
