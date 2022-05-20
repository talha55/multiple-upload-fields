// Express Router
const express = require("express");
const router = express.Router();

// Middleware
const jwtAuth = require("../Middleware/JWT")

// Controller
const TaskController = require("../Controllers/TaskController")

// Routes
router.post("/create-task", jwtAuth, TaskController.addTask)
router.get("/list-tasks", jwtAuth, TaskController.taskList)

module.exports = router