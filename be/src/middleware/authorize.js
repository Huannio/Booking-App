const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const env = require("../config/environment");
const authorizeJWT = async (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) {
    next({ statusCode: StatusCodes.UNAUTHORIZED, message: "Unauthorized" });
    return;
  }

  try {
    const jwtDecoded = await jwt.verify(token, env.ACCESS_TOKEN_SECRET);
    req.jwtDecoded = jwtDecoded;

    next();
  } catch (error) {
    // Trả về mã 403 (Khi access token hết hạn)
    if (error.message?.includes("jwt expired")) {
      next({
        statusCode: StatusCodes.FORBIDDEN,
        message: "Access token has expired",
      });
    }

    // Trả về mã 401 khi token không hợp lệ
    next({
      statusCode: StatusCodes.UNAUTHORIZED,
      message: "Unauthorized, invalid token",
    });
  }
};

module.exports = authorizeJWT;
