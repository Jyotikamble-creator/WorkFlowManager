
// Task routes for CRUD operations and filtering by user role
const auth = require("../middleware/auth");
const Task = require("../models/Task");
const router = require("express").Router();

// Get tasks assigned to the logged-in employee
// GET /api/tasks/employee
router.get('/employee', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.id || req.user._id })
            .populate('assignedTo', 'email name role')
            .populate('createdBy', 'email name role')
            .populate({ path: 'comments', populate: { path: 'createdBy', select: 'name' } });
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching employee tasks:', err);
        res.status(500).json({ message: 'Server error while fetching employee tasks' });
    }
});

// Get tasks assigned by the logged-in manager
// GET /api/tasks/manager
router.get('/manager', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user.id || req.user._id })
            .populate('assignedTo', 'email name role')
            .populate('createdBy', 'email name role')
            .populate({ path: 'comments', populate: { path: 'createdBy', select: 'name' } });
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching manager tasks:', err);
        res.status(500).json({ message: 'Server error while fetching manager tasks' });
    }
});

// Get a single task by ID
// GET /api/tasks/:id
router.get('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('assignedTo', 'email name role')
            .populate('createdBy', 'email name role')
            .populate({ path: 'comments', populate: { path: 'createdBy', select: 'name' } });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        console.error('Error fetching task by id:', err);
        res.status(500).json({ message: 'Server error while fetching task' });
    }
});

// Get all tasks
// GET /api/tasks/
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('assignedTo', 'email name role')
            .populate('createdBy', 'email name role')
            .populate({ path: 'comments', populate: { path: 'createdBy', select: 'name' } });
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: 'Server error while fetching tasks' });
    }
});



// Create a new task
// POST /api/tasks/
router.post('/', auth, async (req, res) => {
    try {
        const task = new Task({ ...req.body, createdBy: req.user.id || req.user._id });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ message: 'Server error while creating task' });
    }
});

// Update a task by ID
// PUT /api/tasks/:id
router.put('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ message: 'Server error while updating task' });
    }
});

// Delete a task by ID
// DELETE /api/tasks/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ message: 'Server error while deleting task' });
    }
});

// Add a comment to a task (not used in main flow, kept for reference)
// POST /api/tasks/:id/comment
router.post('/:id/comment', auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        task.comments.push({ author: req.user.id || req.user._id, text: req.body.text });
        await task.save();
        res.json(task);
    } catch (err) {
        console.error('Error adding comment to task:', err);
        res.status(500).json({ message: 'Server error while adding comment' });
    }
});

// Export the router to be used in server.js
module.exports=router;



