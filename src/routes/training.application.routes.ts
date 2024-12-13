import express from 'express';
import {
  createTrainingApplication,
  getAllTrainingApplications,
  getTrainingApplicationById,
  updateTrainingApplication,
  deleteTrainingApplication
} from '../controllers/training.application.controller';
import { authenticateJWT } from '../middlewares';
import { authorizeRole } from '../middlewares';

const router = express.Router();
const adminOnly = authorizeRole(['ADMIN']);

// Create a new training application
router.post('/training-applications/new', authenticateJWT, createTrainingApplication);

// Get all training applications
router.get('/training-applications/all', authenticateJWT, getAllTrainingApplications);

// Get a specific training application by ID
router.get('/training-applications/:id', authenticateJWT, getTrainingApplicationById);

// Update a training application
router.put('/training-applications/:id', authenticateJWT, adminOnly, updateTrainingApplication);

// Soft delete a training application
router.delete('/training-applications/:id', authenticateJWT, adminOnly, deleteTrainingApplication);

export default router;
