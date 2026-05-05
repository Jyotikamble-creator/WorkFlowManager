
// Comment routes for adding and retrieving comments on tasks
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/commentController');

// Add a comment to a specific task
// POST /api/comments/:taskId
router.post('/:taskId', auth, commentController.addComment);

// Get all comments for a specific task
// GET /api/comments/:taskId
router.get('/:taskId', auth, commentController.getComments);

// Export the router to be used in server.js
module.exports = router;
