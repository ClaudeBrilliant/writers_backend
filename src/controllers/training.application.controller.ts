import { Request, Response } from 'express';
import * as TrainingApplicationService from '../services/training.application.service';

export const createTrainingApplication = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const newApplication = await TrainingApplicationService.createTrainingApplication(data);
    res.status(201).json(newApplication);
  } catch (error: any) {
    console.error('Error in createTrainingApplication:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllTrainingApplications = async (_req: Request, res: Response) => {
  try {
    const applications = await TrainingApplicationService.getTrainingApplications();
    res.status(200).json(applications);
  } catch (error: any) {
    console.error('Error in getAllTrainingApplications:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getTrainingApplicationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const application = await TrainingApplicationService.getTrainingApplicationById(id);
    if (!application) {
      return res.status(404).json({ message: 'Training application not found' });
    }
    res.status(200).json(application);
  } catch (error: any) {
    console.error('Error in getTrainingApplicationById:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateTrainingApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedApplication = await TrainingApplicationService.updateTrainingApplication(id, data);
    res.status(200).json(updatedApplication);
  } catch (error: any) {
    console.error('Error in updateTrainingApplication:', error.message);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTrainingApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedApplication = await TrainingApplicationService.deleteTrainingApplication(id);
    res.status(200).json(deletedApplication);
  } catch (error: any) {
    console.error('Error in deleteTrainingApplication:', error.message);
    res.status(500).json({ message: error.message });
  }
};
