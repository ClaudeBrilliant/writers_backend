"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrainingController = exports.updateTrainingController = exports.getTrainingByIdController = exports.getTrainingsController = exports.createTrainingController = void 0;
const training_service_1 = require("../services/training.service");
/**
 * Create a new training
 * @route POST /api/trainings
 * @access Private (Admin only)
 */
const createTrainingController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Prepare training data
        const trainingData = {
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
        const training = yield (0, training_service_1.createTraining)(trainingData);
        // Respond with success
        res.status(201).json({
            message: 'Training created successfully',
            training,
        });
    }
    catch (error) {
        // Handle errors
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Failed to create training',
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: 'An unknown error occurred while creating the training',
            });
        }
        next(error);
    }
});
exports.createTrainingController = createTrainingController;
/**
 * Get all trainings
 * @route GET /api/trainings
 * @access Private (Authenticated users)
 */
const getTrainingsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainings = yield (0, training_service_1.getAllTrainings)();
        res.status(200).json({ message: 'Trainings retrieved successfully', trainings });
    }
    catch (error) {
        // TypeScript assertion to handle error as an instance of Error
        if (error instanceof Error) {
            res.status(500).json({ message: 'Failed to retrieve trainings', error: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
        next(error);
    }
});
exports.getTrainingsController = getTrainingsController;
/**
 * Get a training by ID
 * @route GET /api/trainings/:id
 * @access Private (Authenticated users)
 */
const getTrainingByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainingId = req.params.id;
        const training = yield (0, training_service_1.getTrainingById)(trainingId);
        if (!training) {
            return res.status(404).json({ message: 'Training not found' });
        }
        res.status(200).json({ message: 'Training retrieved successfully', training });
    }
    catch (error) {
        // TypeScript assertion to handle error as an instance of Error
        if (error instanceof Error) {
            res.status(500).json({ message: 'Failed to retrieve training', error: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
        next(error);
    }
});
exports.getTrainingByIdController = getTrainingByIdController;
/**
 * Update a training
 * @route PUT /api/trainings/:id
 * @access Private (Admin only)
 */
const updateTrainingController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainingId = req.params.id;
        const updateData = req.body;
        const updatedTraining = yield (0, training_service_1.updateTraining)(trainingId, updateData);
        res.status(200).json({ message: 'Training updated successfully', training: updatedTraining });
    }
    catch (error) {
        // TypeScript assertion to handle error as an instance of Error
        if (error instanceof Error) {
            res.status(500).json({ message: 'Failed to update training', error: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
        next(error);
    }
});
exports.updateTrainingController = updateTrainingController;
/**
 * Soft delete a training
 * @route DELETE /api/trainings/:id
 * @access Private (Admin only)
 */
const deleteTrainingController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trainingId = req.params.id;
        const deletedTraining = yield (0, training_service_1.deleteTraining)(trainingId);
        res.status(200).json({ message: 'Training soft deleted successfully', training: deletedTraining });
    }
    catch (error) {
        // TypeScript assertion to handle error as an instance of Error
        if (error instanceof Error) {
            res.status(500).json({ message: 'Failed to delete training', error: error.message });
        }
        else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
        next(error);
    }
});
exports.deleteTrainingController = deleteTrainingController;
