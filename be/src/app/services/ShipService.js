const { Ship } = require("../../models");

class ShipService {
  async getAllShips() {
    try {
      const ships = await Ship.findAll();
      return ships;
    } catch (error) {
      throw new Error("Không thể lấy thông tin du thuyền.");
    }
  }

  async getShipById(id) {
    try {
      const ship = await Ship.findByPk(id);
      if (!ship) throw new Error(`Không thể tìm thấy du thuyền với id ${id}`);
      return ship;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createShip(shipData) {
    try {
      const newShip = await Ship.create(shipData);
      return newShip;
    } catch (error) {
      throw new Error("Không thể tạo mới du thuyền.");
    }
  }

  async updateShip(id, shipData) {
    try {
      const ship = await Ship.findByPk(id);
      if (!ship) throw new Error(`Không tìm thấy du thuyền với id ${id}`);
      await ship.update(shipData);
      return ship;
    } catch (error) {
      throw new Error("Không thể cập nhật du thuyền.");
    }
  }

  async deleteShip(id) {
    try {
      const ship = await Ship.findByPk(id);
      if (!ship) throw new Error(`Không tìm thấy du thuyền với id ${id}`);
      await ship.destroy();
      return ship;
    } catch (error) {
      throw new Error("Không thể xóa du thuyền.");
    }
  }
}

module.exports = new ShipService();
