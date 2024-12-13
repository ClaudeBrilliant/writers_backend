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
exports.updateApplicationStatus = exports.deleteTaskApplication = exports.updateTaskApplication = exports.getTaskApplicationById = exports.getTaskApplications = exports.createTaskApplication = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Helper: Map Prisma TaskApplication to Custom TaskApplication Interface
 */
const mapPrismaTaskApplicationToCustom = (prismaTaskApplication) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return ({
        id: prismaTaskApplication.id,
        taskId: prismaTaskApplication.taskId,
        userId: prismaTaskApplication.userId,
        status: prismaTaskApplication.status, // Cast to custom enum
        createdAt: prismaTaskApplication.createdAt,
        updatedAt: prismaTaskApplication.updatedAt,
        isDeleted: prismaTaskApplication.isDeleted,
        task: Object.assign(Object.assign({}, prismaTaskApplication.task), { price: (_b = (_a = prismaTaskApplication.task) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.toNumber(), requirementsUrl: (_d = (_c = prismaTaskApplication.task) === null || _c === void 0 ? void 0 : _c.requirementsUrl) !== null && _d !== void 0 ? _d : undefined, imageUrl: (_f = (_e = prismaTaskApplication.task) === null || _e === void 0 ? void 0 : _e.imageUrl) !== null && _f !== void 0 ? _f : undefined, assignedToId: (_h = (_g = prismaTaskApplication.task) === null || _g === void 0 ? void 0 : _g.assignedToId) !== null && _h !== void 0 ? _h : undefined }),
        user: prismaTaskApplication.user,
    });
};
/**
 * Create a task application
 */
const createTaskApplication = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTaskApplication = yield prisma.taskApplication.create({
            data: {
                status: data.status,
                isDeleted: data.isDeleted,
                user: { connect: { id: data.userId } },
                task: { connect: { id: data.taskId } },
            },
            include: { task: true, user: true }, // Include relations in response
        });
        return mapPrismaTaskApplicationToCustom(prismaTaskApplication);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error creating task application');
    }
});
exports.createTaskApplication = createTaskApplication;
/**
 * Get all task applications
 */
const getTaskApplications = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTaskApplications = yield prisma.taskApplication.findMany({
            where: { isDeleted: false },
            include: { task: true, user: true }, // Include relations
        });
        return prismaTaskApplications.map(mapPrismaTaskApplicationToCustom);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error fetching task applications');
    }
});
exports.getTaskApplications = getTaskApplications;
/**
 * Get a task application by ID
 */
const getTaskApplicationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTaskApplication = yield prisma.taskApplication.findUnique({
            where: { id },
            include: { task: true, user: true }, // Include relations
        });
        return prismaTaskApplication
            ? mapPrismaTaskApplicationToCustom(prismaTaskApplication)
            : null;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error fetching task application by ID');
    }
});
exports.getTaskApplicationById = getTaskApplicationById;
/**
 * Update a task application
 */
const updateTaskApplication = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTaskApplication = yield prisma.taskApplication.update({
            where: { id },
            data,
            include: { task: true, user: true }, // Include relations
        });
        return mapPrismaTaskApplicationToCustom(prismaTaskApplication);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error updating task application');
    }
});
exports.updateTaskApplication = updateTaskApplication;
/**
 * Soft delete a task application
 */
const deleteTaskApplication = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTaskApplication = yield prisma.taskApplication.update({
            where: { id },
            data: { isDeleted: true },
            include: { task: true, user: true }, // Include relations
        });
        return mapPrismaTaskApplicationToCustom(prismaTaskApplication);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error deleting task application');
    }
});
exports.deleteTaskApplication = deleteTaskApplication;
/**
 * Update the status of a task application
 */
const updateApplicationStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTaskApplication = yield prisma.taskApplication.update({
            where: { id },
            data: { status },
            include: { task: true, user: true }, // Include relations
        });
        return mapPrismaTaskApplicationToCustom(prismaTaskApplication);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error updating application status');
    }
});
exports.updateApplicationStatus = updateApplicationStatus;
