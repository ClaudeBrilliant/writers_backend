import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { createTraining, getAllTrainings, getTrainingById, updateTraining, deleteTraining } from '../services/training.service';

/**
 * Create a new training
 * @route POST /api/trainings
 * @access Private (Admin only)
 */
export const createTrainingController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Prepare training data
    const trainingData: Prisma.TrainingCreateInput = {
      id: req.body.id, // Optional, can be omitted if not needed
      title: req.body.title,
      description: req.body.description,
      price: Number(req.body.price), // Ensure numeric type
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      capacity: req.body.capacity,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false, // Default value

      // applications: req.body.applications
      //     ? {
      //       create: req.body.applications.map((app: any) => ({
      //         userId: app.userId,
      //         status: app.status || 'PENDING',
      //       })),
      //     }
      //     : undefined,
    };

    // Validate required fields
    if (!trainingData.title || !trainingData.description || !trainingData.price || !trainingData.startDate || !trainingData.endDate || !trainingData.capacity) {
      return res.status(400).json({
        message: 'Missing required training fields',
        requiredFields: ['title', 'description', 'price', 'startDate', 'endDate', 'capacity'],
      });
    }

    // Create the training in the database
    const training = await createTraining(trainingData);

    // Respond with success
    res.status(201).json({
      message: 'Training created successfully',
      training,
    });
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      res.status(500).json({
        message: 'Failed to create training',
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: 'An unknown error occurred while creating the training',
      });
    }
    next(error);
  }
};

/**
 * Get all trainings
 * @route GET /api/trainings
 * @access Private (Authenticated users)
 */
export const getTrainingsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trainings = await getAllTrainings();

    res.status(200).json({ message: 'Trainings retrieved successfully', trainings });
  } catch (error) {
    // TypeScript assertion to handle error as an instance of Error
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to retrieve trainings', error: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
    next(error);
  }
};

/**
 * Get a training by ID
 * @route GET /api/trainings/:id
 * @access Private (Authenticated users)
 */
export const getTrainingByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trainingId = req.params.id;
    const training = await getTrainingById(trainingId);
    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }

    res.status(200).json({ message: 'Training retrieved successfully', training });
  } catch (error) {
    // TypeScript assertion to handle error as an instance of Error
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to retrieve training', error: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
    next(error);
  }
};
/**
 * Update a training
 * @route PUT /api/trainings/:id
 * @access Private (Admin only)
 */
export const updateTrainingController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trainingId = req.params.id;
    const updateData: Prisma.TrainingUpdateInput = req.body;

    const updatedTraining = await updateTraining(trainingId, updateData);

    res.status(200).json({ message: 'Training updated successfully', training: updatedTraining });
  } catch (error) {
    // TypeScript assertion to handle error as an instance of Error
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to update training', error: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
    next(error);
  }
};

/**
 * Soft delete a training
 * @route DELETE /api/trainings/:id
 * @access Private (Admin only)
 */
export const deleteTrainingController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trainingId = req.params.id;

    const deletedTraining = await deleteTraining(trainingId);

    res.status(200).json({ message: 'Training soft deleted successfully', training: deletedTraining });
  } catch (error) {
    // TypeScript assertion to handle error as an instance of Error
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to delete training', error: error.message });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
    next(error);
  }
};
