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
exports.assignUserToTaskController = exports.deleteTaskController = exports.updateTaskController = exports.getTaskByAssignedUserIdController = exports.getTaskByIdController = exports.getAllTasksOpenController = exports.getAllTasksSubmittedController = exports.getAllTasksController = exports.createTaskController = void 0;
const task_service_1 = require("../services/task.service");
/**
 * Create a new task
 */
const createTaskController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const task = yield (0, task_service_1.createTask)(data);
        res.status(201).json(task);
    }
    catch (error) {
        next(error);
    }
});
exports.createTaskController = createTaskController;
/**
 * Get all tasks
 */
const getAllTasksController = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield (0, task_service_1.getAllTasks)();
        res.status(200).json(tasks);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTasksController = getAllTasksController;
const getAllTasksSubmittedController = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield (0, task_service_1.getAllTasksSubmitted)();
        res.status(200).json(tasks);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTasksSubmittedController = getAllTasksSubmittedController;
const getAllTasksOpenController = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield (0, task_service_1.getAllTasksOPEN)();
        res.status(200).json(tasks);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTasksOpenController = getAllTasksOpenController;
/**
 * Get a task by ID
 */
const getTaskByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield (0, task_service_1.getTaskById)(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        next(error);
    }
});
exports.getTaskByIdController = getTaskByIdController;
/**
 * Get a task by assigned user ID
 */
const getTaskByAssignedUserIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield (0, task_service_1.getTasksByAssignedUserId)(taskId);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        next(error);
    }
});
exports.getTaskByAssignedUserIdController = getTaskByAssignedUserIdController;
/**
 * Update a task
 */
const updateTaskController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const data = req.body;
        const updatedTask = yield (0, task_service_1.updateTask)(taskId, data);
        res.status(200).json(updatedTask);
    }
    catch (error) {
        next(error);
    }
});
exports.updateTaskController = updateTaskController;
/**
 * Soft delete a task
 */
const deleteTaskController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const deletedTask = yield (0, task_service_1.deleteTask)(taskId);
        res.status(200).json(deletedTask);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTaskController = deleteTaskController;
/**
 * Assign a user to a task
 */
const assignUserToTaskController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId, assignedToId } = req.body;
        const assignedTask = yield (0, task_service_1.assignUserToTask)(taskId, assignedToId);
        res.status(200).json(assignedTask);
    }
    catch (error) {
        next(error);
    }
});
exports.assignUserToTaskController = assignUserToTaskController;
