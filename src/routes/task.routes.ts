import express from 'express';
import {
    createTaskController,
    getAllTasksController,
    getTaskByIdController,
    getTaskByAssignedUserIdController,
    updateTaskController,
    deleteTaskController,
    assignUserToTaskController,
    getAllTasksSubmittedController,
    getAllTasksOpenController
} from '../controllers/task.controller';

const router = express.Router();
import {authenticateJWT} from '../middlewares'; // Middleware to authenticate users
import {authorizeRole} from '../middlewares'; // Middleware to check admin role


const adminOnly = authorizeRole(['ADMIN']);

// Create a new task
router.post('/admin/tasks/new', authenticateJWT, adminOnly, createTaskController);

// Get all tasks
router.get('/tasks/all', authenticateJWT, getAllTasksController);
// Get all tasks
router.get('/tasks/all/:id', authenticateJWT, getAllTasksController);

// Get all submitted tasks
router.get('/admin/task-submissions', authenticateJWT, adminOnly, getAllTasksSubmittedController);

// Get all tasks
router.get('/tasks/assigned/:id', authenticateJWT, getTaskByAssignedUserIdController);

// Get all tasks
router.get('/tasks/all/apply/:id', authenticateJWT, getAllTasksOpenController);

// Get a task by ID
router.get('/tasks/:id', authenticateJWT, getTaskByIdController);
// Update a task
router.put('/tasks/update/users/:id', authenticateJWT, updateTaskController);

// Update a task
router.put('/tasks/update/:id', authenticateJWT, adminOnly, updateTaskController);

// Soft delete a task
router.delete('/tasks/:id', authenticateJWT, adminOnly, deleteTaskController);

// Assign a user to a task
router.put('/admin/tasks/assign', authenticateJWT, adminOnly, assignUserToTaskController);

export default router;
