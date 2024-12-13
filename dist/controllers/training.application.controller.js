"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteTrainingApplication = exports.updateTrainingApplication = exports.getTrainingApplicationById = exports.getAllTrainingApplications = exports.createTrainingApplication = void 0;
const TrainingApplicationService = __importStar(require("../services/training.application.service"));
const createTrainingApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const newApplication = yield TrainingApplicationService.createTrainingApplication(data);
        res.status(201).json(newApplication);
    }
    catch (error) {
        console.error('Error in createTrainingApplication:', error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.createTrainingApplication = createTrainingApplication;
const getAllTrainingApplications = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield TrainingApplicationService.getTrainingApplications();
        res.status(200).json(applications);
    }
    catch (error) {
        console.error('Error in getAllTrainingApplications:', error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.getAllTrainingApplications = getAllTrainingApplications;
const getTrainingApplicationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const application = yield TrainingApplicationService.getTrainingApplicationById(id);
        if (!application) {
            return res.status(404).json({ message: 'Training application not found' });
        }
        res.status(200).json(application);
    }
    catch (error) {
        console.error('Error in getTrainingApplicationById:', error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.getTrainingApplicationById = getTrainingApplicationById;
const updateTrainingApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedApplication = yield TrainingApplicationService.updateTrainingApplication(id, data);
        res.status(200).json(updatedApplication);
    }
    catch (error) {
        console.error('Error in updateTrainingApplication:', error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.updateTrainingApplication = updateTrainingApplication;
const deleteTrainingApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedApplication = yield TrainingApplicationService.deleteTrainingApplication(id);
        res.status(200).json(deletedApplication);
    }
    catch (error) {
        console.error('Error in deleteTrainingApplication:', error.message);
        res.status(500).json({ message: error.message });
    }
});
exports.deleteTrainingApplication = deleteTrainingApplication;