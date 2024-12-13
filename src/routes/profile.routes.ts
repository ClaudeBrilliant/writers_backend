import express from 'express';
import {
  createProfileController,
  getAllProfilesController,
  getProfileByIdController,
  updateProfileController,
  deleteProfileController,
} from '../controllers/profile.controller';
import { authenticateJWT, authorizeRole } from '../middlewares';

const router = express.Router();



// Update a new profile
router.put(
  '/profiles', 
  authenticateJWT,
  createProfileController
);

// Get all profiles
router.get(
  '/profiles', 
  authenticateJWT,
  getAllProfilesController,
);

// Get a profile by ID
router.get
('/profiles/:id', 
  authenticateJWT,
  getProfileByIdController
);

// Update a profile
router.put(
  '/profiles/:id', 
  authenticateJWT,
  updateProfileController
);

// Soft delete a profile
router.delete(
  '/profiles/:id',
  authenticateJWT, 
  deleteProfileController
);

export default router;
