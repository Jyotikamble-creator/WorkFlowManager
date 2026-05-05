

// Import User model for database operations
const User = require('../models/User.js'); 
// Import bcrypt for password hashing
const bcrypt = require('bcrypt'); 
// Import jsonwebtoken for JWT token creation
const jwt = require('jsonwebtoken');
// Import logger utility
const logger = require('../utils/logger');


// Register a new user
exports.register = async (req, res) => {
  // Destructure user details from request body
  const { name, email, password, role } = req.body;

  try {
    logger.info('AUTH_REGISTER', 'Register attempt', { email, name, role });
    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn('AUTH_REGISTER', 'User already exists', { email });
      // If user exists, return error
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Save user to database
    await newUser.save();
    logger.info('AUTH_REGISTER', 'User registered successfully', { userId: newUser._id });

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    logger.error('AUTH_REGISTER', 'Registration Error', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};


// Login a user
exports.login = async (req, res) => {
  // Destructure credentials from request body
  const { email, password } = req.body;

  try {
    logger.info('AUTH_LOGIN', 'Login attempt', { email });
    // Find user by email
    const user = await User.findOne({ email });
    // If user not found or password does not match, return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      logger.warn('AUTH_LOGIN', 'Invalid credentials', { email });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token with user id and role, expires in 1 day
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    logger.info('AUTH_LOGIN', 'Login successful', { userId: user._id, role: user.role });

    // Respond with token and user info (excluding password)
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } catch (err) {
    logger.error('AUTH_LOGIN', 'Login Error', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};


