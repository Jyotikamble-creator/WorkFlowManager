
// Authentication routes for user registration and login
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Route to register a new user
// POST /api/auth/register
router.post('/register', register);

// Route to login a user
// POST /api/auth/login
router.post('/login', login);

// Export the router to be used in server.js
module.exports = router;
