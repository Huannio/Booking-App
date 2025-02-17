const ShipService = require("../services/ShipService");

class ShipController {
  constructor() {
    this.shipService = ShipService;
  }
  index = async (req, res, next) => {
    try {
      const { id } = req.params;
      const ship = await this.shipService.getShipById(id);
      res.success({ ship });
    } catch (error) {
      next(error);
    }
  };

  show = async (req, res, next) => {
    try {
      const ships = await this.shipService.getAllShips();
      res.success({ ships });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const shipData = req.body;
      const newShip = await this.shipService.createShip(shipData);
      res.success({ ship: newShip, message: "Tạo du thuyền thành công!" });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedShip = await this.shipService.updateShip(id, req.body);
      res.success({
        ship: updatedShip,
        message: "Cập nhật du thuyền thành công!",
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.shipService.deleteShip(id);
      res.success({ ship: result, message: "Xóa du thuyền thành công!" });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ShipController();
