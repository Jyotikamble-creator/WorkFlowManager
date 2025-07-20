const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema);
