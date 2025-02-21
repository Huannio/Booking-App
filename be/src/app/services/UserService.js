const env = require("../../config/environment");
const { StatusCodes } = require("http-status-codes");
const { Users, UserCatalogues } = require("../../models");
const { Op } = require("sequelize");
const ApiError = require("../../middleware/ApiError");

class UserService {
  async getAllUsers() {
    try {
      return await Users.findAll({
        attributes: ["id", "name", "email"],
        include: [{ model: UserCatalogues, as: "user_catalogues", attributes: ["name", "id"] }],
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      return await Users.findOne({
        attributes: ["id", "name", "email"],
        where: { id },
        include: [{ model: UserCatalogues, as: "user_catalogues", attributes: ["name", "id"] }],
      });
    } catch (error) {
      throw error;
    }
  }

  async createUser(data) {
    try {
      const userExists = await Users.findOne({ where: { email: data.email } });
      if (userExists) {
        throw new ApiError(StatusCodes.CONFLICT, "Email đã tồn tại!");
      }

      const userData = {
        ...data,
        password: env.USER_DEFAUT_PASSWORD,
      };

      return await Users.create(userData);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, data) {
    try {
      const user = await this.getUserById(id);

      const { name, email, user_catalogues_id } = data;
      const checkEmail = await Users.findOne({
        where: { email, id: { [Op.ne]: id } },
      });

      if (checkEmail) {
        throw new ApiError(StatusCodes.CONFLICT, "Email đã tồn tại!");
      }

      return await user.update({
        name: name,
        email: email,
        user_catalogues_id: user_catalogues_id,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.getUserById(id);
      return await user.destroy();
    } catch (error) {
      throw error;
    }
>>>>>>> 59fe93010a96daa542b52bfe1827107015e3d16e
  }
}

module.exports = new UserService();
