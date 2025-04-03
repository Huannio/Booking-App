const { Rooms, Products, Features, RoomFeatures } = require("../../models");
const uploadToCloudinary = require("../../utils/cloudinary");

class RoomService {
  async getAllRoom(slugProduct) {
    try {
      let where = {};
      if (slugProduct) {
        where = { slug: slugProduct };
      }
      return await Products.findOne({
        where,
        attributes: [],
        include: [
          {
            model: Rooms,
            as: "rooms",
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async getRoomById(id) {
    try {
      return await Rooms.findOne({
        where: { id },
        include: [
          {
            model: Features,
            as: "features",
            attributes: ["id", "text", "icon"],
            through: { attributes: [] },
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async createRoom(slug, reqBody, reqFiles) {
    try {
      const {
        title,
        default_price,
        bed_type,
        max_persons,
        sale_prices,
        view,
        size,
      } = reqBody;

      const productId = await Products.findOne({
        where: { slug },
        attributes: ["id"],
      });

      let imageUrl = [];
      if (reqFiles) {
        const uploadImages = await Promise.all(
          reqFiles?.map((file) => uploadToCloudinary(file.buffer, "default"))
        );
        imageUrl = uploadImages.map((image) => image.secure_url);
      }

      const data = {
        title,
        default_price,
        bed_type,
        max_persons,
        sale_prices,
        view,
        images: imageUrl.join(","),
        product_id: productId.id,
        size,
      };

      return await Rooms.create(data);
    } catch (error) {
      throw error;
    }
  }

  async updateRoom(reqBody, reqFiles, id) {
    try {
      const {
        title,
        default_price,
        bed_type,
        max_persons,
        sale_prices,
        view,
        images: existingImages,
        size,
      } = reqBody;

      let imageUrl = [];

      if (reqFiles.length > 0) {
        const uploadImages = await Promise.all(
          reqFiles?.map((file) => uploadToCloudinary(file.buffer, "default"))
        );
        imageUrl = uploadImages.map((image) => image.secure_url);
      }

      if (existingImages) {
        imageUrl.push(
          ...(Array.isArray(existingImages)
            ? existingImages
            : existingImages.split(","))
        );
      }

      const data = {
        title,
        default_price,
        bed_type,
        max_persons,
        sale_prices,
        view,
        size,
        images: imageUrl.join(","),
      };

      return await Rooms.update(data, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async deleteRoom(id) {
    try {
      return await Rooms.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async updateFeature(reqBody, id) {
    try {
      const { selectedFeatures } = reqBody;
      if (selectedFeatures.length === 0) {
        return await RoomFeatures.destroy({ where: { room_id: id } });
      }

      if (selectedFeatures.length > 0) {
        const data = selectedFeatures.map((feature) => ({
          room_id: id,
          feature_id: feature,
        }));

        await RoomFeatures.destroy({ where: { room_id: id } });
        return await RoomFeatures.bulkCreate(data);
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new RoomService();
