const Comment = require('../models/comment');
const Task = require('../models/task');

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

    await Task.findByIdAndUpdate(taskId, { $push: { comments: comment._id } });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getComments = async (req, res) => {
  const { taskId } = req.params;
  try {
    const comments = await Comment.find({ taskId }).populate('createdBy', 'name');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};