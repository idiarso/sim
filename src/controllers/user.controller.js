const userService = require("../services/user.service");

/**
 * Get all users
 */
const getAllUsers = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., only admins)
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get a single user by ID
 */
const getUserById = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., admin or self)
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Create a new user
 */
const createUser = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., only admins)
    // TODO: Add input validation (e.g., using express-validator)
    const newUser = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    if (error.message.includes("already exists")) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update an existing user
 */
const updateUser = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., admin or self)
    // TODO: Add input validation
    const userId = req.params.id;
    const updatedUser = await userService.updateUser(userId, req.body);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message.includes("already exists")) {
        return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete a user
 */
const deleteUser = async (req, res) => {
  try {
    // TODO: Add authorization check (e.g., only admins)
    const userId = req.params.id;
    const result = await userService.deleteUser(userId);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
