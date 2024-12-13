"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const training_application_controller_1 = require("../controllers/training.application.controller");
const middlewares_1 = require("../middlewares");
const middlewares_2 = require("../middlewares");
const router = express_1.default.Router();
const adminOnly = (0, middlewares_2.authorizeRole)(['ADMIN']);
// Create a new training application
router.post('/training-applications/new', middlewares_1.authenticateJWT, training_application_controller_1.createTrainingApplication);
// Get all training applications
router.get('/training-applications/all', middlewares_1.authenticateJWT, training_application_controller_1.getAllTrainingApplications);
// Get a specific training application by ID
router.get('/training-applications/:id', middlewares_1.authenticateJWT, training_application_controller_1.getTrainingApplicationById);
// Update a training application
router.put('/training-applications/:id', middlewares_1.authenticateJWT, adminOnly, training_application_controller_1.updateTrainingApplication);
// Soft delete a training application
router.delete('/training-applications/:id', middlewares_1.authenticateJWT, adminOnly, training_application_controller_1.deleteTrainingApplication);
exports.default = router;
