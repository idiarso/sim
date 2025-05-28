const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

// GET /api/v1/users - Get all users
router.get("/", userController.getAllUsers);

// GET /api/v1/users/:id - Get a single user by ID
router.get("/:id", userController.getUserById);

// POST /api/v1/users - Create a new user
router.post("/", userController.createUser);

// PUT /api/v1/users/:id - Update an existing user
router.put("/:id", userController.updateUser);

// DELETE /api/v1/users/:id - Delete a user
router.delete("/:id", userController.deleteUser);

module.exports = router;
