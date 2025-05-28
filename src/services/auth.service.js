const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ 
      where: { username: username },
      include: [{ model: db.Group }] // Include associated groups
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Compare password
    // Note: The original PHP code uses Ion Auth, which might have different hashing. 
    // Assuming standard bcrypt hashing for the Node.js version.
    // If migrating existing users, passwords need to be re-hashed or a compatibility layer added.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // Check if user is active
    if (!user.active) {
      throw new Error("User account is inactive");
    }

    // Update last login time (Unix timestamp)
    user.last_login = Math.floor(Date.now() / 1000);
    await user.save();

    // Generate JWT token
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.Groups ? user.Groups.map(group => group.name) : [] // Extract role names
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    });

    return { token, user: payload };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// Add other auth-related services if needed (e.g., register, forgot password)

module.exports = {
  loginUser,
};
