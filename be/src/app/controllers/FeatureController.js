// const { StatusCodes } = require("http-status-codes");
// const ShipService = require("../services/ShipService");
// class ShipController {
//   constructor() {
//     this.ShipService = ShipService;
//   }

//   index = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const Ship = await this.ShipService.getShipById(id);
//       res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, Ship });
//     } catch (error) {
//       next(error);
//     }
//   };

//   show = async (req, res, next) => {
//     try {
//       const Ships = await this.ShipService.getAllShips();
//       res.status(StatusCodes.OK).json({ statusCode: StatusCodes.OK, Ships });
//     } catch (error) {
//       next(error);
//     }
//   };

//   create = async (req, res, next) => {
//     try {
//       const ShipData = req.body;
//       const createShip = await this.ShipService.createShip(ShipData);
//       res
//         .status(StatusCodes.CREATED)
//         .json({ statusCode: StatusCodes.OK, createShip });
//     } catch (error) {
//       next(error);
//     }
//   };

//   update = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const updateShip = await this.ShipService.updateShip(id, req.body);
//       res
//         .status(StatusCodes.OK)
//         .json({ statusCode: StatusCodes.OK, updateShip });
//     } catch (error) {
//       next(error);
//     }
//   };

//   delete = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const deleteShip = await this.ShipService.deleteShip(id);
//       res
//         .status(StatusCodes.OK)
//         .json({
//           statusCode: StatusCodes.OK,
//           deleteShip,
//           message: "Xóa thành công!",
//         });
//     } catch (error) {
//       next(error);
//     }
//   };
// }

// module.exports = new ShipController();
