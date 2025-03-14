const express = require("express");
const router = express.Router();
const AuthController = require("../app/controllers/AuthController");
const AuthValidation = require("../validations/AuthValidation");
const authorizeJWT = require("../middleware/authorize");

// GET /auth/me
router.get("/me", authorizeJWT, AuthController.me);

// POST /auth/login
router.post("/login", AuthValidation.login, AuthController.login);

// POST /auth/logout
router.post("/logout", AuthController.logout);

// POST /auth/refresh-token
router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
