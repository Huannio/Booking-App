const express = require("express");
const router = express.Router();
const AuthController = require("../app/controllers/AuthController");
const AuthValidation = require("../validations/AuthValidation");
const authorizeJWT = require("../middleware/authorize");

// POST /auth/login
router.post("/login", AuthValidation.login, AuthController.login);
// GET /auth/check-auth
router.get("/check-auth", authorizeJWT, AuthController.checkAuth);

// POST /auth/logout
router.post("/logout", authorizeJWT, AuthController.logout);

// POST /auth/refresh-token
router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
