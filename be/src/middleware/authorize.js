const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorizeJWT = async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    next({ statusCode: 401, message: "Unauthorized" });
    return;
  }

  try {
    const jwtDecoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.jwtDecoded = jwtDecoded;

    next();
  } catch (error) {
    // Trả về mã 403 (Khi access token hết hạn)
    if (error.message?.includes("jwt expired")) {
      next({ statusCode: 403, message: "Access token has expired" });
    }

    // Trả về mã 401 khi token không hợp lệ
    next({ statusCode: 401, message: "Unauthorized, invalid token" });
  }
};

module.exports = authorizeJWT;
