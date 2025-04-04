const express = require("express");
const router = express.Router();
const OrderController = require("../app/controllers/OrderController");
const authorizeJWT = require("../middleware/authorize");

// GET /orders
router.get("/show", authorizeJWT, OrderController.show);

// PUT /orders/update/:id
router.put("/update/:id", authorizeJWT, OrderController.update);

// GET /orders/:id
router.get("/:id", authorizeJWT, OrderController.index);

// POST /orders
router.post("/", OrderController.order);

module.exports = router;
