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
exports.deleteProfileController = exports.updateProfileController = exports.getProfileByIdController = exports.getAllProfilesController = exports.createProfileController = void 0;
const profile_service_1 = require("../services/profile.service");
/**
 * Create a new profile
 */
const createProfileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const profile = yield (0, profile_service_1.createProfile)(data);
        res.status(201).json(profile);
    }
    catch (error) {
        next(error);
    }
});
exports.createProfileController = createProfileController;
/**
 * Get all profiles
 */
const getAllProfilesController = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = yield (0, profile_service_1.getAllProfiles)();
        res.status(200).json(profiles);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllProfilesController = getAllProfilesController;
/**
 * Get a profile by ID
 */
const getProfileByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileId = req.params.id;
        const profile = yield (0, profile_service_1.getProfileById)(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    }
    catch (error) {
        next(error);
    }
});
exports.getProfileByIdController = getProfileByIdController;
/**
 * Update a profile
 */
const updateProfileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileId = req.params.id;
        const data = req.body;
        const updatedProfile = yield (0, profile_service_1.updateProfile)(profileId, data);
        res.status(200).json(updatedProfile);
    }
    catch (error) {
        next(error);
    }
});
exports.updateProfileController = updateProfileController;
/**
 * Soft delete a profile
 */
const deleteProfileController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileId = req.params.id;
        const deletedProfile = yield (0, profile_service_1.deleteProfile)(profileId);
        res.status(200).json(deletedProfile);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteProfileController = deleteProfileController;
