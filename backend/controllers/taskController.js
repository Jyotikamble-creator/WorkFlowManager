

// Import Task model for database operations
const Task = require('../models/Task');
// Import logger utility
const logger = require('../utils/logger');


// Create a new task
exports.createTask = async (req, res) => {
  // Extract task details from request body
  const { title, description, assignedTo } = req.body;
  try {
    logger.info('TASK_CREATE', 'Creating new task', { title, assignedTo, createdBy: req.user.id });
    // Create new task instance with creator's user id
    const task = new Task({
      title,
      description,
      assignedTo,
      createdBy: req.user.id,
    });
    // Save task to database
    await task.save();
    logger.info('TASK_CREATE', 'Task created successfully', { taskId: task._id });
    // Respond with created task
    res.status(201).json(task);
  } catch (err) {
    logger.error('TASK_CREATE', 'Error creating task', err);
    res.status(500).json({ message: 'Server error while creating task' });
  }
};


// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    logger.info('TASK_FETCH', 'Fetching all tasks');
    // Find all tasks and populate related user and comment info
    const tasks = await Task.find()
      .populate('assignedTo', 'name email role') // Populate assigned user info
      .populate('createdBy', 'name email role') // Populate creator info
      .populate({ path: 'comments', populate: { path: 'createdBy', select: 'name' } }); // Populate comments and their creators
    logger.info('TASK_FETCH', 'Tasks fetched', { count: tasks.length });
    // Respond with all tasks
    res.json(tasks);
  } catch (err) {
    logger.error('TASK_FETCH', 'Error fetching tasks', err);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
};


// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    logger.info('TASK_FETCH', 'Fetching task by ID', { id: req.params.id });
    // Find task by ID and populate related info
    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate({ path: 'comments', populate: { path: 'createdBy', select: 'name' } });

    // If task not found, return 404
    if (!task) {
      logger.warn('TASK_FETCH', 'Task not found', { id: req.params.id });
      return res.status(404).json({ message: 'Task not found' });
    }
    logger.info('TASK_FETCH', 'Task fetched', { id: req.params.id });
    // Respond with the task
    res.json(task);
  } catch (err) {
    logger.error('TASK_FETCH', 'Error retrieving task', err);
    res.status(500).json({ message: 'Server error while retrieving task' });
  }
};


// Update task status
exports.updateTaskStatus = async (req, res) => {
  // Extract taskId from params and new status from body
  const { taskId } = req.params;
  const { status } = req.body;
  try {
    logger.info('TASK_STATUS', 'Updating task status', { taskId, status, userId: req.user.id });
    // Find task by ID
    const task = await Task.findById(taskId);
    if (!task) {
      logger.warn('TASK_STATUS', 'Task not found', { taskId });
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update status and add to history
    task.status = status;
    task.history.push({ action: `Status changed to ${status}`, by: req.user.id });
    await task.save();
    logger.info('TASK_STATUS', 'Task status updated', { taskId, status });
    // Respond with updated task
    res.json(task);
  } catch (err) {
    logger.error('TASK_STATUS', 'Error updating task status', err);
    res.status(500).json({ message: 'Server error while updating task status' });
  }
};


// Delete task
exports.deleteTask = async (req, res) => {
  try {
    logger.info('TASK_DELETE', 'Deleting task', { id: req.params.id });
    // Find and delete task by ID
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      logger.warn('TASK_DELETE', 'Task not found', { id: req.params.id });
      return res.status(404).json({ message: 'Task not found' });
    }
    logger.info('TASK_DELETE', 'Task deleted', { id: req.params.id });
    // Respond with success message
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    logger.error('TASK_DELETE', 'Error deleting task', err);
    res.status(500).json({ message: 'Server error while deleting task' });
  }
};
