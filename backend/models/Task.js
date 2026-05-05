
// Import mongoose for schema and model creation
const mongoose = require('mongoose');


// Define schema for tasks
const taskSchema = new mongoose.Schema({
  title: String, // Task title
  description: String, // Task description/details
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User assigned to the task
  status: { type: String, default: 'open' }, // Task status (open, in progress, completed, etc.)
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who created the task
  history: [
    {
      action: String, // Description of action (e.g., status change)
      by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who performed the action
      at: { type: Date, default: Date.now }, // Timestamp of action
    },
  ],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Array of comment references
});


// Export Task model (avoid recompiling in dev environments)
module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema);
