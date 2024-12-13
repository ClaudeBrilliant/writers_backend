import { Request, Response, NextFunction } from 'express';
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} from '../services/profile.service';

/**
 * Create a new profile
 */
export const createProfileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const profile = await createProfile(data);
    res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all profiles
 */
export const getAllProfilesController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const profiles = await getAllProfiles();
    res.status(200).json(profiles);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a profile by ID
 */
export const getProfileByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profileId = req.params.id;
    const profile = await getProfileById(profileId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

/**
 * Update a profile
 */
export const updateProfileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profileId = req.params.id;
    const data = req.body;
    const updatedProfile = await updateProfile(profileId, data);
    res.status(200).json(updatedProfile);
  } catch (error) {
    next(error);
  }
};

/**
 * Soft delete a profile
 */
export const deleteProfileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profileId = req.params.id;
    const deletedProfile = await deleteProfile(profileId);
    res.status(200).json(deletedProfile);
  } catch (error) {
    next(error);
  }
};
