const Task = require('../models/task');

exports.createTask = async (req, res) => {
  const { title, description, assignedTo } = req.body;
  try {
    const task = new Task({
      title,
      description,
      assignedTo,
      createdBy: req.user.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('assignedTo', 'name')
      .populate('createdBy', 'name')
      .populate({ path: 'comments', populate: { path: 'createdBy', select: 'name' } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = status;
    task.history.push({ action: `Status changed to ${status}`, by: req.user.id });
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
