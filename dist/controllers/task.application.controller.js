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
exports.updateApplicationStatusController = exports.deleteTaskApplicationController = exports.updateTaskApplicationController = exports.getTaskApplicationByIdController = exports.getTaskApplicationsController = exports.createTaskApplicationController = void 0;
const task_application_service_1 = require("../services/task.application.service");
/**
 * Create a new task application
 */
const createTaskApplicationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const taskApplication = yield (0, task_application_service_1.createTaskApplication)(data);
        res.status(201).json(taskApplication);
    }
    catch (error) {
        next(error);
    }
});
exports.createTaskApplicationController = createTaskApplicationController;
/**
 * Get all task applications
 */
const getTaskApplicationsController = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskApplications = yield (0, task_application_service_1.getTaskApplications)();
        res.status(200).json(taskApplications);
    }
    catch (error) {
        next(error);
    }
});
exports.getTaskApplicationsController = getTaskApplicationsController;
/**
 * Get a task application by ID
 */
const getTaskApplicationByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applicationId = req.params.id;
        const taskApplication = yield (0, task_application_service_1.getTaskApplicationById)(applicationId);
        if (!taskApplication) {
            return res.status(404).json({ message: 'Task application not found' });
        }
        res.status(200).json(taskApplication);
    }
    catch (error) {
        next(error);
    }
});
exports.getTaskApplicationByIdController = getTaskApplicationByIdController;
/**
 * Update a task application
 */
const updateTaskApplicationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applicationId = req.params.id;
        const data = req.body;
        const updatedApplication = yield (0, task_application_service_1.updateTaskApplication)(applicationId, data);
        res.status(200).json(updatedApplication);
    }
    catch (error) {
        next(error);
    }
});
exports.updateTaskApplicationController = updateTaskApplicationController;
/**
 * Soft delete a task application
 */
const deleteTaskApplicationController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applicationId = req.params.id;
        const deletedApplication = yield (0, task_application_service_1.deleteTaskApplication)(applicationId);
        res.status(200).json(deletedApplication);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTaskApplicationController = deleteTaskApplicationController;
/**
 * Update application status
 */
const updateApplicationStatusController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applicationId = req.params.id;
        const { status } = req.body;
        const updatedStatus = yield (0, task_application_service_1.updateApplicationStatus)(applicationId, status);
        res.status(200).json(updatedStatus);
    }
    catch (error) {
        next(error);
    }
});
exports.updateApplicationStatusController = updateApplicationStatusController;
