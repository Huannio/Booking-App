const env = require("../../config/environment");
const { StatusCodes } = require("http-status-codes");
const { Users, UserCatalogues } = require("../../models");
const { Op } = require("sequelize");
const ApiError = require("../../middleware/ApiError");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../../config/brevo");

class UserService {
  async getAllUsers() {
    try {
      return await Users.findAll({
        attributes: ["id", "name", "email", "publish"],
        include: [
          {
            model: UserCatalogues,
            as: "user_catalogues",
            attributes: ["name", "id"],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id) {
    try {
      return await Users.findOne({
        attributes: ["id", "name", "email", "publish", "active_token"],
        where: { id },
        include: [
          {
            model: UserCatalogues,
            as: "user_catalogues",
            attributes: ["name", "id"],
          },
        ],
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
        active_token: uuidv4(),
        publish: false,
        password: env.USER_DEFAUT_PASSWORD,
      };

      const createUser = await Users.create(userData);
      const getNewUser = await this.getUserById(createUser.id);

      const verificationLink = `${env.WEBSITE_DOMAIN_DEV}/account/verification?email=${getNewUser.email}&token=${getNewUser.active_token}`;
      const customSubject =
        "Please verify your email before using our services!";
      const htmlContent = `<p>Click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`;

      await sendEmail(getNewUser.email, customSubject, htmlContent);

      return createUser;
    } catch (error) {
      throw error;
    }
  }

  async verifyAccount(reqBody) {
    try {
      const userExists = await Users.findOne({
        where: { email: reqBody.email },
      });

      console.log("userExists", userExists);

      if (!userExists) {
        throw new ApiError(StatusCodes.CONFLICT, "Tài khoản chưa tồn tại!");
      }

      if (userExists.publish) {
        throw new ApiError(
          StatusCodes.NOT_ACCEPTABLE,
          "Tài khoản đã được kích hoạt!"
        );
      }

      if (reqBody.token !== userExists.active_token) {
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Token không hợp lệ!");
      }

      const updateData = {
        publish: true,
        active_token: null,
      };

      return await userExists.update(updateData);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id, data) {
    try {
      const user = await this.getUserById(id);

      const { name, email, user_catalogues_id, publish } = data;
      const checkEmail = await Users.findOne({
        where: { email, id: { [Op.ne]: id } },
      });

      if (checkEmail) {
        throw new ApiError(StatusCodes.CONFLICT, "Email đã tồn tại!");
      }

      return await user.update({
        name,
        email,
        user_catalogues_id,
        publish,
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
  }

  async searchUser(reqQuery, limit, offset) {
    try {
      const { email } = reqQuery;
      const where = {
        email: {
          [Op.like]: `%${email}%`,
        },
      };

      const total = await Users.count({ where });

      const users = await Users.findAndCountAll({
        limit,
        offset,
        attributes: ["id", "email", "name"],
        where,
        include: [
          {
            model: UserCatalogues,
            as: "user_catalogues",
            attributes: ["name", "id"],
          },
        ],
      });

      return {
        total: total,
        data: users.rows,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
