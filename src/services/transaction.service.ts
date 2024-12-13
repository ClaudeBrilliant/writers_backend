import { PrismaClient, Transaction as PrismaTransaction } from '@prisma/client';
import { Transaction as TransactionInterface } from '../interfaces/transaction.interface';

const prisma = new PrismaClient();

/**
 * Helper: Map Prisma Transaction to Custom Transaction Interface
 */
const mapPrismaTransactionToCustomTransaction = (prismaTransaction: PrismaTransaction): TransactionInterface => ({
  id: prismaTransaction.id,
  userId: prismaTransaction.userId,
  amount: prismaTransaction.amount,
  type: prismaTransaction.type,
  status: prismaTransaction.status,
  createdAt: prismaTransaction.createdAt,
  updatedAt: prismaTransaction.updatedAt,
  isDeleted: prismaTransaction.isDeleted,
  email:prismaTransaction.email,
  phoneNumber: prismaTransaction.phoneNumber
});

/**
 * Create a new transaction
 */
export const createTransaction = async (
  data: Omit<TransactionInterface, 'id' | 'createdAt' | 'updatedAt' | 'user'>
): Promise<TransactionInterface> => {
  try {
    const prismaTransaction = await prisma.transaction.create({
      data: {
        userId: data.userId,
        amount: data.amount,
        type: data.type,
        status: data.status,
        isDeleted: data.isDeleted || false,
        email:data.email,
        phoneNumber:data.phoneNumber
      },
    });

    return mapPrismaTransactionToCustomTransaction(prismaTransaction);
  } catch (error) {
    console.error(error);
    throw new Error('Error creating transaction');
  }
};

/**
 * Get all transactions
 */
export const getAllTransactions = async (): Promise<TransactionInterface[]> => {
  try {
    const prismaTransactions = await prisma.transaction.findMany({
      where: { isDeleted: false },
    });

    return prismaTransactions.map(mapPrismaTransactionToCustomTransaction);
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching transactions');
  }
};

/**
 * Get a transaction by ID
 */
export const getTransactionById = async (id: string): Promise<TransactionInterface | null> => {
  try {
    const prismaTransaction = await prisma.transaction.findUnique({
      where: { id },
    });

    return prismaTransaction ? mapPrismaTransactionToCustomTransaction(prismaTransaction) : null;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching transaction by ID');
  }
};

/**
 * Get a transaction by user ID
 */
export const getTransactionsByUserId = async (userId: string): Promise<TransactionInterface[]> => {
  try {
    const prismaTransactions = await prisma.transaction.findMany({
      where: { userId },
    });

    return prismaTransactions.map(mapPrismaTransactionToCustomTransaction);
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching transaction by ID');
  }
};

/**
 * Update a transaction
 */
export const updateTransaction = async (
  id: string,
  data: Partial<Omit<TransactionInterface, 'user' | 'createdAt' | 'updatedAt'>>
): Promise<TransactionInterface> => {
  try {
    const prismaTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return mapPrismaTransactionToCustomTransaction(prismaTransaction);
  } catch (error) {
    console.error(error);
    throw new Error('Error updating transaction');
  }
};

/**
 * Soft delete a transaction (set `isDeleted` to true)
 */
export const deleteTransaction = async (id: string): Promise<TransactionInterface> => {
  try {
    const prismaTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        isDeleted: true,
        updatedAt: new Date(),
      },
    });

    return mapPrismaTransactionToCustomTransaction(prismaTransaction);
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting transaction');
  }
};
