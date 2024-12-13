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
exports.deleteTransactionController = exports.updateTransactionController = exports.getTransactionByIdController = exports.getAllTransactionsByUserIdController = exports.getAllTransactionsController = exports.createTransactionController = void 0;
const transaction_service_1 = require("../services/transaction.service");
/**
 * Create a new transaction
 */
const createTransactionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const transaction = yield (0, transaction_service_1.createTransaction)(data);
        res.status(201).json(transaction);
    }
    catch (error) {
        next(error);
    }
});
exports.createTransactionController = createTransactionController;
/**
 * Get all transactions
 */
const getAllTransactionsController = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield (0, transaction_service_1.getAllTransactions)();
        res.status(200).json(transactions);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTransactionsController = getAllTransactionsController;
/**
 * Get all transactions
 */
const getAllTransactionsByUserIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionId = req.params.userId;
        const transactions = yield (0, transaction_service_1.getTransactionsByUserId)(transactionId);
        res.status(200).json(transactions);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllTransactionsByUserIdController = getAllTransactionsByUserIdController;
/**
 * Get a transaction by ID
 */
const getTransactionByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionId = req.params.id;
        const transaction = yield (0, transaction_service_1.getTransactionById)(transactionId);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    }
    catch (error) {
        next(error);
    }
});
exports.getTransactionByIdController = getTransactionByIdController;
/**
 * Update a transaction
 */
const updateTransactionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionId = req.params.id;
        const data = req.body;
        const updatedTransaction = yield (0, transaction_service_1.updateTransaction)(transactionId, data);
        res.status(200).json(updatedTransaction);
    }
    catch (error) {
        next(error);
    }
});
exports.updateTransactionController = updateTransactionController;
/**
 * Soft delete a transaction
 */
const deleteTransactionController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionId = req.params.id;
        const deletedTransaction = yield (0, transaction_service_1.deleteTransaction)(transactionId);
        res.status(200).json(deletedTransaction);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTransactionController = deleteTransactionController;
