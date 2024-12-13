import { Request, Response, NextFunction } from 'express';
import {
  createTaskApplication,
  getTaskApplications,
  getTaskApplicationById,
  updateTaskApplication,
  deleteTaskApplication,
  updateApplicationStatus,
} from '../services/task.application.service';
import { ApplicationStatus } from '../interfaces/enums';
import { AuthRequest } from '../middlewares';

/**
 * Create a new task application
 */
export const createTaskApplicationController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const taskApplication = await createTaskApplication(data);
    res.status(201).json(taskApplication);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all task applications
 */
export const getTaskApplicationsController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const taskApplications = await getTaskApplications();
    res.status(200).json(taskApplications);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a task application by ID
 */
export const getTaskApplicationByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const applicationId = req.params.id;
    const taskApplication = await getTaskApplicationById(applicationId);
    if (!taskApplication) {
      return res.status(404).json({ message: 'Task application not found' });
    }
    res.status(200).json(taskApplication);
  } catch (error) {
    next(error);
  }
};

/**
 * Update a task application
 */
export const updateTaskApplicationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const applicationId = req.params.id;
    const data = req.body;
    const updatedApplication = await updateTaskApplication(applicationId, data);
    res.status(200).json(updatedApplication);
  } catch (error) {
    next(error);
  }
};

/**
 * Soft delete a task application
 */
export const deleteTaskApplicationController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const applicationId = req.params.id;
    const deletedApplication = await deleteTaskApplication(applicationId);
    res.status(200).json(deletedApplication);
  } catch (error) {
    next(error);
  }
};

/**
 * Update application status
 */
export const updateApplicationStatusController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;
    const updatedStatus = await updateApplicationStatus(applicationId, status as ApplicationStatus);
    res.status(200).json(updatedStatus);
  } catch (error) {
    next(error);
  }
};
