const Router = require("express").Router();
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/TaskController");

// to get all tasks
Router.get("/", getAllTasks);

// Create a new task
Router.post("/", createTask);

// update a task by id

Router.put("/:id", updateTask);

// delete a task by id
Router.delete("/:id", deleteTask);

module.exports = Router;
