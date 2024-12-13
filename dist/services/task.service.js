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
exports.prisma = exports.assignUserToTask = exports.deleteTask = exports.updateTask = exports.getTasksByAssignedUserId = exports.getTaskById = exports.getAllTasksOPEN = exports.getAllTasksSubmitted = exports.getAllTasks = exports.createTask = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
/**
 * Create a new task
 * @param data Task creation data
 * @returns Created task
 */
const createTask = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate input data
        if (!data.title || !data.description || !data.price || !data.deadline) {
            throw new Error('Missing required task fields');
        }
        // Create task in database
        const task = yield prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                price: data.price,
                deadline: data.deadline,
                status: data.status || 'OPEN',
                imageUrl: data.imageUrl,
                requirementsUrl: data.requirementsUrl
            }
        });
        return task;
    }
    catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
});
exports.createTask = createTask;
/**
 * Get all non-deleted tasks
 * @returns List of tasks
 */
const getAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.task.findMany({
            where: {
                isDeleted: false
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
});
exports.getAllTasks = getAllTasks;
const getAllTasksSubmitted = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.task.findMany({
            where: {
                status: 'SUBMITTED'
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
});
exports.getAllTasksSubmitted = getAllTasksSubmitted;
const getAllTasksOPEN = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.task.findMany({
            where: {
                status: 'OPEN'
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
});
exports.getAllTasksOPEN = getAllTasksOPEN;
/**
 * Get a task by its ID
 * @param taskId Task identifier
 * @returns Task or null
 */
const getTaskById = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.task.findUnique({
            where: {
                id: taskId,
                isDeleted: false
            }
        });
    }
    catch (error) {
        console.error('Error fetching task:', error);
        throw error;
    }
});
exports.getTaskById = getTaskById;
/**
 * Get tasks by their assigned user ID
 * @param assignedToId User ID to filter tasks by
 * @returns Array of tasks
 */
const getTasksByAssignedUserId = (assignedToId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.task.findMany({
            where: {
                assignedToId: assignedToId,
                isDeleted: false,
            },
        });
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
});
exports.getTasksByAssignedUserId = getTasksByAssignedUserId;
/**
 * Update a task
 * @param taskId Task identifier
 * @param data Update data
 * @returns Updated task
 */
const updateTask = (taskId, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.task.update({
            where: { id: taskId },
            data: data
        });
    }
    catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
});
exports.updateTask = updateTask;
/**
 * Soft delete a task
 * @param taskId Task identifier
 * @returns Deleted task
 */
const deleteTask = (taskId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.task.update({
            where: { id: taskId },
            data: { isDeleted: true }
        });
    }
    catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
});
exports.deleteTask = deleteTask;
/**
 * Assign a user to a task
 * @param taskId Task identifier
 * @param userId User identifier
 * @returns Updated task
 */
const assignUserToTask = (taskId, assignedToId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!taskId || !assignedToId) {
        throw new Error('taskId and assignedToId are required.');
    }
    try {
        return yield prisma.task.update({
            where: { id: taskId },
            data: {
                assignedToId: assignedToId,
                status: 'IN_PROGRESS' // Assuming you want to change status when assigned
            }
        });
    }
    catch (error) {
        console.error('Error assigning task:', error);
        throw error;
    }
});
exports.assignUserToTask = assignUserToTask;
