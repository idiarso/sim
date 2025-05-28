const authService = require('../services/auth.service');
const passport = require('passport');

/**
 * Handle user login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username and password are required' 
      });
    }
    
    const result = await authService.loginUser(username, password);
    
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    console.error('Login controller error:', error);
    return res.status(401).json({
      success: false,
      message: error.message || 'Authentication failed'
    });
  }
};

/**
 * Get current user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getProfile = (req, res) => {
  // The user data is already attached to req.auth by the JWT middleware
  return res.status(200).json({
    success: true,
    data: req.auth
  });
};

/**
 * Logout user (invalidate token on client side)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const logout = (req, res) => {
  // JWT tokens are stateless, so we can't invalidate them on the server
  // The client should remove the token from storage
  return res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
};

module.exports = {
  login,
  getProfile,
  logout
};
