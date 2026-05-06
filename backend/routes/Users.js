
// User routes for listing users with role-based access

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");
const logger = require('../utils/logger');


// GET /api/users
// Returns users based on the role of the requester:
// - Admin: all users
// - Manager: only employees
// - Employee: only themselves
router.get('/', auth, async (req, res) => {
    logger.info('ROUTE_USER', 'GET / called', { userId: req.user.id, role: req.user.role });
    try {
        const { role, id } = req.user;
        // Build query based on user role
        let query = {};
        if (role === 'manager') {
            query = { role: 'employee' };
            logger.debug('ROUTE_USER', 'Manager query', query);
        } else if (role === 'employee') {
            query = { _id: id };
            logger.debug('ROUTE_USER', 'Employee query', query);
        } else {
            logger.debug('ROUTE_USER', 'Admin query (empty)');
        }
        // Find users based on query, exclude password field
        const users = await User.find(query).select('-password');
        logger.info('ROUTE_USER', 'Users fetched', { count: users.length });
        res.json(users);
    } catch (err) {
        logger.error('ROUTE_USER', 'Error fetching users', err);
        res.status(500).json({ message: 'Server error while fetching users' });
    }
});


// Export the router to be used in server.js
module.exports = router;