const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  completed: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const TaskModel = mongoose.model("Todos", TaskSchema);
module.exports = TaskModel;
