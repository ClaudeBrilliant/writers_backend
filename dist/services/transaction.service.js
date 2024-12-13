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
exports.deleteTransaction = exports.updateTransaction = exports.getTransactionsByUserId = exports.getTransactionById = exports.getAllTransactions = exports.createTransaction = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Helper: Map Prisma Transaction to Custom Transaction Interface
 */
const mapPrismaTransactionToCustomTransaction = (prismaTransaction) => ({
    id: prismaTransaction.id,
    userId: prismaTransaction.userId,
    amount: prismaTransaction.amount,
    type: prismaTransaction.type,
    status: prismaTransaction.status,
    createdAt: prismaTransaction.createdAt,
    updatedAt: prismaTransaction.updatedAt,
    isDeleted: prismaTransaction.isDeleted,
    email: prismaTransaction.email,
    phoneNumber: prismaTransaction.phoneNumber
});
/**
 * Create a new transaction
 */
const createTransaction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTransaction = yield prisma.transaction.create({
            data: {
                userId: data.userId,
                amount: data.amount,
                type: data.type,
                status: data.status,
                isDeleted: data.isDeleted || false,
                email: data.email,
                phoneNumber: data.phoneNumber
            },
        });
        return mapPrismaTransactionToCustomTransaction(prismaTransaction);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error creating transaction');
    }
});
exports.createTransaction = createTransaction;
/**
 * Get all transactions
 */
const getAllTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTransactions = yield prisma.transaction.findMany({
            where: { isDeleted: false },
        });
        return prismaTransactions.map(mapPrismaTransactionToCustomTransaction);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error fetching transactions');
    }
});
exports.getAllTransactions = getAllTransactions;
/**
 * Get a transaction by ID
 */
const getTransactionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTransaction = yield prisma.transaction.findUnique({
            where: { id },
        });
        return prismaTransaction ? mapPrismaTransactionToCustomTransaction(prismaTransaction) : null;
    }
    catch (error) {
        console.error(error);
        throw new Error('Error fetching transaction by ID');
    }
});
exports.getTransactionById = getTransactionById;
/**
 * Get a transaction by user ID
 */
const getTransactionsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTransactions = yield prisma.transaction.findMany({
            where: { userId },
        });
        return prismaTransactions.map(mapPrismaTransactionToCustomTransaction);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error fetching transaction by ID');
    }
});
exports.getTransactionsByUserId = getTransactionsByUserId;
/**
 * Update a transaction
 */
const updateTransaction = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTransaction = yield prisma.transaction.update({
            where: { id },
            data: Object.assign(Object.assign({}, data), { updatedAt: new Date() }),
        });
        return mapPrismaTransactionToCustomTransaction(prismaTransaction);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error updating transaction');
    }
});
exports.updateTransaction = updateTransaction;
/**
 * Soft delete a transaction (set `isDeleted` to true)
 */
const deleteTransaction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prismaTransaction = yield prisma.transaction.update({
            where: { id },
            data: {
                isDeleted: true,
                updatedAt: new Date(),
            },
        });
        return mapPrismaTransactionToCustomTransaction(prismaTransaction);
    }
    catch (error) {
        console.error(error);
        throw new Error('Error deleting transaction');
    }
});
exports.deleteTransaction = deleteTransaction;
