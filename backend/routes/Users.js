
// User routes for listing users with role-based access
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");


// GET /api/users
// Returns users based on the role of the requester:
// - Admin: all users
// - Manager: only employees
// - Employee: only themselves
router.get('/', auth, async (req, res) => {
    try {
        // Log request and extract user info from JWT
        console.log('=== /api/users request ===');
        console.log('req.user:', req.user);
        
        const { role, id } = req.user;
        console.log('Extracted role:', role, 'id:', id);
        
        // Build query based on user role
        let query = {};
        if (role === 'manager') {
            // Managers see only employees
            query = { role: 'employee' };
            console.log('Manager query:', query);
        } else if (role === 'employee') {
            // Employees see only themselves
            query = { _id: id };
            console.log('Employee query:', query);
        } else {
            // Admins see everyone (empty query)
            console.log('Admin query (empty)');
        }
        
        // Find users based on query, exclude password field
        const users = await User.find(query).select('-password');
        console.log('Found users:', users.length);
        // Respond with user list
        res.json(users);
    } catch (err) {
        // Log and return server error
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error while fetching users' });
    }
});


// Export the router to be used in server.js
module.exports = router;