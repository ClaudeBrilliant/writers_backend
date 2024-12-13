"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const training_controller_1 = require("../controllers/training.controller");
const middlewares_1 = require("../middlewares");
const middlewares_2 = require("../middlewares");
const router = express_1.default.Router();
const adminOnly = (0, middlewares_2.authorizeRole)(['ADMIN']);
// Routes for all authenticated users
router.get('/trainings/all', middlewares_1.authenticateJWT, training_controller_1.getTrainingsController);
router.get('/trainings/:id', middlewares_1.authenticateJWT, training_controller_1.getTrainingByIdController);
// Admin-only routes
router.post('/trainings', middlewares_1.authenticateJWT, adminOnly, training_controller_1.createTrainingController);
router.put('/trainings/:id', middlewares_1.authenticateJWT, adminOnly, training_controller_1.updateTrainingController);
router.delete('/trainings/:id', middlewares_1.authenticateJWT, adminOnly, training_controller_1.deleteTrainingController);
exports.default = router;
