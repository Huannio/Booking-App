const { Features, FeatureTypes } = require("../../models");
const uploadToCloudinary = require("../../utils/cloudinary");

class FeatureService {
  async getAllFeature() {
    try {
      return await Features.findAll({
        attributes: ["id", "icon", "text", "type"],
        include: [
          { model: FeatureTypes, as: "types", attributes: ["name", "id"] },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async getFeatureById(id) {
    try {
      return await Features.findOne({
        where: { id },
        attributes: ["id", "icon", "text", "type"],
        where: { id },
        include: [
          { model: FeatureTypes, as: "types", attributes: ["name", "id"] },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async createFeature(reqBody, reqFile) {
    try {
      const { text, type } = reqBody;
      const data = {
        text,
        type,
      };
      if (reqFile) {
        const uploadImage = await uploadToCloudinary(reqFile.buffer, "icon");
        data.icon = uploadImage.url;
      }

      return await Features.create(data);
    } catch (error) {
      throw error;
    }
  }

  async updateFeature(reqBody, reqFile, id) {
    try {
      const { text, type } = reqBody;
      const data = {
        text,
        type,
      };
      if (reqFile) {
        const uploadImage = await uploadToCloudinary(reqFile.buffer, "icon");
        data.icon = uploadImage.url;
      }

      return await Features.update(data, { where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async deleteFeature(id) {
    try {
      return await Features.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async getTypes() {
    try {
      return await FeatureTypes.findAll({
        attributes: ["id", "name"],
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new FeatureService();
