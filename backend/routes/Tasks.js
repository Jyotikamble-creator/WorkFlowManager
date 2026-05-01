const auth = require("../middleware/auth");
const Task = require("../models/Task");
const router = require("express").Router();


// Get/read all tasks by id
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

// get single task
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



// create a new task
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

// Update a task
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

module.exports=router;



