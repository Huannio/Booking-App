const { Roles } = require("../../models");

class RoleController {
  async show(req, res) {
    try {
      const roles = await Roles.findAll({
        attributes: ["id", "name"],
      });
      res.status(200).json({ roles });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    res.status(201).json({ message: "Vai trò đã được tạo thành công!" });
  }
}

module.exports = new RoleController();
