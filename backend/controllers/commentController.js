const Comment = require('../models/comment');
const Task = require('../models/task');

// Add a comment to a task
exports.addComment = async (req, res) => {
  const { taskId } = req.params;
  const { text } = req.body;

  try {
    const comment = new Comment({
      taskId,
      text,
      createdBy: req.user.id,
    });

    await comment.save();

    await Task.findByIdAndUpdate(taskId, {
      $push: { comments: comment._id },
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ message: 'Server error while adding comment' });
  }
};

// Get all comments for a specific task
exports.getComments = async (req, res) => {
  const { taskId } = req.params;

  try {
    const comments = await Comment.find({ taskId }).populate('createdBy', 'name email');
    res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ message: 'Server error while fetching comments' });
  }
};
