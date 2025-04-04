const env = require("../../config/environment");
const { StatusCodes } = require("http-status-codes");
const {
  Booking,
  BookingRooms,
  BookingCustomers,
  Customers,
  Rooms,
} = require("../../models");
const { Op } = require("sequelize");
const ApiError = require("../../middleware/ApiError");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../../config/brevo");

class OrderService {
  async getOne(id) {
    try {
      return await Booking.findOne({
        where: { id },
        include: [
          {
            model: BookingRooms,
            as: "bookingRooms",
            include: [
              {
                model: Rooms,
                as: "room",
              },
            ],
          },
          {
            model: BookingCustomers,
            as: "bookingCustomers",
            include: [
              {
                model: Customers,
                as: "customer",
              },
            ],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return await Booking.findAll({
        include: [
          {
            model: BookingRooms,
            as: "bookingRooms",
            include: [
              {
                model: Rooms,
                as: "room",
              },
            ],
          },
          {
            model: BookingCustomers,
            as: "bookingCustomers",
            include: [
              {
                model: Customers,
                as: "customer",
              },
            ],
          },
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async order(reqBody) {
    try {
      const {
        total_price,
        checkin_date,
        guests_number,
        name,
        phone_number,
        email,
        request,
        rooms,
      } = reqBody;

      const dataCustomer = {
        name,
        phone_number,
        email,
      };

      const dataBooking = {
        total_price,
        checkin_date,
        guests_number,
        request,
        code: uuidv4(),
      };

      const createCustomer = await Customers.create(dataCustomer);
      const createBooking = await Booking.create(dataBooking);

      const customerId = createCustomer.id;
      const bookingId = createBooking.id;

      await BookingCustomers.create({
        customer_id: customerId,
        booking_id: bookingId,
      });

      const dataBookingRooms = rooms.map((room) => {
        return {
          room_id: room.id,
          quantity: room.quantity,
          booking_id: bookingId,
        };
      });

      await BookingRooms.bulkCreate(dataBookingRooms);

      const customSubject = "Xác nhận đặt phòng thành công!";
      const htmlContent = `
      <p>Kính gửi quý khách <strong>${name}</strong>,</p>
    <p>Cảm ơn quý khách đã đặt phòng. Chúng tôi sẽ liên hệ với quý khách trong thời gian sớm nhất để xác nhận lại thông tin và thanh toán.</p>
    <br>
    <p>Trân trọng,</p>
    <p><strong>Công ty TNHH Du lịch và Dịch vụ Mixivivu</strong></p>
    <p>Số nhà 25, Ngõ 38 Phố Yên Lãng, Phường Láng Hạ, Quận Đống Đa, Hà Nội</p>
    <p>Hotline 1: 0922222016</p>
    <p>Hotline 2: 0812 505 505</p>
    <p>Email: <a href="mailto:info@mixivivu.com">info@mixivivu.com</a></p>
      `;

      await sendEmail(email, customSubject, htmlContent);

      return;
    } catch (error) {
      throw error;
    }
  }

  async update(reqBody, bookingId) {
    try {
      const {
        customerId,
        total_price,
        checkin_date,
        guests_number,
        name,
        phone_number,
        email,
        request,
        status,
        rooms,
      } = reqBody;

      const dataCustomer = {
        name,
        phone_number,
        email,
      };

      const dataBooking = {
        total_price,
        checkin_date,
        guests_number,
        request,
        status,
      };

      await Booking.update(dataBooking, {
        where: {
          id: bookingId,
        },
      });

      await Customers.update(dataCustomer, {
        where: {
          id: customerId,
        },
      });

      const dataBookingRooms = rooms.map((room) => {
        return {
          room_id: room.id,
          quantity: room.quantity,
          booking_id: bookingId,
        };
      });

      await Promise.all(
        dataBookingRooms.map((room) =>
          BookingRooms.destroy({
            where: {
              booking_id: bookingId,
              room_id: room.room_id,
            },
          })
        )
      );

      await BookingRooms.bulkCreate(dataBookingRooms);

      return;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new OrderService();
