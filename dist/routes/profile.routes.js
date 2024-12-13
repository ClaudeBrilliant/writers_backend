"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_controller_1 = require("../controllers/profile.controller");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
// Update a new profile
router.put('/profiles', middlewares_1.authenticateJWT, profile_controller_1.createProfileController);
// Get all profiles
router.get('/profiles', middlewares_1.authenticateJWT, profile_controller_1.getAllProfilesController);
// Get a profile by ID
router.get('/profiles/:id', middlewares_1.authenticateJWT, profile_controller_1.getProfileByIdController);
// Update a profile
router.put('/profiles/:id', middlewares_1.authenticateJWT, profile_controller_1.updateProfileController);
// Soft delete a profile
router.delete('/profiles/:id', middlewares_1.authenticateJWT, profile_controller_1.deleteProfileController);
exports.default = router;
