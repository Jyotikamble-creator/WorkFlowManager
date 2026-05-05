
// Import Task model for database operations
const Task = require('../models/Task');


// Create a new task
exports.createTask = async (req, res) => {
  // Extract task details from request body
  const { title, description, assignedTo } = req.body;
  try {
    // Create new task instance with creator's user id
    const task = new Task({
      title,
      description,
      assignedTo,
      createdBy: req.user.id,
    });
    // Save task to database
    await task.save();
    // Respond with created task
    res.status(201).json(task);
  } catch (err) {
    // Log and return server error
    console.error('Error creating task:', err);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};


// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    // Find all tasks and populate related user and comment info
    const tasks = await Task.find()
      .populate('assignedTo', 'name email role') // Populate assigned user info
      .populate('createdBy', 'name email role') // Populate creator info
      .populate({ path: 'comments', populate: { path: 'createdBy', select: 'name' } }); // Populate comments and their creators

    // Respond with all tasks
    res.json(tasks);
  } catch (err) {
    // Log and return server error
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};


// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    // Find task by ID and populate related info
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate({ path: 'comments', populate: { path: 'createdBy', select: 'name' } });

    // If task not found, return 404
    if (!task) return res.status(404).json({ message: 'Task not found' });
    // Respond with the task
    res.json(task);
  } catch (err) {
    // Log and return server error
    console.error('Error retrieving task:', err);
    res.status(500).json({ message: 'Server error while retrieving task' });
  }
};


// Update task status
exports.updateTaskStatus = async (req, res) => {
  // Extract taskId from params and new status from body
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    // Find task by ID
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Update status and add to history
    task.status = status;
    task.history.push({ action: `Status changed to ${status}`, by: req.user.id });
    await task.save();

    // Respond with updated task
    res.json(task);
  } catch (err) {
    // Log and return server error
    console.error('Error updating task status:', err);
    res.status(500).json({ message: 'Server error while updating task status' });
  }
};


// Delete task
exports.deleteTask = async (req, res) => {
  try {
    // Find and delete task by ID
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Respond with success message
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    // Log and return server error
    console.error('Error deleting task:', err);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};
