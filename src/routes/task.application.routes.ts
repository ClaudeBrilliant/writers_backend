import express from 'express';
import {
  createTaskApplicationController,
  getTaskApplicationsController,
  getTaskApplicationByIdController,
  updateTaskApplicationController,
  deleteTaskApplicationController,
  updateApplicationStatusController,
} from '../controllers/task.application.controller';

const router = express.Router();

// Create a new task application
router.post('/task-applications/apply', createTaskApplicationController);

// Get all task applications
router.get('/task-applications', getTaskApplicationsController);

// Get all task applications
// Get a task application by ID
router.get('/task-applications/:id', getTaskApplicationByIdController);

// Update a task application
router.put('/task-applications/:id', updateTaskApplicationController);

// Soft delete a task application
router.delete('/task-applications/:id', deleteTaskApplicationController);

// Update the status of a task application
router.patch('/task-applications/:id/status', updateApplicationStatusController);

export default router;
