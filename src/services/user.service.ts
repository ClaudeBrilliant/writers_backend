import prisma from '../config/db.config';
import { User } from '@prisma/client';


/**
 * Get all users
 */
export const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany({
    where: { isDeleted: false },
    include: { profile: true, assignedTasks: true, transactions: true, category: true },
  });
};

/**
 * Get user by ID
 */
export const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id },
    include: { profile: true, assignedTasks: true, transactions: true, category: true },
  });
};



/**
 * Update a user
 */
export const updateUser = async (id: string, data: Partial<User>): Promise<User | null> => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

/**
 * Soft delete a user
 */
export const deleteUser = async (id: string): Promise<User | null> => {
  return prisma.user.update({
    where: { id },
    data: { isDeleted: true },
  });
};
