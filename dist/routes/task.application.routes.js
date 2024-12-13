"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_application_controller_1 = require("../controllers/task.application.controller");
const router = express_1.default.Router();
// Create a new task application
router.post('/task-applications/apply', task_application_controller_1.createTaskApplicationController);
// Get all task applications
router.get('/task-applications', task_application_controller_1.getTaskApplicationsController);
// Get all task applications
// Get a task application by ID
router.get('/task-applications/:id', task_application_controller_1.getTaskApplicationByIdController);
// Update a task application
router.put('/task-applications/:id', task_application_controller_1.updateTaskApplicationController);
// Soft delete a task application
router.delete('/task-applications/:id', task_application_controller_1.deleteTaskApplicationController);
// Update the status of a task application
router.patch('/task-applications/:id/status', task_application_controller_1.updateApplicationStatusController);
exports.default = router;
