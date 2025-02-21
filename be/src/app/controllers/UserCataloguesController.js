const { StatusCodes } = require("http-status-codes");
const UserCataloguesService = require("../services/UserCataloguesService");

class UserCataloguesController {
  constructor() {
    this.userCataloguesService = UserCataloguesService;
  }

  show = async (req, res, next) => {
    try {
      const userCatalogues = await this.userCataloguesService.getAll();
      res.status(StatusCodes.OK).json({ userCatalogues });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserCataloguesController();
