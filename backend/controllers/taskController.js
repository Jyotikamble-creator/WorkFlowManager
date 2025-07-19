const Task = require('../models/task');

// Create a new task
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
    console.error('Error creating task:', err);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('assignedTo', 'name email role')
      .populate('createdBy', 'name email role')
      .populate({ path: 'comments', populate: { path: 'createdBy', select: 'name' } });

    res.json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate({ path: 'comments', populate: { path: 'createdBy', select: 'name' } });

    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error('Error retrieving task:', err);
    res.status(500).json({ message: 'Server error while retrieving task' });
  }
};

// Update task status
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
    console.error('Error updating task status:', err);
    res.status(500).json({ message: 'Server error while updating task status' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};
