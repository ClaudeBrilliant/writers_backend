import { Request, Response, NextFunction } from 'express';
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction, getTransactionsByUserId,
} from '../services/transaction.service';

/**
 * Create a new transaction
 */
export const createTransactionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    const transaction = await createTransaction(data);
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all transactions
 */
export const getAllTransactionsController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const transactions = await getAllTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};


/**
 * Get all transactions
 */
export const getAllTransactionsByUserIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactionId = req.params.userId;
    const transactions = await getTransactionsByUserId(transactionId);
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a transaction by ID
 */
export const getTransactionByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactionId = req.params.id;
    const transaction = await getTransactionById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

/**
 * Update a transaction
 */
export const updateTransactionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactionId = req.params.id;
    const data = req.body;
    const updatedTransaction = await updateTransaction(transactionId, data);
    res.status(200).json(updatedTransaction);
  } catch (error) {
    next(error);
  }
};

/**
 * Soft delete a transaction
 */
export const deleteTransactionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactionId = req.params.id;
    const deletedTransaction = await deleteTransaction(transactionId);
    res.status(200).json(deletedTransaction);
  } catch (error) {
    next(error);
  }
};
