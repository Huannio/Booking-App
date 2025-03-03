const { Rooms, RoomsFeature, Ships } = require("../../models");
const ApiError = require("../../middleware/ApiError");
const { Op } = require("sequelize");

class RoomService {
  // Tìm kiếm phòng với phân trang
  async search(keyword, offset, limit) {
    try {
      const whereClause = keyword ? { title: { [Op.like]: `%${keyword}%` } } : {};

      const rooms = await Rooms.findAll({
        where: whereClause,
        include: [
          {
            model: Ships,
            as: "ship",
            attributes: ["id", "title"],
          },
        ],
        group: ["Rooms.ship_id"],
        attributes: [
          "ship_id",
          [sequelize.fn("COUNT", sequelize.col("Rooms.id")), "countRoom"],
        ],
        limit: limit,
        offset: offset,
      });

      if (rooms.length === 0) {
        return false;
      }

      return rooms;
    } catch (error) {
      throw error;
    }
  }

  // Lấy danh sách phòng với phân trang
  async pagination(offset, limit) {
    try {
      const rooms = await Rooms.findAll({
        include: [
          {
            model: Ships,
            as: "ship",
            attributes: ["id", "title"],
          },
        ],
        group: ["Rooms.ship_id"],
        attributes: [
          "ship_id",
          [sequelize.fn("COUNT", sequelize.col("Rooms.id")), "countRoom"],
        ],
        order: [["ship_id", "DESC"]],
        limit: limit,
        offset: offset,
      });

      return rooms;
    } catch (error) {
      throw error;
    }
  }

  // Tạo mới một phòng
  async create(data) {
    try {
      const {
        ship_id,
        title,
        size,
        max_persons,
        price,
        sale_prices,
        bed_type,
        view,
        images,
        roomFeatures,
      } = data;

      const newRoom = await Rooms.create({
        ship_id,
        title,
        size,
        max_persons,
        price,
        sale_prices,
        bed_type,
        view,
        images,
        created_at: new Date(),
      });

      if (!newRoom) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Tạo phòng không thành công!");
      }

      const room_id = newRoom.id;

      for (const feature_id of roomFeatures) {
        await RoomsFeature.create({
          room_id,
          feature_id,
        });
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  // Cập nhật thông tin một phòng
  async updateRoom(id, data) {
    try {
      const {
        ship_id,
        title,
        size,
        max_persons,
        price,
        sale_prices,
        images,
        roomFeatures,
      } = data;

      const room = await Rooms.findByPk(id);
      if (!room) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Phòng không tồn tại!");
      }

      const updatedRoom = await room.update({
        ship_id,
        title,
        size,
        max_persons,
        price,
        sale_prices,
        images,
        updated_at: new Date(),
      });

      if (!updatedRoom) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Cập nhật phòng không thành công!");
      }

      await RoomsFeature.destroy({ where: { room_id: id } });

      for (const feature_id of roomFeatures) {
        await RoomsFeature.create({
          room_id: id,
          feature_id,
        });
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  // Xóa một phòng
  async deleteOneRoom(id) {
    try {
      const room = await Rooms.findByPk(id);
      if (!room) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Phòng không tồn tại!");
      }

      await RoomsFeature.destroy({ where: { room_id: id } });
      await room.destroy();

      return true;
    } catch (error) {
      throw error;
    }
  }

  // Xóa tất cả các phòng của một sản phẩm
  async deleteAllRooms(ship_id) {
    try {
      const rooms = await Rooms.findAll({ where: { ship_id } });
      if (rooms.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Không tìm thấy phòng nào!");
      }

      for (const room of rooms) {
        await RoomsFeature.destroy({ where: { room_id: room.id } });
        await room.destroy();
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new RoomService();