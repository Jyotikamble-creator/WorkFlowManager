
// Import User model for database operations
const User = require('../models/User'); // Capitalize for consistency


// Get all users (excluding passwords for security)
exports.getAllUsers = async (req, res) => {
  try {
    // Find all users and exclude password field
    const users = await User.find().select('-password'); // exclude passwords
    // Respond with user list
    res.json(users);
  } catch (err) {
    // Log and return server error
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};


// Get user by ID (excluding password)
exports.getUserById = async (req, res) => {
  try {
    // Find user by ID and exclude password field
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    // Respond with user info
    res.json(user);
  } catch (err) {
    // Log and return server error
    console.error('Error retrieving user by ID:', err);
    res.status(500).json({ message: 'Server error while retrieving user' });
  }
};


// Exporting controller functions via `exports.*` above is sufficient.
