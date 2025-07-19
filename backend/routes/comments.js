const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/commentController');

router.post('/:taskId', auth, commentController.addComment);
router.get('/:taskId', auth, commentController.getComments);

module.exports = router;
