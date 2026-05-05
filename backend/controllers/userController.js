

// Import User model for database operations
const User = require('../models/User'); // Capitalize for consistency
// Import logger utility
const logger = require('../utils/logger');


// Get all users (excluding passwords for security)
exports.getAllUsers = async (req, res) => {
  try {
    logger.info('USER_FETCH', 'Fetching all users');
    // Find all users and exclude password field
    const users = await User.find().select('-password'); // exclude passwords
    logger.info('USER_FETCH', 'Users fetched', { count: users.length });
    // Respond with user list
    res.json(users);
  } catch (err) {
    logger.error('USER_FETCH', 'Error fetching users', err);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};


// Get user by ID (excluding password)
exports.getUserById = async (req, res) => {
  try {
    logger.info('USER_FETCH', 'Fetching user by ID', { id: req.params.id });
    // Find user by ID and exclude password field
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      logger.warn('USER_FETCH', 'User not found', { id: req.params.id });
      return res.status(404).json({ message: 'User not found' });
    }
    logger.info('USER_FETCH', 'User fetched', { id: req.params.id });
    // Respond with user info
    res.json(user);
  } catch (err) {
    logger.error('USER_FETCH', 'Error retrieving user by ID', err);
    res.status(500).json({ message: 'Server error while retrieving user' });
  }
};


// Exporting controller functions via `exports.*` above is sufficient.
