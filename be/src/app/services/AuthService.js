const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../../config/environment");
const ApiError = require("../../middleware/ApiError");
const { StatusCodes } = require("http-status-codes");
const getPermissionsByUserCatalogueId = require("../../utils/getPermissionsByUserCatalogueId");

class AuthService {
  async me(jwtDecoded) {
    try {
      const permissions = await getPermissionsByUserCatalogueId(
        jwtDecoded.user_catalogues_id
      );

      return {
        user: {
          id: jwtDecoded.id,
          permissions,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Email không tồn tại!");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ApiError(
        StatusCodes.NOT_ACCEPTABLE,
        "Email hoặc mật khẩu không đúng!"
      );
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      user_catalogues_id: user.user_catalogues_id,
    };

    const permissions = await getPermissionsByUserCatalogueId(
      payload.user_catalogues_id
    );

    const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(
      { id: user.id, user_catalogues_id: user.user_catalogues_id },
      env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
      }
    );

    return { accessToken, refreshToken, user: payload, permissions };
  }

  async refreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
      const newToken = jwt.sign(
        {
          id: decoded.id,
          user_catalogues_id: decoded.user_catalogues_id,
        },
        env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
        }
      );

      return { accessToken: newToken };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AuthService();
