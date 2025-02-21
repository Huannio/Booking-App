const AuthService = require("../services/AuthService");
const { StatusCodes } = require("http-status-codes");

class AuthController {
  constructor() {
    this.authService = AuthService;
  }

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await this.authService.login(email, password);
      res.cookie("accessToken", data.accessToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7d
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
        sameSite: "strict",
      });

      res.cookie("refreshToken", data.refreshToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7d
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
        sameSite: "strict",
      });

      res.status(StatusCodes.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req, res, next) => {
    try {
      const data = await this.authService.refreshToken(
        req?.cookies?.refreshToken
      );

      res.cookie("accessToken", data.accessToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7d
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
        sameSite: "strict",
      });

      res.status(StatusCodes.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };

  checkAuth = async (req, res, next) => {
    try {
      const data = await this.authService.checkAuth(req?.cookies?.accessToken);

      res.status(StatusCodes.OK).json({ data });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(StatusCodes.OK).json({ message: "Đăng xuất thành công!" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AuthController();
