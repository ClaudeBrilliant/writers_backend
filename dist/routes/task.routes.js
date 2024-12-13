"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const router = express_1.default.Router();
const middlewares_1 = require("../middlewares"); // Middleware to authenticate users
const middlewares_2 = require("../middlewares"); // Middleware to check admin role
const adminOnly = (0, middlewares_2.authorizeRole)(['ADMIN']);
// Create a new task
router.post('/admin/tasks/new', middlewares_1.authenticateJWT, adminOnly, task_controller_1.createTaskController);
// Get all tasks
router.get('/tasks/all', middlewares_1.authenticateJWT, task_controller_1.getAllTasksController);
// Get all tasks
router.get('/tasks/all/:id', middlewares_1.authenticateJWT, task_controller_1.getAllTasksController);
// Get all submitted tasks
router.get('/admin/task-submissions', middlewares_1.authenticateJWT, adminOnly, task_controller_1.getAllTasksSubmittedController);
// Get all tasks
router.get('/tasks/assigned/:id', middlewares_1.authenticateJWT, task_controller_1.getTaskByAssignedUserIdController);
// Get all tasks
router.get('/tasks/all/apply/:id', middlewares_1.authenticateJWT, task_controller_1.getAllTasksOpenController);
// Get a task by ID
router.get('/tasks/:id', middlewares_1.authenticateJWT, task_controller_1.getTaskByIdController);
// Update a task
router.put('/tasks/update/users/:id', middlewares_1.authenticateJWT, task_controller_1.updateTaskController);
// Update a task
router.put('/tasks/update/:id', middlewares_1.authenticateJWT, adminOnly, task_controller_1.updateTaskController);
// Soft delete a task
router.delete('/tasks/:id', middlewares_1.authenticateJWT, adminOnly, task_controller_1.deleteTaskController);
// Assign a user to a task
router.put('/admin/tasks/assign', middlewares_1.authenticateJWT, adminOnly, task_controller_1.assignUserToTaskController);
exports.default = router;
