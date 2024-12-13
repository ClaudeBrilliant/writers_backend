"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("../controllers/transaction.controller");
const router = express_1.default.Router();
// Create a new transaction
router.post('/transactions/new', transaction_controller_1.createTransactionController);
// Get all transactions
router.get('/transactions', transaction_controller_1.getAllTransactionsController);
// Get a transaction by ID
router.get('/transactions/:id', transaction_controller_1.getTransactionByIdController);
// Get a transaction by ID
router.get('/transactions/user/:id', transaction_controller_1.getAllTransactionsByUserIdController);
// Update a transaction
router.put('/transactions/:id', transaction_controller_1.updateTransactionController);
// Soft delete a transaction
router.delete('/transactions/:id', transaction_controller_1.deleteTransactionController);
exports.default = router;
