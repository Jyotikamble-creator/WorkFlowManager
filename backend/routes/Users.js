const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get('/', auth, async (req, res) => {
    try {
        console.log('=== /api/users request ===');
        console.log('req.user:', req.user);
        
        const { role, id } = req.user;
        console.log('Extracted role:', role, 'id:', id);
        
        // Managers see employees, employees see only themselves, admins see everyone
        let query = {};
        if (role === 'manager') {
            query = { role: 'employee' };
            console.log('Manager query:', query);
        } else if (role === 'employee') {
            query = { _id: id };
            console.log('Employee query:', query);
        } else {
            console.log('Admin query (empty)');
        }
        
        const users = await User.find(query).select('-password');
        console.log('Found users:', users.length);
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error while fetching users' });
    }
});

module.exports = router;