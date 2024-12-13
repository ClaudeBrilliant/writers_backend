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
exports.updateApplicationStatus = exports.deleteTrainingApplication = exports.updateTrainingApplication = exports.getTrainingApplicationById = exports.getTrainingApplications = exports.createTrainingApplication = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Helper: Map Prisma TrainingApplication to Custom TrainingApplication Interface
 */
const mapPrismaTrainingApplicationToCustom = (prismaTrainingApplication) => {
    var _a, _b;
    return ({
        id: prismaTrainingApplication.id,
        trainingId: prismaTrainingApplication.trainingId,
        userId: prismaTrainingApplication.userId,
        status: prismaTrainingApplication.status, // Cast to custom enum
        createdAt: prismaTrainingApplication.createdAt,
        updatedAt: prismaTrainingApplication.updatedAt,
        isDeleted: prismaTrainingApplication.isDeleted,
        phone: prismaTrainingApplication.phone,
        mpesaCode: prismaTrainingApplication.mpesaCode,
        training: Object.assign(Object.assign({}, prismaTrainingApplication.training), { price: (_b = (_a = prismaTrainingApplication.training) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.toNumber() }),
        user: prismaTrainingApplication.user,
    });
};
/**
 * Create a training application
 */
const createTrainingApplication = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data.trainingId || !data.userId) {
            throw new Error('Training ID and User ID are required to create a training application.');
        }
        const prismaTrainingApplication = yield prisma.trainingApplication.create({
            data: {
                status: data.status,
                isDeleted: false,
                user: { connect: { id: data.userId } },
                training: { connect: { id: data.trainingId } },
                phone: data.phone,
                mpesaCode: data.mpesaCode
            },
            include: { training: true, user: true }, // Include relations in response
        });
        return mapPrismaTrainingApplicationToCustom(prismaTrainingApplication);
    }
    catch (error) {
        console.error('Error creating training application:', error);
        throw new Error('Error creating training application');
    }
});
exports.createTrainingApplication = createTrainingApplication;
/**
 * Get all training applications
 */
const getTrainingApplications = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTrainingApplications = yield prisma.trainingApplication.findMany({
            where: { isDeleted: false },
            include: { training: true, user: true }, // Include relations
        });
        return prismaTrainingApplications.map(mapPrismaTrainingApplicationToCustom);
    }
    catch (error) {
        console.error('Error fetching training applications:', error);
        throw new Error('Error fetching training applications');
    }
});
exports.getTrainingApplications = getTrainingApplications;
/**
 * Get a training application by ID
 */
const getTrainingApplicationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id)
            throw new Error('Training application ID is required.');
        const prismaTrainingApplication = yield prisma.trainingApplication.findUnique({
            where: { id },
            include: { training: true, user: true }, // Include relations
        });
        return prismaTrainingApplication
            ? mapPrismaTrainingApplicationToCustom(prismaTrainingApplication)
            : null;
    }
    catch (error) {
        console.error('Error fetching training application by ID:', error);
        throw new Error('Error fetching training application by ID');
    }
});
exports.getTrainingApplicationById = getTrainingApplicationById;
/**
 * Update a training application
 */
const updateTrainingApplication = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id)
            throw new Error('Training application ID is required.');
        const prismaTrainingApplication = yield prisma.trainingApplication.update({
            where: { id },
            data,
            include: { training: true, user: true }, // Include relations
        });
        return mapPrismaTrainingApplicationToCustom(prismaTrainingApplication);
    }
    catch (error) {
        console.error('Error updating training application:', error);
        throw new Error('Error updating training application');
    }
});
exports.updateTrainingApplication = updateTrainingApplication;
/**
 * Soft delete a training application
 */
const deleteTrainingApplication = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id)
            throw new Error('Training application ID is required.');
        const prismaTrainingApplication = yield prisma.trainingApplication.update({
            where: { id },
            data: { isDeleted: true },
            include: { training: true, user: true }, // Include relations
        });
        return mapPrismaTrainingApplicationToCustom(prismaTrainingApplication);
    }
    catch (error) {
        console.error('Error deleting training application:', error);
        throw new Error('Error deleting training application');
    }
});
exports.deleteTrainingApplication = deleteTrainingApplication;
/**
 * Update the status of a training application
 */
const updateApplicationStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id)
            throw new Error('Training application ID is required.');
        const prismaTrainingApplication = yield prisma.trainingApplication.update({
            where: { id },
            data: { status },
            include: { training: true, user: true }, // Include relations
        });
        return mapPrismaTrainingApplicationToCustom(prismaTrainingApplication);
    }
    catch (error) {
        console.error('Error updating application status:', error);
        throw new Error('Error updating application status');
    }
});
exports.updateApplicationStatus = updateApplicationStatus;
