const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get('/', auth, async (req, res) => {
    try {
        const { role } = req.user;
        const query = role ? { role } : {};
        const users = await User.find(query).select('-password');
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error while fetching users' });
    }
});

module.exports = router;