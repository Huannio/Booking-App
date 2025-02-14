const { Users } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
class AuthService {
  async login(email, password) {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      throw { statusCode: 404, message: "Không tìm thấy người dùng!" };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw { statusCode: 401, message: "Mật khẩu không chính xác!" };
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role_id: user.role_id,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      }
    );

    return { accessToken, refreshToken, user: payload };
  }

  async refreshToken(refreshToken) {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded) {
      throw {
        statusCode: 401,
        message: "Invalid refresh token! Please log in again.",
      };
    }

    const newToken = jwt.sign(
      {
        id: decoded.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      }
    );

    return { accessToken: newToken };
  }

  async checkAuth(accessToken) {
    if (!accessToken) {
      throw {
        statusCode: 401,
        message: "Chưa đăng nhập!",
      };
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) {
      throw {
        statusCode: 401,
        message: "Token không hợp lệ!",
      };
    }

    return { user: decoded };
  }
}

module.exports = new AuthService();
