const TaskModel = require("../models/TaskModel");

// Create a new task
const createTask = async (req, res) => {
  const data = req.body;
  try {
    const model = new TaskModel(data);
    await model.save();
    res.status(201).json({ message: `Task added successfully`, success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to Create Task", success: false });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const data = await TaskModel.find();
    res
      .status(200)
      .json({ message: "Featching all tasks", success: true, data });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", success: false });
  }
};

// Update a task by id

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    const data = await TaskModel.findByIdAndUpdate(id, obj);
    res.status(200).json({ message: "task updated", success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to updated tasks", success: false });
  }
};

// Delete a task by id
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await TaskModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Task deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", success: false });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
