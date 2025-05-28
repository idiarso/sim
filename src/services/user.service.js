const db = require("../models");
const User = db.User;
const Group = db.Group;
const TeacherProfile = db.TeacherProfile;
const StudentProfile = db.StudentProfile;
const bcrypt = require("bcryptjs");

// Helper function to hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/**
 * Get all users with their roles
 */
const getAllUsers = async () => {
  try {
    return await User.findAll({
      include: [{ model: Group }],
      attributes: { exclude: ["password"] }, // Exclude password hash
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

/**
 * Get a single user by ID with roles
 */
const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Group }],
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    throw error;
  }
};

/**
 * Create a new user
 * Note: This is a basic implementation. Needs role assignment and potentially profile creation.
 */
const createUser = async (userData) => {
  try {
    // Hash the password before saving
    const hashedPassword = await hashPassword(userData.password);
    
    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
      created_on: Math.floor(Date.now() / 1000), // Unix timestamp
      active: userData.active !== undefined ? userData.active : true, // Default to active
    });
    
    // TODO: Assign roles (e.g., based on userData.roleId or similar)
    // await newUser.addGroup(roleId);

    // TODO: Create associated profile (TeacherProfile or StudentProfile) if needed

    // Exclude password from the returned object
    const userJson = newUser.toJSON();
    delete userJson.password;
    return userJson;

  } catch (error) {
    console.error("Error creating user:", error);
    // Handle potential unique constraint errors (username, email)
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error(`User with this ${error.errors[0].path} already exists.`);
    }
    throw error;
  }
};

/**
 * Update an existing user
 */
const updateUser = async (userId, updateData) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Hash password if it's being updated
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

    await user.update(updateData);

    // TODO: Handle role updates if necessary

    const updatedUser = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });
    return updatedUser;

  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new Error(`User with this ${error.errors[0].path} already exists.`);
    }
    throw error;
  }
};

/**
 * Delete a user
 */
const deleteUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // TODO: Consider implications - delete associated profiles? Soft delete?
    await user.destroy();
    return { message: "User deleted successfully" };

  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
