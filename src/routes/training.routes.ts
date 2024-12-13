import express from 'express';
import {
  createTrainingController,
  getTrainingsController,
  getTrainingByIdController,
  updateTrainingController,
  deleteTrainingController,
} from '../controllers/training.controller';
import { authenticateJWT } from '../middlewares';
import { authorizeRole } from '../middlewares';

const router = express.Router();
const adminOnly = authorizeRole(['ADMIN']);

// Routes for all authenticated users
router.get('/trainings/all', authenticateJWT, getTrainingsController);
router.get('/trainings/:id', authenticateJWT, getTrainingByIdController);

// Admin-only routes
router.post('/trainings', authenticateJWT, adminOnly, createTrainingController);
router.put('/trainings/:id', authenticateJWT, adminOnly, updateTrainingController);
router.delete('/trainings/:id', authenticateJWT, adminOnly, deleteTrainingController);

export default router;

