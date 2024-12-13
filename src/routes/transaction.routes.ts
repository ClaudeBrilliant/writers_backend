import express from 'express';
import {
  createTransactionController,
  getAllTransactionsController,
  getTransactionByIdController,
  updateTransactionController,
  deleteTransactionController,
  getAllTransactionsByUserIdController
} from '../controllers/transaction.controller';

const router = express.Router();

// Create a new transaction
router.post('/transactions/new', createTransactionController);

// Get all transactions
router.get('/transactions', getAllTransactionsController);

// Get a transaction by ID
router.get('/transactions/:id', getTransactionByIdController);

// Get a transaction by ID
router.get('/transactions/user/:id', getAllTransactionsByUserIdController);

// Update a transaction
router.put('/transactions/:id', updateTransactionController);

// Soft delete a transaction
router.delete('/transactions/:id', deleteTransactionController);

export default router;
