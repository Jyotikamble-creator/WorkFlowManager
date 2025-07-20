const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    // stores  id of task
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    // actual comment text
    text: { type: String, required: true },
    // stores id of user who created the comment(whi had commented)
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // stores the date when comment was created
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.Model.Comment|| mongoose.model("Comment", commentSchema);



