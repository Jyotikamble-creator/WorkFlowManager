
// Import mongoose for schema and model creation
const mongoose = require('mongoose');


// Define schema for comments
const commentSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }, // Reference to associated task
  text: String, // Comment text
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User who created the comment
  createdAt: { type: Date, default: Date.now }, // Timestamp
});


// Export Comment model (avoid recompiling in dev environments)
module.exports = mongoose.models.Comment || mongoose.model('Comment', commentSchema);
