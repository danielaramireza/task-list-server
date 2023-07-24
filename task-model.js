const mongoose = require("mongoose");
const TaskModel = mongoose.model(
  "Task",
  mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    state: Boolean,
    user_id: mongoose.ObjectId,
  })
);

module.exports = TaskModel;
