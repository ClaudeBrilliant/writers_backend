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
exports.deleteTraining = exports.updateTraining = exports.getTrainingById = exports.getAllTrainings = exports.createTraining = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Helper: Map Prisma Training to Custom Training Interface
 */
const mapPrismaTrainingToCustomTraining = (prismaTraining) => ({
    id: prismaTraining.id,
    title: prismaTraining.title,
    description: prismaTraining.description,
    startDate: prismaTraining.startDate,
    endDate: prismaTraining.endDate,
    capacity: prismaTraining.capacity,
    price: prismaTraining.price.toNumber(), // Convert Decimal to number
    createdAt: prismaTraining.createdAt,
    updatedAt: prismaTraining.updatedAt,
    isDeleted: prismaTraining.isDeleted,
});
/**
 * Create a new training
 */
const createTraining = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTraining = yield prisma.training.create({
            data: {
                title: data.title,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
                capacity: data.capacity,
                price: data.price,
                isDeleted: data.isDeleted || false,
            },
        });
        return mapPrismaTrainingToCustomTraining(prismaTraining);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error creating training session');
    }
});
exports.createTraining = createTraining;
/**
 * Get all training sessions
 */
const getAllTrainings = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTrainings = yield prisma.training.findMany({
            where: { isDeleted: false },
        });
        return prismaTrainings.map(mapPrismaTrainingToCustomTraining);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error fetching training sessions');
    }
});
exports.getAllTrainings = getAllTrainings;
/**
 * Get a training session by ID
 */
const getTrainingById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTraining = yield prisma.training.findUnique({
            where: { id },
        });
        return prismaTraining ? mapPrismaTrainingToCustomTraining(prismaTraining) : null;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error fetching training session by ID');
    }
});
exports.getTrainingById = getTrainingById;
/**
 * Update a training session
 */
const updateTraining = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTraining = yield prisma.training.update({
            where: { id },
            data: Object.assign(Object.assign({}, data), { updatedAt: new Date() }),
        });
        return mapPrismaTrainingToCustomTraining(prismaTraining);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error updating training session');
    }
});
exports.updateTraining = updateTraining;
/**
 * Soft delete a training session (set `isDeleted` to true)
 */
const deleteTraining = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTraining = yield prisma.training.update({
            where: { id },
            data: {
                isDeleted: true,
                updatedAt: new Date(),
            },
        });
        return mapPrismaTrainingToCustomTraining(prismaTraining);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error deleting training session');
    }
});
exports.deleteTraining = deleteTraining;
