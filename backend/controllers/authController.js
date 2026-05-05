
// Import User model for database operations
const User = require('../models/User.js'); 
// Import bcrypt for password hashing
const bcrypt = require('bcrypt'); 
// Import jsonwebtoken for JWT token creation
const jwt = require('jsonwebtoken');


// Register a new user
exports.register = async (req, res) => {
  // Destructure user details from request body
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
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

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // Log and return server error
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};


// Login a user
exports.login = async (req, res) => {
  // Destructure credentials from request body
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    // If user not found or password does not match, return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token with user id and role, expires in 1 day
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

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
    // Log and return server error
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};


