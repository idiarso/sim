const express = require("express");
const authController = require("../controllers/auth.controller");
const { expressjwt: jwt } = require("express-jwt");

const router = express.Router();

// JWT middleware configuration (applied in server.js, but needed for reference)
const jwtMiddleware = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
});

// POST /api/v1/auth/login - User login
router.post("/login", authController.login);

// GET /api/v1/auth/profile - Get current user profile (requires token)
// The JWT middleware in server.js protects this route implicitly
router.get("/profile", authController.getProfile);

// POST /api/v1/auth/logout - User logout (client-side token removal)
router.post("/logout", authController.logout);

// Add other auth routes if needed (e.g., refresh token)

module.exports = router;
