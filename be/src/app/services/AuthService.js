const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../../config/environment");
const ApiError = require("../../middleware/ApiError");
const { StatusCodes } = require("http-status-codes");

class AuthService {
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

    const accessToken = jwt.sign(payload, env.ACCESS_TOKEN_SECRET, {
      expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ id: user.id }, env.REFRESH_TOKEN_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
    });

    return { accessToken, refreshToken, user: payload };
  }

  async refreshToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET);
      const newToken = jwt.sign(
        {
          id: decoded.id,
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

  async checkAuth(accessToken) {
    if (!accessToken) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Chưa đăng nhập!");
    }

    const decoded = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token!");
    }

    return { user: decoded };
  }
}

module.exports = new AuthService();
