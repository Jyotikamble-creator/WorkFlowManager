

// Import Comment and Task models
const Comment = require('../models/Comment');
const Task = require('../models/Task');
// Import logger utility
const logger = require('../utils/logger');


// Add a comment to a task
exports.addComment = async (req, res) => {
  // Extract taskId from URL params and comment text from request body
  const { taskId } = req.params;
  const { text } = req.body;

  try {
    logger.info('COMMENT_ADD', 'Adding comment', { taskId, userId: req.user.id });
    // Create a new comment instance
    const comment = new Comment({
      taskId, // Associate comment with a task
      text, // Comment text
      createdBy: req.user.id, // User who created the comment (from auth middleware)
    });

    // Save comment to database
    await comment.save();

    // Add comment reference to the corresponding task's comments array
    await Task.findByIdAndUpdate(taskId, {
      $push: { comments: comment._id },
    });

    logger.info('COMMENT_ADD', 'Comment added successfully', { commentId: comment._id });
    // Respond with the created comment
    res.status(201).json(comment);
  } catch (err) {
    logger.error('COMMENT_ADD', 'Error adding comment', err);
    res.status(500).json({ message: 'Server error while adding comment' });
  }
};


// Get all comments for a specific task
exports.getComments = async (req, res) => {
  // Extract taskId from URL params
  const { taskId } = req.params;

  try {
    logger.info('COMMENT_FETCH', 'Fetching comments', { taskId });
    // Find all comments for the given task and populate creator's name and email
    const comments = await Comment.find({ taskId }).populate('createdBy', 'name email');
    logger.info('COMMENT_FETCH', 'Comments fetched', { count: comments.length });
    // Respond with the list of comments
    res.status(200).json(comments);
  } catch (err) {
    logger.error('COMMENT_FETCH', 'Error fetching comments', err);
    res.status(500).json({ message: 'Server error while fetching comments' });
  }
};
