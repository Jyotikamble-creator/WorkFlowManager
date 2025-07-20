const mongoose = require('mongoose');

// Taskschema defines the structure of a task document in MongoDB
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,

  status: {
    type: String,
    enum: ['to do', 'in progress', 'done'],
    default: 'to do',
  },

  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // 🧩 Connects to Comment model

//   keep the track of task history
  history: [  
    {
      action: String,
      date: { type: Date, default: Date.now },
      by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model.Task || mongoose.model('Task', taskSchema);










