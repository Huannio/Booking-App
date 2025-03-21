const { StatusCodes } = require("http-status-codes");
const {
  Products,
  Hotel,
  Cities,
  Rooms,
} = require("../../models");
const { Op } = require("sequelize");
const ApiError = require("../../middleware/ApiError");
const slugify = require("../../utils/slugify");
const uploadToCloudinary = require("../../utils/cloudinary");

class HotelService {
  async getAllHotel() {
    try {
      return await Hotel.findAll({
        attributes: ["id", "admin", "city_id"],
        include: [
          { model: Cities, as: "cities", attributes: ["name", "id"] },
          { model: Products, as: "product", attributes: ["id", "title", "slug", "thumbnail", "default_price", "num_reviews", "score_reviews"] },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async getHotelById(id) {
    try {
      const hotel = await Hotel.findOne({
        attributes: ["id", "admin", "city_id"],
        where: { id },
        include: [
          { 
            model: Cities, 
            as: "cities", 
            attributes: ["name", "id"] 
          },
          { 
            model: Products, 
            as: "product", 
            attributes: ["id", "title", "slug", "thumbnail", "default_price", "num_reviews", "score_reviews"] 
          },
        ],
      });


      const totalRooms = await Rooms.count({
        where: { product_id: hotel.product.id },
      });

      hotel.dataValues.totalRooms = totalRooms;

      return hotel;
    } catch (error) {
      throw error;
    }
  }

  async getCity() {
    try {
      return await Cities.findAll({
        attributes: ["id", "name", "image"],
      });
    } catch (error) {
      throw error;
    }
  }

  async createHotel(reqBody, reqFiles) {
    try {
      const {
        title,
        address,
        cities,
        default_price,
        map_iframe_link,
        map_link,
        admin,
      } = reqBody;

      const checkHotel = await Products.findOne({
        where: { slug: slugify(title) },
      });
      if (checkHotel) {
        throw new ApiError(StatusCodes.CONFLICT, "Tên Khách sạn đã tồn tại!");
      }

      let imageLinkList = [];
      let thumbnailLink = null;
      const slug = slugify(title);
      if (reqFiles) {
        const thumbnail = await uploadToCloudinary(
          reqFiles.thumbnail[0].buffer,
          "thumbnail"
        );
        thumbnailLink = thumbnail.url;
        imageLinkList = await Promise.all(
          reqFiles.images.map(async (image) => {
            const uploadedImage = await uploadToCloudinary(image.buffer, slug);
            return uploadedImage.url;
          })
        );
      }

      const product = await Products.create({
        title,
        address,
        map_link,
        map_iframe_link,
        default_price,
        thumbnail: thumbnailLink,
        images: imageLinkList.join(","),
        type_product_id: 2,
        slug,
        active: true,
      });

      const hotel = await Hotel.create({
        id: product.id,
        city_id: cities,
        admin,
      });

      return {
        product,
        hotel,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateHotel(id, reqBody, reqFiles) {
    try {
      const {
        title,
        address,
        cities,
        default_price,
        map_iframe_link,
        map_link,
        admin,
        images,
        thumbnail,
      } = reqBody;
      const slug = slugify(title);
      const checkHotel = await Products.findOne({
        where: { slug, id: { [Op.ne]: id } },
      });

      if (checkHotel) {
        throw new ApiError(StatusCodes.CONFLICT, "Tên Khách sạn đã tồn tại!");
      }

      let imageLinkList = [];
      let thumbnailLink = null;
      if (reqFiles) {
        if (reqFiles.thumbnail) {
          const thumbnail = await uploadToCloudinary(
            reqFiles.thumbnail[0].buffer
          );
          thumbnailLink = thumbnail.url;
        }

        if (reqFiles.images) {
          imageLinkList = await Promise.all(
            reqFiles.images.map(async (image) => {
              const uploadedImage = await uploadToCloudinary(image.buffer);
              return uploadedImage.url;
            })
          );
        }
      }

      if (images && imageLinkList.length > 0) {
        imageLinkList.push(...images.split(","));
        imageLinkList = imageLinkList.join(",");
      }

      if (!images && imageLinkList.length > 0) {
        imageLinkList = imageLinkList.join(",");
      }

      if (images && imageLinkList.length === 0) {
        imageLinkList = images;
        imageLinkList = imageLinkList.join(",");
      }

      if (thumbnail) {
        thumbnailLink = thumbnail;
      }

      const product = await Products.update(
        {
          title,
          address,
          map_link,
          map_iframe_link,
          default_price,
          thumbnail: thumbnailLink,
          images: imageLinkList,
          type_product_id: 2,
          slug: slugify(title),
          active: true,
        },
        { where: { id } }
      );

      const hotel = await Hotel.update(
        {
          city_id: cities,
          admin,
        },
        {
          where: { id }, // Sửa từ `ship.id` thành `id`
        }
      );

      return {
        product,
        hotel,
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteHotel(id) {
    try {
      return await Products.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new HotelService();