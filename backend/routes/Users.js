const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get('/', auth, async (req, res) => {
    try {
        const { role, id } = req.user;
        
        // Managers see employees, employees see only themselves, admins see everyone
        let query = {};
        if (role === 'manager') {
            query = { role: 'employee' };
        } else if (role === 'employee') {
            query = { _id: id };
        }
        // admins get all users (empty query)
        
        const users = await User.find(query).select('-password');
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error while fetching users' });
    }
});

module.exports = router;